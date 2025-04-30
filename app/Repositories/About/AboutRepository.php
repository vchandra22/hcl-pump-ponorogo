<?php

namespace App\Repositories\About;
use App\Models\AboutModel;
use Illuminate\Database\Eloquent\Collection;

class AboutRepository implements AboutRepositoryInterface{
    
    protected $model;

    public function __construct(AboutModel $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->with('meta')->get();
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
        $homepage = $this->model->findOrFail($id);
        $homepage->update($data);
        return $homepage;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
}