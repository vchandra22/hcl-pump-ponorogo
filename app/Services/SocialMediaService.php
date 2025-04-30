<?php

namespace App\Services;

use App\Repositories\SocialMedia\SocialMediaRepository;
use Illuminate\Support\Facades\DB;

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

            $socialMediaData = [
                'icon_social_media' => $data['icon_social_media'],
                'platform' => $data['platform'],
                'title' => $data['title'],
                'social_media_link' => $data['social_media_link'],
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
            $this->SocialMediaRepository->delete($id);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
