<?php

namespace App\Http\Controllers;

use App\Services\HomepageService;
use App\Services\ProductService;
use Inertia\Inertia;

class FrontendController extends Controller
{
    protected $homepageService;
    private $product_service;

    public function __construct(HomepageService $homepageService, ProductService $product_service)
    {
        $this->homepageService = $homepageService;
        $this->product_service = $product_service;
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

    public function articleDetail()
    {
        return Inertia::render('frontends/article/detail');
    }

    public function contact()
    {
        return Inertia::render('frontends/contact/index');
    }

    public function productDetail(string $slug)
    {
        $product = $this->product_service->getProductBySlug($slug);
        return Inertia::render('frontends/product/detail', ['product' => $product]);
    }
}
