<?php

namespace App\Services;

use App\Repositories\Submission\SubmissionRepository;
use Illuminate\Support\Facades\DB;

class SubmissionService{
    protected $submissionRepository;

    public function __construct(SubmissionRepository $submissionRepository)
    {
        $this->submissionRepository = $submissionRepository;
    }

    public function getAllSubmission()
    {
        return $this->submissionRepository->all();
    }

    public function getSubmissionById($id)
    {
        return $this->submissionRepository->find($id);
    }

    public function createSubmission(array $data)
    {
        DB::beginTransaction();
        try {
        
            $submissionData = [
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'message' => $data['message'],
            ];

            $submission = $this->submissionRepository->create($submissionData);

            DB::commit();
            return $submission;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }


    public function deleteSubmission($id)
    {
        DB::beginTransaction();
        try {
            $this->submissionRepository->delete($id);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

}