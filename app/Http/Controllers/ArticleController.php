<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ArticleController extends Controller
{
    protected $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = $this->articleService->getAllArticles();

        return Inertia::render('articles/index', [
            'articles' => $articles,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('articles/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'summary' => 'required',
            'content' => 'required',
            'image_article' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();

        if ($request->hasFile('image_article')) {
            $data['image_article'] = $request->file('image_article')->store('articles', 'public');
        }

        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('og-images', 'public');
        }

        $this->articleService->createArticleWithMeta($data);

        return redirect()->route('articles.index')->with('status', 'Artikel berhasil ditambahkan!');
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
        $article = $this->articleService->getArticleWithMeta($id);

        $data = [
            'id' => $article->id,
            'title' => $article->title,
            'summary' => $article->summary,
            'content' => $article->content,
            'image_article' => $article->image_article,
            'meta_title' => $article->meta->meta_title,
            'meta_description' => $article->meta->meta_description,
            'meta_keywords' => $article->meta->meta_keywords,
            'og_image' => $article->meta->og_image,
            'image_alt' => $article->meta->image_alt,
        ];

        return Inertia::render('articles/form', [
            'article' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
            'image_article' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $article = $this->articleService->getArticleWithMeta($id);

        $data = $request->only([
            'title', 'summary', 'content',
            'meta_title', 'meta_description', 'meta_keywords', 'image_alt'
        ]);

        // Handle image_article
        if ($request->hasFile('image_article')) {
            if ($article->image_article && Storage::disk('public')->exists($article->image_article)) {
                Storage::disk('public')->delete($article->image_article);
            }
            $data['image_article'] = $request->file('image_article')->store('articles/content', 'public');
        } elseif ($request->input('keep_image') === 'true') {
            $data['image_article'] = $article->image_article;
        } else {
            $data['image_article'] = null;
        }

        // Handle og_image
        if ($request->hasFile('og_image')) {
            if ($article->meta->og_image && Storage::disk('public')->exists($article->meta->og_image)) {
                Storage::disk('public')->delete($article->meta->og_image);
            }
            $data['og_image'] = $request->file('og_image')->store('articles/og', 'public');
        } elseif ($request->input('keep_og_image') === 'true') {
            $data['og_image'] = $article->meta->og_image;
        } else {
            $data['og_image'] = null;
        }

        // Update article
        $this->articleService->updateArticleWithMeta($id, $data);

        return redirect()->route('articles.index')
            ->with('status', 'Artikel berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->articleService->deleteArticleWithMeta($id);

        return redirect()->route('articles.index')
            ->with('status', 'Artikel berhasil dihapus!');
    }
}
