<?php

namespace App\Services;

use App\Repositories\About\AboutRepository;
use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\DB;

class AboutService{
    protected $aboutRepository;
    protected $metaRepository;

    public function __construct(AboutRepository $aboutRepository, MetaRepository $metaRepository)
    {
        $this->aboutRepository = $aboutRepository;
        $this->metaRepository = $metaRepository;
    }

    public function getAllAbout()
    {
        return $this->aboutRepository->all();
    }

    public function getAboutWithMeta($id)
    {
        return $this->aboutRepository->find($id);
    }

    public function createAboutWithMeta(array $data)
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

            // Buat about dengan meta_id
            $aboutData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'image_company' => $data['image_company'] ?? null,
                'meta_id' => $meta->id,
            ];

            $about = $this->aboutRepository->create($aboutData);

            DB::commit();
            return $about;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function updateAboutWithMeta($id, array $data)
    {
        DB::beginTransaction();
        try {
            $about = $this->aboutRepository->find($id);

            // Update meta data
            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $this->metaRepository->update($about->meta_id, $metaData);

            // Update homepage data
            $aboutData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'image_company' => $data['image_company'] ?? $about->image_company,
            ];

            $this->aboutRepository->update($id, $aboutData);

            DB::commit();
            return $this->aboutRepository->find($id);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function deleteAboutWithMeta($id)
    {
        DB::beginTransaction();
        try {
            $about = $this->aboutRepository->find($id);
            $metaId = $about->meta_id;

            // Hapus about terlebih dahulu
            $this->aboutRepository->delete($id);

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