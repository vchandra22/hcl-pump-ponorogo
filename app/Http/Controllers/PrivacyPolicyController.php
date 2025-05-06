<?php

namespace App\Http\Controllers;

use App\Models\PrivacyPolicy;
use App\Services\PrivacyPolicyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PrivacyPolicyController extends Controller
{
    protected $privacyPolicyService;

    public function __construct(PrivacyPolicyService $privacyPolicyService)
    {
        $this->privacyPolicyService = $privacyPolicyService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $privacyPolicy = $this->privacyPolicyService->getAllPrivacyPolicy();

        return Inertia::render('privacy_policy/index',
        [
            'privacyPolicy' => $privacyPolicy,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('privacy_policy/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'privacy_policy' => 'required|string',
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

        $this->privacyPolicyService->createPrivacyPolicyWithMeta($data);

        return redirect()->route('privacy-policy.index')->with('status', 'Privacy Policy berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(PrivacyPolicy $privacyPolicy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $privacyPolicy = $this->privacyPolicyService->getPrivacyPolicyWithMeta($id);

        $data = [
            'id' => $privacyPolicy->id,
            'privacy_policy' => $privacyPolicy->privacy_policy,
            'meta_title' => $privacyPolicy->meta->meta_title,
            'meta_description' => $privacyPolicy->meta->meta_description,
            'meta_keywords' => $privacyPolicy->meta->meta_keywords,
            'og_image' => $privacyPolicy->meta->og_image,
            'image_alt' => $privacyPolicy->meta->image_alt,
        ];

        return Inertia::render('privacy_policy/form', [
            'privacyPolicy' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'privacy_policy' => 'required|string',
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

        $privacyPolicy = $this->privacyPolicyService->getPrivacyPolicyWithMeta($id);

        $data = $request->only([
            'privacy_policy',
            'meta_title', 'meta_description', 'meta_keywords', 'image_alt'
        ]);

        // Handle og_image
        if ($request->hasFile('og_image')) {
            if ($privacyPolicy->meta->og_image && Storage::disk('public')->exists($privacyPolicy->meta->og_image)) {
                Storage::disk('public')->delete($privacyPolicy->meta->og_image);
            }
            $data['og_image'] = $request->file('og_image')->store('privacy-policy/og', 'public');
        } elseif ($request->input('keep_og_image') === 'true') {
            $data['og_image'] = $privacyPolicy->meta->og_image;
        } else {
            $data['og_image'] = null;
        }

        $this->privacyPolicyService->updatePrivacyPolicyWithMeta($id, $data);

        return redirect()->route('privacy-policy.index')
            ->with('status', 'Privacy Policy berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->privacyPolicyService->deletePrivacyPolicyWithMeta($id);

        return redirect()->route('privacy-policy.index')
            ->with('status', 'Privacy Policy berhasil dihapus!');
    }
}
