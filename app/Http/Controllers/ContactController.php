<?php

namespace App\Http\Controllers;

use App\Services\ContactService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ContactController extends Controller
{
    protected $contactService;

    /**
     * Constructor
     */
    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = $this->contactService->getAllContacts();

        return Inertia::render('contact/index', [
            'contacts' => $contacts,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('contact/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'business_hours' => 'required|string|max:255',
            'gmaps_embed_code' => 'required|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $contact = $this->contactService->createContactWithMeta($request->all());

        return redirect()->route('contact.index')->with('status', 'Kontak berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $contact = $this->contactService->getContactWithMeta($id);

        $data = [
            'id' => $contact->id,
            'title' => $contact->title,
            'description' => $contact->description,
            'email' => $contact->email,
            'phone' => $contact->phone,
            'address' => $contact->address,
            'business_hours' => $contact->business_hours,
            'gmaps_embed_code' => $contact->gmaps_embed_code,
            'meta_title' => $contact->meta->meta_title,
            'meta_description' => $contact->meta->meta_description,
            'meta_keywords' => $contact->meta->meta_keywords,
            'og_image' => $contact->meta->og_image,
            'image_alt' => $contact->meta->image_alt
        ];

        return Inertia::render('contact/form', [
            'contact' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'business_hours' => 'required|string|max:255',
            'gmaps_embed_code' => 'required|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'image_alt' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $contact = $this->contactService->updateContactWithMeta($id, $request->all());

        return redirect()->route('contact.index')
            ->with('status', 'Kontak berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->contactService->deleteContactWithMeta($id);

        return redirect()->route('contact.index')
            ->with('status', 'Kontak berhasil dihapus!');
    }
}
