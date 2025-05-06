<?php

namespace App\Repositories\TermsCondition;

use App\Models\AboutModel;
use App\Models\TermsCondition;

class TermsConditionRepository implements TermsConditionRepositoryInterface
{
    protected $model;

    public function __construct(TermsCondition $model)
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
        $termsCondition = $this->model->findOrFail($id);
        $termsCondition->update($data);
        return $termsCondition;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
}
