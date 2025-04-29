<?php

namespace App\Repositories\Meta;

use App\Models\Meta\MetaModel;

class MetaRepository implements MetaRepositoryInterface
{
    protected $meta;

    public function __construct(MetaModel $meta)
    {
        $this->meta = $meta;
    }

    public function all()
    {
        return $this->meta->all();
    }

    public function find($id)
    {
        return $this->meta->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->meta->create($data);
    }

    public function update($id, array $data)
    {
        $meta = $this->meta->findOrFail($id);
        $meta->update($data);
        return $meta;
    }

    public function delete($id)
    {
        return $this->meta->findOrFail($id)->delete();
    }
}
