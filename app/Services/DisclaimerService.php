<?php

namespace App\Services;

use App\Repositories\Disclaimer\DisclaimerRepository;
use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DisclaimerService
{
    protected $disclaimerRepository;
    protected $metaRepository;

    public function __construct(DisclaimerRepository $disclaimerRepository, MetaRepository $metaRepository)
    {
        $this->disclaimerRepository = $disclaimerRepository;
        $this->metaRepository = $metaRepository;
    }

    public function getAllDisclaimer()
    {
        return $this->disclaimerRepository->all();
    }

    public function getDisclaimerWithMeta($id)
    {
        return $this->disclaimerRepository->find($id);
    }

    public function createDisclaimerWithMeta(array $data)
    {
        DB::beginTransaction();
        try {
            if (isset($data['og_image']) && is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                $data['og_image'] = $data['og_image']->store('disclaimer/og', 'public');
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

            // Buat disclaimer dengan meta_id
            $disclaimerData = [
                'disclaimer' => $data['disclaimer'],
                'meta_id' => $meta->id,
            ];

            $disclaimer = $this->disclaimerRepository->create($disclaimerData);

            DB::commit();
            return $disclaimer;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function updateDisclaimerWithMeta($id, array $data)
    {
        DB::beginTransaction();
        try {
            $disclaimer = $this->disclaimerRepository->find($id);

            if (isset($data['og_image'])) {
                if (is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                    if ($disclaimer->meta->og_image && Storage::disk('public')->exists($disclaimer->meta->og_image)) {
                        Storage::disk('public')->delete($disclaimer->meta->og_image);
                    }
                    $data['og_image'] = $data['og_image']->store('disclaimer/og', 'public');
                }
            } else {
                $data['og_image'] = $disclaimer->meta->og_image;
            }

            // Update meta data
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $this->metaRepository->update($disclaimer->meta_id, $metaData);

            // Update homepage data
            $disclaimerData = [
                'disclaimer' => $data['disclaimer'],
            ];

            $this->disclaimerRepository->update($id, $disclaimerData);

            DB::commit();
            return $this->disclaimerRepository->find($id);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function deleteDisclaimerWithMeta($id)
    {
        DB::beginTransaction();
        try {
            $disclaimer = $this->disclaimerRepository->find($id);
            $metaId = $disclaimer->meta_id;

            if ($disclaimer->meta && $disclaimer->meta->og_image && Storage::disk('public')->exists($disclaimer->meta->og_image)) {
                Storage::disk('public')->delete($disclaimer->meta->og_image);
            }

            $this->disclaimerRepository->delete($id);
            $this->metaRepository->delete($metaId);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
