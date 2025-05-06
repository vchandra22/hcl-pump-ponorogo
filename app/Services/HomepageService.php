<?php

namespace App\Services;

use App\Repositories\Homepage\HomepageRepository;
use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class HomepageService
{
    protected $homepageRepository;
    protected $metaRepository;

    public function __construct(HomepageRepository $homepageRepository, MetaRepository $metaRepository)
    {
        $this->homepageRepository = $homepageRepository;
        $this->metaRepository = $metaRepository;
    }

    public function getAllHomepages()
    {
        return $this->homepageRepository->all();
    }

    public function getHomepageWithMeta($id)
    {
        return $this->homepageRepository->find($id);
    }

    public function createHomepageWithMeta(array $data)
    {
        DB::beginTransaction();
        try {
            if (isset($data['og_image']) && is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                $data['og_image'] = $data['og_image']->store('homepage/og', 'public');
            }

            if (isset($data['banner_image']) && is_object($data['banner_image']) && method_exists($data['banner_image'], 'isValid') && $data['banner_image']->isValid()) {
                $data['banner_image'] = $data['banner_image']->store('homepage/content', 'public');
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
            $homepageData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'banner_image' => $data['banner_image'] ?? null,
                'meta_id' => $meta->id,
            ];

            $homepage = $this->homepageRepository->create($homepageData);

            DB::commit();
            return $homepage;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function updateHomepageWithMeta($id, array $data)
    {
        DB::beginTransaction();
        try {
            $homepage = $this->homepageRepository->find($id);

            if (isset($data['og_image'])) {
                if (is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                    if ($homepage->meta->og_image && Storage::disk('public')->exists($homepage->meta->og_image)) {
                        Storage::disk('public')->delete($homepage->meta->og_image);
                    }
                    $data['og_image'] = $data['og_image']->store('homepage/og', 'public');
                }
            } else {
                $data['og_image'] = $homepage->meta->og_image;
            }

            if (isset($data['banner_image'])) {
                if (is_object($data['banner_image']) && method_exists($data['banner_image'], 'isValid') && $data['banner_image']->isValid()) {
                    if ($homepage->banner_image && Storage::disk('public')->exists($homepage->banner_image)) {
                        Storage::disk('public')->delete($homepage->banner_image);
                    }
                    $data['banner_image'] = $data['banner_image']->store('homepage/content', 'public');
                }
            } else {
                $data['banner_image'] = $homepage->banner_image;
            }

            // Update meta data
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $this->metaRepository->update($homepage->meta_id, $metaData);

            // Update homepage data
            $homepageData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'banner_image' => $data['banner_image'] ?? $homepage->banner_image,
            ];

            $this->homepageRepository->update($id, $homepageData);

            DB::commit();
            return $this->homepageRepository->find($id);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function deleteHomepageWithMeta($id)
    {
        DB::beginTransaction();
        try {
            $homepage = $this->homepageRepository->find($id);
            $metaId = $homepage->meta_id;

            // Hapus file og_image dari meta jika ada
            if ($homepage->meta && $homepage->meta->og_image && Storage::disk('public')->exists($homepage->meta->og_image)) {
                Storage::disk('public')->delete($homepage->meta->og_image);
            }

            // Hapus file banner_image jika ada
            if ($homepage->banner_image && Storage::disk('public')->exists($homepage->banner_image)) {
                Storage::disk('public')->delete($homepage->banner_image);
            }

            // Hapus homepage terlebih dahulu
            $this->homepageRepository->delete($id);

            // Kemudian hapus meta
            $this->metaRepository->delete($metaId);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
