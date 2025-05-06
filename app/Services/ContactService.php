<?php

namespace App\Services;

use App\Repositories\Contact\ContactRepository;
use App\Repositories\Meta\MetaRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ContactService
{
    protected $contactRepository;
    protected $metaRepository;

    public function __construct(ContactRepository $contactRepository, MetaRepository $metaRepository)
    {
        $this->contactRepository = $contactRepository;
        $this->metaRepository = $metaRepository;
    }

    public function getAllContacts()
    {
        return $this->contactRepository->all();
    }

    public function getContactWithMeta($id)
    {
        return $this->contactRepository->find($id);
    }

    public function createContactWithMeta(array $data)
    {
        DB::beginTransaction();
        try {
            if (isset($data['og_image']) && is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                $data['og_image'] = $data['og_image']->store('contact/og', 'public');
            }

            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $meta = $this->metaRepository->create($metaData);

            $contactData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'business_hours' => $data['business_hours'],
                'gmaps_embed_code' => $data['gmaps_embed_code'],
                'meta_id' => $meta->id,
            ];

            $contact = $this->contactRepository->create($contactData);

            DB::commit();
            return $contact;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateContactWithMeta($id, array $data)
    {
        DB::beginTransaction();
        try {
            $contact = $this->contactRepository->find($id);

            if (isset($data['og_image'])) {
                if (is_object($data['og_image']) && method_exists($data['og_image'], 'isValid') && $data['og_image']->isValid()) {
                    if ($contact->meta->og_image && Storage::disk('public')->exists($contact->meta->og_image)) {
                        Storage::disk('public')->delete($contact->meta->og_image);
                    }
                    $data['og_image'] = $data['og_image']->store('contact/og', 'public');
                }
            } else {
                $data['og_image'] = $contact->meta->og_image;
            }

            $metaData = [
                'meta_title' => $data['meta_title'] ?? null,
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'og_image' => $data['og_image'] ?? null,
                'image_alt' => $data['image_alt'] ?? null,
            ];

            $this->metaRepository->update($contact->meta_id, $metaData);

            $contactData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'business_hours' => $data['business_hours'],
                'gmaps_embed_code' => $data['gmaps_embed_code'],
            ];

            $this->contactRepository->update($id, $contactData);

            DB::commit();
            return $this->contactRepository->find($id);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteContactWithMeta($id)
    {
        DB::beginTransaction();
        try {
            $contact = $this->contactRepository->find($id);
            $metaId = $contact->meta_id;

            // Hapus file og_image dari meta jika ada
            if ($contact->meta && $contact->meta->og_image && Storage::disk('public')->exists($contact->meta->og_image)) {
                Storage::disk('public')->delete($contact->meta->og_image);
            }

            $this->contactRepository->delete($id);

            $this->metaRepository->delete($metaId);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
