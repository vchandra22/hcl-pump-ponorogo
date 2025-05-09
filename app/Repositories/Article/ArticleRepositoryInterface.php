<?php

namespace App\Repositories\Article;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ArticleRepositoryInterface
{
    public function all();
    public function find($id);
    public function findBySlug($slug);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function paginate(
        int $perPage = 10,
        array $columns = ['*'],
        string $pageName = 'page',
        int|null $page = null
    ): LengthAwarePaginator;
}
