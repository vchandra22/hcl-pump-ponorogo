<?php

namespace App\Repositories\Homepage;

use App\Models\Homepage\HomepageModel;

class HomepageRepository implements HomepageRepositoryInterface
{
    protected $model;

    public function __construct(HomepageModel $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $homepage = $this->model->findOrFail($id);
        $homepage->update($data);
        return $homepage;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }

    public function getWithMeta($id)
    {
        return $this->model->with('meta')->findOrFail($id);
    }
}
