<?php

namespace App\Http\Controllers;

use App\Services\ReasonService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReasonController extends Controller
{
    /**
     * Constructor
     */
    protected $reasonService;

    /**
     * Display a listing of the resource.
     */
    public function __construct(ReasonService $reasonService)
    {
        $this->reasonService = $reasonService;
    }

    public function index()
    {
        $reasons = $this->reasonService->getAllReasons();

        return Inertia::render('reason/index', [
            'reasons' => $reasons,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('reason/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $this->reasonService->createReason($request->all());

        return redirect()->route('reasons.index')->with('status', 'Reason berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reason = $this->reasonService->getReasonById($id);

        return Inertia::render('reason/form', ['reason' => $reason]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $this->reasonService->updateReason($id, $request->all());

        return redirect()->route('reasons.index')
            ->with('status', 'Reason berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->reasonService->deleteReason($id);
        return redirect()->route('reasons.index')->with('status', 'Reason Berhasil di delete');
    }
}