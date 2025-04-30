<?php

namespace App\Repositories\SocialMedia;

use App\Models\SocialMediaModel;

class SocialMediaRepository implements SocialMediaRepositoryInterface
{
    protected $model;

    public function __construct(SocialMediaModel $model)
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
        $socialMedia = $this->model->findOrFail($id);
        $socialMedia->update($data);

        return $socialMedia;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
}
