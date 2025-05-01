<?php

namespace App\Services;

use App\Repositories\Article\ArticleRepository;
use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            // Process og_image if it's a file upload
            if (isset($data['og_image']) && is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                $data['og_image'] = $data['og_image']->store('articles/og', 'public');
            }

            // Process image_article if it's a file upload
            if (isset($data['image_article']) && is_object($data['image_article']) && method_exists($data['image_article'], 'isValid') && $data['image_article']->isValid()) {
                $data['image_article'] = $data['image_article']->store('articles/content', 'public');
            }

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

            if (isset($data['og_image'])) {
                if (is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                    // Hapus og_image lama jika ada
                    if ($article->meta->og_image && Storage::disk('public')->exists($article->meta->og_image)) {
                        Storage::disk('public')->delete($article->meta->og_image);
                    }
                    $data['og_image'] = $data['og_image']->store('articles/og', 'public');
                }
            } else {
                $data['og_image'] = $article->meta->og_image;
            }

            // Process image_article if it's a file upload - sama seperti di create
            if (isset($data['image_article'])) {
                if (is_object($data['image_article']) && method_exists($data['image_article'], 'isValid') && $data['image_article']->isValid()) {
                    // Hapus image_article lama jika ada
                    if ($article->image_article && Storage::disk('public')->exists($article->image_article)) {
                        Storage::disk('public')->delete($article->image_article);
                    }
                    $data['image_article'] = $data['image_article']->store('articles/content', 'public');
                }
            } else {
                $data['image_article'] = $article->image_article;
            }

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
                'image_article' => $data['image_article'],
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
            $meta = $article->meta;

            // Hapus file og_image
            if ($meta->og_image && Storage::disk('public')->exists($meta->og_image)) {
                Storage::disk('public')->delete($meta->og_image);
            }

            // Hapus file image_article
            if ($article->image_article && Storage::disk('public')->exists($article->image_article)) {
                Storage::disk('public')->delete($article->image_article);
            }

            $this->articleRepository->delete($id);
            $this->metaRepository->delete($meta->id);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
