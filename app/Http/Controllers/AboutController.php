<?php

namespace App\Http\Controllers;
use App\Services\AboutService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{
    
    /**
     * Constructor
     */
     protected $aboutService;

     /**
     * Display a listing of the resource.
     */
    
     public function __construct(AboutService $aboutService)
     {
         $this->aboutService= $aboutService;
     }

     public function index()
    {
        $about = $this->aboutService->getAllAbout();

        return Inertia::render('about_us/index', [
            'about' => $about,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('about_us/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_company' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $this->aboutService->createAboutWithMeta($request->all());

        return redirect()->route('about.index')->with('status', 'About berhasil dibuat!');
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
        
        $about = $this->aboutService->getAboutWithMeta($id);

        $data = [
            'id' =>  $about->id,
            'title' => $about->title,
            'description' => $about->description,
            'image_company' =>  $about->image_company,
            'meta_title' => $about->meta->meta_title,
            'meta_description' => $about->meta->meta_description,
            'meta_keywords' => $about->meta->meta_keywords,
            'og_image' => $about->meta->og_image,
            'image_alt' => $about->meta->image_alt
        ];

        return Inertia::render('about_us/form', ['about' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_company' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $this->aboutService->updateAboutWithMeta($id, $request->all());

        return redirect()->route('about.index')
            ->with('status', 'About berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->aboutService->deleteAboutWithMeta($id);
        return redirect()->route('about.index')->with('status','About Berhasil di delete');
    }
}
