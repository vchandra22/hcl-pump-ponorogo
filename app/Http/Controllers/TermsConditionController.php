<?php

namespace App\Http\Controllers;

use App\Services\TermsConditionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TermsConditionController extends Controller
{
    protected $termsConditionService;

    public function __construct(TermsConditionService $termsConditionService)
    {
        $this->termsConditionService = $termsConditionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $termsConditions = $this->termsConditionService->getAllTermsCondition();

        return Inertia::render('terms/index', [
            'termsConditions' => $termsConditions,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('terms/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'terms_and_condition' => 'required|string',
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

        $this->termsConditionService->createTermsConditionWithMeta($data);

        return redirect()->route('terms.index')->with('status', 'Terms & Condition berhasil dibuat!');
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
    public function edit($id)
    {
        $termsCondition = $this->termsConditionService->getTermsConditionWithMeta($id);

        $data = [
            'id' => $termsCondition->id,
            'terms_and_condition' => $termsCondition->terms_and_condition,
            'meta_title' => $termsCondition->meta->meta_title,
            'meta_description' => $termsCondition->meta->meta_description,
            'meta_keywords' => $termsCondition->meta->meta_keywords,
            'og_image' => $termsCondition->meta->og_image,
            'image_alt' => $termsCondition->meta->image_alt,
        ];

        return Inertia::render('terms/form', [
            'termsCondition' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'terms_and_condition' => 'required|string',
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

        $termsCondition = $this->termsConditionService->getTermsConditionWithMeta($id);

        $data = $request->only([
            'terms_and_condition',
            'meta_title', 'meta_description', 'meta_keywords', 'image_alt'
        ]);

        // handle og image
        if ($request['og_image']) {
            if ($termsCondition->meta->og_image && Storage::disk('public')->exists($termsCondition->meta->og_image)) {
                Storage::disk('public')->delete($termsCondition->meta->og_image);
            }
            $data['og_image'] = $request->file('og_image')->store('terms/og', 'public');
        }

        $data['og_image'] = $request['og_image'] ? $data['og_image'] : $request['og_image_old'];

        $this->termsConditionService->updateTermsConditionWithMeta($id, $data);

        return redirect()->route('terms.index')
            ->with('status', 'Terms & Condition berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->termsConditionService->deleteTermsConditionWithMeta($id);

        return redirect()->route('terms.index')
            ->with('status', 'Terms & Condition berhasil dihapus!');
    }
}
