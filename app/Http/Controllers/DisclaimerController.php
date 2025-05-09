<?php

namespace App\Http\Controllers;

use App\Services\DisclaimerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DisclaimerController extends Controller
{
    protected $disclaimerService;

    public function __construct(DisclaimerService $disclaimerService)
    {
        $this->disclaimerService = $disclaimerService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $disclaimer = $this->disclaimerService->getAllDisclaimer();

        return Inertia::render('disclaimer/index', [
            'disclaimer' => $disclaimer,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('disclaimer/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'disclaimer' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();

        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('og-images', 'public');
        }

        $this->disclaimerService->createDisclaimerWithMeta($data);

        return redirect()->route('disclaimer.index')->with('status', 'Disclaimer berhasil dibuat!');
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
        $disclaimer = $this->disclaimerService->getDisclaimerWithMeta($id);

        $data = [
            'id' => $disclaimer->id,
            'disclaimer' => $disclaimer->disclaimer,
            'meta_title' => $disclaimer->meta->meta_title,
            'meta_description' => $disclaimer->meta->meta_description,
            'meta_keywords' => $disclaimer->meta->meta_keywords,
            'og_image' => $disclaimer->meta->og_image,
            'image_alt' => $disclaimer->meta->image_alt,
        ];

        return Inertia::render('disclaimer/form', [
            'disclaimer' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'disclaimer' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $disclaimer = $this->disclaimerService->getDisclaimerWithMeta($id);

        $data = $request->only([
            'disclaimer',
            'meta_title', 'meta_description', 'meta_keywords', 'image_alt'
        ]);

        // Handle og_image
        if ($request['og_image']) {
            if ($disclaimer->meta->og_image && Storage::disk('public')->exists($disclaimer->meta->og_image)) {
                Storage::disk('public')->delete($disclaimer->meta->og_image);
            }
            $data['og_image'] = $request->file('og_image')->store('disclaimer/og', 'public');
        }

        $data['og_image'] = $request['og_image'] ? $data['og_image'] : $request['og_image_old'];

        $this->disclaimerService->updateDisclaimerWithMeta($id, $data);

        return redirect()->route('disclaimer.index')
            ->with('status', 'Disclaimer berhasil diubah!');;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->disclaimerService->deleteDisclaimerWithMeta($id);

        return redirect()->route('disclaimer.index')
            ->with('status', 'Disclaimer berhasil dihapus!');
    }
}
