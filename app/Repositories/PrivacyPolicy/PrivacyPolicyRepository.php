<?php

namespace App\Repositories\PrivacyPolicy;

use App\Models\PrivacyPolicy;

class PrivacyPolicyRepository implements PrivacyPolicyRepositoryInterface
{
    protected $model;

    public function __construct(PrivacyPolicy $model)
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
        $privacyPolicy = $this->model->findOrFail($id);
        $privacyPolicy->update($data);
        return $privacyPolicy;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
}
