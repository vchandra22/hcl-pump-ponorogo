<?php

namespace App\Http\Controllers;

use App\Services\SocialMediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SocialMediaController extends Controller
{
    protected $socialMediaService;

    public function __construct(SocialMediaService $socialMediaService)
    {
        $this->socialMediaService = $socialMediaService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socialMedia = $this->socialMediaService->getAllSocialMedia();

        return Inertia::render('social_media/index', [
            'social_media' => $socialMedia,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('social_media/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icon_social_media' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'platform' => 'nullable|string',
            'title' => 'nullable|string',
            'social_media_link' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->only(['platform', 'title', 'social_media_link']);

        if ($request->hasFile('icon_social_media')) {
            $data['icon_social_media'] = $request->file('icon_social_media')->store('social-media', 'public');
        }

        $this->socialMediaService->createSocialMedia($data);

        return redirect()->route('social_media.index')->with('status', 'Social Media berhasil ditambahkan!');
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
        $socialMedia = $this->socialMediaService->getSocialMediaById($id);

        $data = [
            'id' => $socialMedia->id,
            'icon_social_media' => $socialMedia->icon_social_media,
            'platform' => $socialMedia->platform,
            'title' => $socialMedia->title,
            'social_media_link' => $socialMedia->social_media_link,
        ];

        return Inertia::render('social_media/form', [
            'social_media' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'icon_social_media' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'platform' => 'nullable|string',
            'title' => 'nullable|string',
            'social_media_link' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $socialMedia = $this->socialMediaService->getSocialMediaById($id);
        $data = $request->only([
            'platform',
            'title',
            'social_media_link'
        ]);

        if ($request->hasFile('icon_social_media')) {
            if ($socialMedia->icon_social_media && Storage::disk('public')->exists($socialMedia->icon_social_media)) {
                Storage::disk('public')->delete($socialMedia->icon_social_media);
            }

            $data['icon_social_media'] = $request->file('icon_social_media')->store('social-media', 'public');
        } elseif ($request->input('keep_image') === 'false') {
            if ($socialMedia->icon_social_media && Storage::disk('public')->exists($socialMedia->icon_social_media)) {
                Storage::disk('public')->delete($socialMedia->icon_social_media);
            }
            $data['icon_social_media'] = null;
        }


        $this->socialMediaService->updateSocialMedia($id, $data);

        return redirect()->route('social_media.index')
            ->with('status', 'Social Media berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->socialMediaService->deleteSocialMedia($id);

        return redirect()->route('social_media.index')
            ->with('status', 'Social Media berhasil dihapus!');
    }
}
