<?php

namespace App\Repositories\Disclaimer;

use App\Models\DisclaimerModel;

class DisclaimerRepository implements DisclaimerRepositoryInterface
{
    protected $model;

    public function __construct(DisclaimerModel $model)
    {
        $this->model = $model;
    }

    public function all()
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
        $disclaimer = $this->model->findOrFail($id);
        $disclaimer->update($data);

        return $disclaimer;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
}
