<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\HomepageService;
use Illuminate\Http\Request;
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
