<?php

namespace App\Services;

use App\Repositories\Homepage\HomepageRepository;
use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\DB;

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
        return $this->homepageRepository->getWithMeta($id);
    }

    public function createHomepageWithMeta(array $data)
    {
        DB::beginTransaction();
        try {
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
            return $this->homepageRepository->getWithMeta($id);
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
