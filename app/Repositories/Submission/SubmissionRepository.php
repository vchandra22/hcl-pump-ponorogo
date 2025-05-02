<?php

namespace App\Repositories\Submission;
use App\Models\SubmissionModel;
use Illuminate\Database\Eloquent\Collection;

class SubmissionRepository implements SubmissionRepositoryInterface{
    
    protected $model;

    public function __construct(SubmissionModel $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->get();
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
}