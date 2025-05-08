<?php

namespace App\Services;

use App\Repositories\Reason\ReasonRepository;
use Illuminate\Support\Facades\DB;

class ReasonService
{
    protected $reasonRepository;

    public function __construct(ReasonRepository $reasonRepository)
    {
        $this->reasonRepository = $reasonRepository;
    }

    public function getAllReasons()
    {
        return $this->reasonRepository->all();
    }

    public function getReasonById($id)
    {
        return $this->reasonRepository->find($id);
    }

    public function createReason(array $data)
    {
        DB::beginTransaction();
        try {
            $reason = $this->reasonRepository->create($data);
            DB::commit();
            return $reason;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateReason($id, array $data)
    {
        DB::beginTransaction();
        try {
            $reason = $this->reasonRepository->update($id, $data);
            DB::commit();
            return $reason;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteReason($id)
    {
        DB::beginTransaction();
        try {
            $this->reasonRepository->delete($id);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}