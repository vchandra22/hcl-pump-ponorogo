<?php

namespace App\Services;

use App\Repositories\SocialMedia\SocialMediaRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SocialMediaService
{
    protected $SocialMediaRepository;

    public function __construct(SocialMediaRepository $SocialMediaRepository)
    {
        $this->SocialMediaRepository = $SocialMediaRepository;
    }

    public function getAllSocialMedia()
    {
        return $this->SocialMediaRepository->all();
    }

    public function getSocialMediaById($id)
    {
        return $this->SocialMediaRepository->find($id);
    }

    public function createSocialMedia(array $data)
    {
        DB::beginTransaction();
        try {

            if (isset($data['icon_social_media']) && is_object($data['icon_social_media']) && method_exists($data['icon_social_media'], 'isValid') && $data['icon_social_media']->isValid()) {
                $data['icon_social_media'] = $data['icon_social_media']->store('social-media/icon', 'public');
            }

            $socialMediaData = [
                'icon_social_media' => $data['icon_social_media'],
                'platform' => $data['platform'],
                'title' => $data['title'],
                'social_media_link' => $data['social_media_link'],
            ];

            $socialMedia = $this->SocialMediaRepository->create($socialMediaData);

            DB::commit();
            return $socialMedia;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateSocialMedia($id, array $data)
    {
        DB::beginTransaction();
        try {
            $socialMedia = $this->SocialMediaRepository->find($id);

            if (isset($data['icon_social_media'])) {
                if (is_object($data['icon_social_media']) && method_exists($data['icon_social_media'], 'isValid') && $data['icon_social_media']->isValid()) {
                    if ($socialMedia->icon_social_media && Storage::disk('public')->exists($socialMedia->icon_social_media)) {
                        Storage::disk('public')->delete($socialMedia->icon_social_media);
                    }
                    $data['icon_social_media'] = $data['icon_social_media']->store('social-media/icon', 'public');
                }
            } else {
                $data['icon_social_media'] = $socialMedia->icon_social_media;
            }

            $socialMediaData = [
                'icon_social_media' => $data['icon_social_media'] ?? null,
                'platform' => $data['platform'] ?? null,
                'title' => $data['title'] ?? null,
                'social_media_link' => $data['social_media_link'] ?? null,
            ];

            $this->SocialMediaRepository->update($id, $socialMediaData);

            DB::commit();
            return $this->SocialMediaRepository->find($id);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteSocialMedia($id)
    {
        DB::beginTransaction();
        try {
            $socialMedia = $this->SocialMediaRepository->find($id);

            // Hapus file icon_social_media dari meta jika ada
            if ($socialMedia->icon_social_media && Storage::disk('public')->exists($socialMedia->icon_social_media)) {
                Storage::disk('public')->delete($socialMedia->icon_social_media);
            }

            $this->SocialMediaRepository->delete($id);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
