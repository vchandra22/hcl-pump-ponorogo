<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Illuminate\Http\Request;
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
            'title' => 'required||max:255',
            'summary' => 'required',
            'content' => 'required',
            'image_article' => 'required',
            'author' => 'required',
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

        $article = $this->articleService->createArticleWithMeta($request->all());

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
            'author' => $article->author,
            'image_article' => $article->image_article,
            'meta_title' => $article->meta_title,
            'meta_description' => $article->meta_description,
            'meta_keywords' => $article->meta_keywords,
            'og_image' => $article->og_image,
            'image_alt' => $article->image_alt,
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
            'title' => 'required||max:255',
            'summary' => 'required',
            'content' => 'required',
            'image_article' => 'required',
            'author' => 'required',
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

        $article = $this->articleService->updateArticleWithMeta($id, $request->all());

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
