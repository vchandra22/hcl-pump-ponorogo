<?php

namespace App\Http\Controllers;

use App\Services\HomepageService;
use Inertia\Inertia;

class FrontendController extends Controller
{
    protected $homepageService;

    public function __construct(HomepageService $homepageService)
    {
        $this->homepageService = $homepageService;
    }

    public function home() {
        $homepages = $this->homepageService->getAllHomepages();

        return Inertia::render('frontends/index', [
            'homepages' => $homepages
        ]);
    }
}
