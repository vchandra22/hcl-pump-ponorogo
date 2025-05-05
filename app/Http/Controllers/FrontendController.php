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

    public function product()
    {
        return Inertia::render('frontends/product/index');
    }

    public function article()
    {
        return Inertia::render('frontends/article/index');
    }

    public function about()
    {
        return Inertia::render('frontends/about_us/index');
    }
}
