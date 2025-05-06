<?php

namespace App\Services;

use App\Repositories\Meta\MetaRepository;
use App\Repositories\PrivacyPolicy\PrivacyPolicyRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PrivacyPolicyService
{
    protected $privacyPolicyRepository;
    protected $metaRepository;

    public function __construct(PrivacyPolicyRepository $privacyPolicyRepository, MetaRepository $metaRepository)
    {
        $this->privacyPolicyRepository = $privacyPolicyRepository;
        $this->metaRepository = $metaRepository;
    }

    public function getAllPrivacyPolicy()
    {
        return $this->privacyPolicyRepository->all();
    }

    public function getPrivacyPolicyWithMeta($id)
    {
        return $this->privacyPolicyRepository->find($id);
    }

    public function createPrivacyPolicyWithMeta(array $data)
    {
        DB::beginTransaction();
        try {
            if (isset($data['og_image']) && is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                $data['og_image'] = $data['og_image']->store('privacy-policy/og', 'public');
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

            // Buat homepage dengan meta_id
            $privacyPolicyData = [
                'privacy_policy' => $data['privacy_policy'],
                'meta_id' => $meta->id,
            ];

            $privacyPolicy = $this->privacyPolicyRepository->create($privacyPolicyData);

            DB::commit();
            return $privacyPolicy;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function updatePrivacyPolicyWithMeta($id, array $data)
    {
        DB::beginTransaction();
        try {
            $privacyPolicy = $this->privacyPolicyRepository->find($id);

            if (isset($data['og_image'])) {
                if (is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                    if ($privacyPolicy->meta->og_image && Storage::disk('public')->exists($privacyPolicy->meta->og_image)) {
                        Storage::disk('public')->delete($privacyPolicy->meta->og_image);
                    }
                    $data['og_image'] = $data['og_image']->store('privacy-policy/og', 'public');
                }
            } else {
                $data['og_image'] = $privacyPolicy->meta->og_image;
            }

            // Update meta data
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $this->metaRepository->update($privacyPolicy->meta_id, $metaData);

            // Update homepage data
            $privacyPolicyData = [
                'privacy_policy' => $data['privacy_policy'],
            ];

            $this->privacyPolicyRepository->update($id, $privacyPolicyData);

            DB::commit();
            return $this->privacyPolicyRepository->find($id);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function deletePrivacyPolicyWithMeta($id)
    {
        DB::beginTransaction();
        try {
            $privacyPolicy = $this->privacyPolicyRepository->find($id);
            $metaId = $privacyPolicy->meta_id;

            if ($privacyPolicy->meta && $privacyPolicy->meta->og_image && Storage::disk('public')->exists($privacyPolicy->meta->og_image)) {
                Storage::disk('public')->delete($privacyPolicy->meta->og_image);
            }

            $this->privacyPolicyRepository->delete($id);
            $this->metaRepository->delete($metaId);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
