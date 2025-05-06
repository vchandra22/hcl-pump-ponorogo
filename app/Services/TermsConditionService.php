<?php

namespace App\Services;

use App\Repositories\Meta\MetaRepository;
use App\Repositories\TermsCondition\TermsConditionRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TermsConditionService
{
    protected $termsConditionRepository;
    protected $metaRepository;

    public function __construct(TermsConditionRepository $termsConditionRepository, MetaRepository $metaRepository)
    {
        $this->termsConditionRepository = $termsConditionRepository;
        $this->metaRepository = $metaRepository;
    }

    public function getAllTermsCondition()
    {
        return $this->termsConditionRepository->all();
    }

    public function getTermsConditionWithMeta($id)
    {
        return $this->termsConditionRepository->find($id);
    }

    public function createTermsConditionWithMeta(array $data)
    {
        DB::beginTransaction();
        try {
            if (isset($data['og_image']) && is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                $data['og_image'] = $data['og_image']->store('terms/og', 'public');
            }

            // Buat meta data dahulu
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $meta = $this->metaRepository->create($metaData);

            // Buat terms dengan meta_id
            $termsConditionData = [
                'terms_and_condition' => $data['terms_and_condition'],
                'meta_id' => $meta->id,
            ];

            $termsCondition = $this->termsConditionRepository->create($termsConditionData);

            DB::commit();
            return $termsCondition;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function updateTermsConditionWithMeta($id, array $data)
    {
        DB::beginTransaction();
        try {
            $termsCondition = $this->termsConditionRepository->find($id);

            if (isset($data['og_image'])) {
                if (is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                    if ($termsCondition->meta->og_image && Storage::disk('public')->exists($termsCondition->meta->og_image)) {
                        Storage::disk('public')->delete($termsCondition->meta->og_image);
                    }
                    $data['og_image'] = $data['og_image']->store('terms/og', 'public');
                }
            } else {
                $data['og_image'] = $termsCondition->meta->og_image;
            }

            // Update meta data
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $this->metaRepository->update($termsCondition->meta_id, $metaData);

            // Update terms data
            $termsConditionData = [
                'terms_and_condition' => $data['terms_and_condition'],
            ];

            $this->termsConditionRepository->update($id, $termsConditionData);

            DB::commit();
            return $this->termsConditionRepository->find($id);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function deleteTermsConditionWithMeta($id)
    {
        DB::beginTransaction();
        try {
            $termsCondition = $this->termsConditionRepository->find($id);
            $metaId = $termsCondition->meta_id;

            // Hapus file og_image dari meta jika ada
            if ($termsCondition->meta && $termsCondition->meta->og_image && Storage::disk('public')->exists($termsCondition->meta->og_image)) {
                Storage::disk('public')->delete($termsCondition->meta->og_image);
            }

            $this->termsConditionRepository->delete($id);
            $this->metaRepository->delete($metaId);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
