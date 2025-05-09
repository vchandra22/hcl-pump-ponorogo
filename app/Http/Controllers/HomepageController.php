<?php

namespace App\Http\Controllers;

use App\Services\HomepageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomepageController extends Controller
{
    protected $homepageService;

    /**
     * Constructor
     */
    public function __construct(HomepageService $homepageService)
    {
        $this->homepageService = $homepageService;
    }

    /**
     * Menampilkan daftar homepage
     */
    public function index()
    {
        $homepages = $this->homepageService->getAllHomepages();

        return Inertia::render('homepage/index', [
            'homepages' => $homepages,
            'status' => session('status'),
        ]);
    }

    /**
     * Menampilkan form untuk membuat homepage baru
     */
    public function create()
    {
        return Inertia::render('homepage/form');
    }

    /**
     * Menyimpan homepage baru
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
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

        if ($request->hasFile('banner_image')) {
            $data['banner_image'] = $request->file('banner_image')->store('homepage', 'public');
        }

        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('og-images', 'public');
        }

        $this->homepageService->createHomepageWithMeta($data);

        return redirect()->route('homepage.index')->with('status', 'Homepage berhasil dibuat!');
    }

    /**
     * Menampilkan detail homepage
     */
    public function show($id)
    {
        //
    }

    /**
     * Menampilkan form untuk edit homepage
     */
    public function edit($id)
    {
        $homepage = $this->homepageService->getHomepageWithMeta($id);

        $data = [
            'id' =>  $homepage->id,
            'title' => $homepage->title,
            'description' => $homepage->description,
            'banner_image' =>  $homepage->banner_image,
            'meta_title' => $homepage->meta->meta_title,
            'meta_description' => $homepage->meta->meta_description,
            'meta_keywords' => $homepage->meta->meta_keywords,
            'og_image' => $homepage->meta->og_image,
            'image_alt' => $homepage->meta->image_alt
        ];

        return Inertia::render('homepage/form', [
            'homepage' => $data
        ]);
    }

    /**
     * Update homepage
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_alt' => 'nullable|string',
            'banner_image_old' => 'nullable|string',
            'og_image_old' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $homepage = $this->homepageService->getHomepageWithMeta($id);

        $data = $request->only([
            'title', 'description',
            'meta_title', 'meta_description', 'meta_keywords', 'image_alt'
        ]);

        // handle banner image
        if ($request['banner_image']) {
            if ($homepage->banner_image && Storage::disk('public')->exists($homepage->banner_image)) {
                Storage::disk('public')->delete($homepage->banner_image);
            }
            $data['banner_image'] = $request->file('banner_image')->store('homepage', 'public');
        }

        // handle og image
        if ($request['og_image']) {
            if ($homepage->meta->og_image && Storage::disk('public')->exists($homepage->meta->og_image)) {
                Storage::disk('public')->delete($homepage->meta->og_image);
            }
            $data['og_image'] = $request->file('og_image')->store('homepage/og', 'public');
        }

        $data['banner_image'] = $request['banner_image'] ? $data['banner_image'] : $request['banner_image_old'];

        $data['og_image'] = $request['og_image'] ? $data['og_image'] : $request['og_image_old'];

        $this->homepageService->updateHomepageWithMeta($id, $data);
        // dd($data);

        return redirect()->route('homepage.index')
            ->with('status', 'Homepage berhasil diperbarui!');
    }

    /**
     * Hapus homepage
     */
    public function destroy($id)
    {
        $this->homepageService->deleteHomepageWithMeta($id);

        return redirect()->route('homepage.index')
            ->with('status', 'Homepage berhasil dihapus!');
    }
}
