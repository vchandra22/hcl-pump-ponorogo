<?php

namespace App\Http\Controllers;
use App\Services\SubmissionService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubmissionController extends Controller
{
    
    /**
     * Constructor
     */
     protected $submissionService;

     /**
     * Display a listing of the resource.
     */
    
     public function __construct(SubmissionService $submissionService)
     {
         $this->submissionService = $submissionService;
     }

     public function index()
    {
        $submissions = $this->submissionService->getAllSubmission();

        return Inertia::render('submission/index', [
            'submissions' => $submissions,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('submission/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $this->submissionService->createSubmission($request->all());

        return redirect()->route('submission.index')->with('status', 'Submission berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $submission = $this->submissionService->getSubmissionById($id);
        
        return Inertia::render('submission/show', [
            'submission' => $submission
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->submissionService->deleteSubmission($id);
        return redirect()->route('submission.index')->with('status','Submission Berhasil di delete');
    }
}