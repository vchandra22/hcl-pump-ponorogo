<?php

namespace App\Repositories\Contact;

use App\Models\ContactModel;
use Ramsey\Collection\Collection;

class ContactRepository implements ContactRepositoryInterface
{
    protected $model;

    public function __construct(ContactModel $model)
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
        $contact = $this->model->findOrFail($id);
        $contact->update($data);

        return $contact;
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
}
