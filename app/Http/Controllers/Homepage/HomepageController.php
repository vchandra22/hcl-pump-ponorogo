<?php

namespace App\Http\Controllers\Homepage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Services\HomepageService;

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
            'homepages' => $homepages
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
            'banner_image' => 'nullable|string',
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

        $homepage = $this->homepageService->createHomepageWithMeta($request->all());

        return redirect()->route('homepage.index')
            ->with('message', 'Homepage berhasil dibuat!');
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

        return Inertia::render('homepage/form', ['homepage' => $data]);
    }

    /**
     * Update homepage
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'banner_image' => 'nullable|string',
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

        $homepage = $this->homepageService->updateHomepageWithMeta($id, $request->all());

        return redirect()->route('homepage.index')
            ->with('message', 'Homepage berhasil diperbarui!');
    }

    /**
     * Hapus homepage
     */
    public function destroy($id)
    {
        $this->homepageService->deleteHomepageWithMeta($id);

        return redirect()->route('homepage.index')
            ->with('message', 'Homepage berhasil dihapus!');
    }
}
