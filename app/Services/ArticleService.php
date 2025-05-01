<?php

namespace App\Services;

use App\Repositories\Article\ArticleRepository;
use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ArticleService
{
    protected $articleRepository;
    protected $metaRepository;

    public function __construct(ArticleRepository $articleRepository, MetaRepository $metaRepository)
    {
        $this->articleRepository = $articleRepository;
        $this->metaRepository = $metaRepository;
    }

    public function getAllArticles()
    {
        return $this->articleRepository->all();
    }

    public function getArticleWithMeta($id)
    {
        return $this->articleRepository->find($id);
    }

    public function createArticleWithMeta(array $data)
    {
        DB::beginTransaction();
        try {
            // Buat meta data dahulu
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $meta = $this->metaRepository->create($metaData);

            $articleData = [
                'title' => $data['title'] ?? null,
                'summary' => $data['summary'] ?? null,
                'content' => $data['content'] ?? null,
                'image_article' => $data['image_article'] ?? null,
                'author' => Auth::user()->name,
                'meta_id' => $meta->id,
            ];

            $article = $this->articleRepository->create($articleData);

            DB::commit();
            return $article;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateArticleWithMeta($id, array $data)
    {
        DB::beginTransaction();
        try {
            $article = $this->articleRepository->find($id);

            // Update meta data
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $this->metaRepository->update($article->meta_id, $metaData);

            $articleData = [
                'title' => $data['title'] ?? null,
                'summary' => $data['summary'] ?? null,
                'content' => $data['content'] ?? null,
                'image_article' => $data['image_article'] ?? null,
                'author' => Auth::user()->name,
                'meta_id' => $article->meta_id,
            ];

            $this->articleRepository->update($id, $articleData);

            DB::commit();
            return $this->articleRepository->find($id);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteArticleWithMeta($id)
    {
        DB::beginTransaction();
        try {
            $article = $this->articleRepository->find($id);
            $metaId = $article->meta_id;

            $this->metaRepository->delete($metaId);

            $this->metaRepository->delete($metaId);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
