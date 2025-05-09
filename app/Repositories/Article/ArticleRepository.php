<?php

namespace App\Repositories\Article;

use App\Models\ArticleModel;
use App\Models\HomepageModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ArticleRepository implements ArticleRepositoryInterface
{
    protected $model;

    public function __construct(ArticleModel $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->with('meta')->latest()->get();
    }

    public function find($id)
    {
        return $this->model->with('meta')->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $article = $this->model->findOrFail($id);
        $article->update($data);

        return $article;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }

    public function findBySlug($slug)
    {
        return $this->model->with('meta')->where('slug', $slug)->first();
    }

    public function paginate(
        int $perPage = 4,
        array $columns = ['*'],
        string $pageName = 'page',
        int|null $page = null
    ): LengthAwarePaginator {
        return $this->model->query()
            ->select($columns)
            ->with('meta')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, $columns, $pageName, $page);
    }
}
