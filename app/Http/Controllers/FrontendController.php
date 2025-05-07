<?php

namespace App\Http\Controllers;

use App\Services\AboutService;
use App\Services\ArticleService;
use App\Services\ContactService;
use App\Services\DisclaimerService;
use App\Services\HomepageService;
use App\Services\PrivacyPolicyService;
use App\Services\ProductService;
use App\Services\SubmissionService;
use App\Services\TermsConditionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Termwind\Components\Dd;

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
        $product = $this->product_service->getAllProducts();
        return Inertia::render('frontends/product/index', ['products' => $product]);
    }

    public function article(AboutService $aboutService, ArticleService $articleService)
    {
        $about = $aboutService->getAllAbout();
        $articles = $articleService->getAllArticles();

        return Inertia::render('frontends/article/index', [
            'about' => $about,
            'articles' => $articles,
            'base_url' => url('/'),
        ]);
    }

    public function about(AboutService $aboutService, ProductService $productService)
    {
        $about = $aboutService->getAllAbout();
        $product = $productService->getFeaturedProducts();

        return Inertia::render('frontends/about_us/index', [
            'about' => $about,
            'product' => $product,
            'base_url' => url('/'),
        ]);
    }

    public function articleDetail($slug, ArticleService $articleService)
    {
        $article = $articleService->getArticleBySlug($slug);
        $listArticle = $articleService->getAllArticles();

        return Inertia::render('frontends/article/detail', [
            'article' => $article,
            'listArticle' => $listArticle,
            'base_url' => url('/'),
        ]);
    }

    public function contact(ContactService $contactService)
    {
        $contacts = $contactService->getAllContacts();

        return Inertia::render('frontends/contact/index', [
            'contacts' => $contacts,
            'base_url' => url('/'),
            'status' => session('status'),
        ]);
    }

    public function pesanStore(Request $request, SubmissionService $submissionService)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20|regex:/^[0-9+\-\s()]+$/',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'message' => $request->input('message'),
        ];

        $submissionService->createSubmission($data);

        return redirect()->route('frontend-contact.index');
    }

    public function productDetail(string $slug)
    {
        try {
            $product = $this->product_service->getProductBySlug($slug);
            $products = $this->product_service->getAllProducts();
            if(!$product) {
                abort(404, 'Produk tidak ditemukan.');
            }

            return Inertia::render('frontends/product/detail', ['product' => $product, 'products' => $products]);
        } catch (\Exception $err) {
            return back()->with('failed', 'Produk tidak ditemukan.');
        }
    }

    public function termsCondition(TermsConditionService $termsConditionService)
    {
        $termsCondition = $termsConditionService->getAllTermsCondition();

        return Inertia::render('frontends/terms/index', [
            'terms_condition' => $termsCondition,
            'base_url' => url('/'),
        ]);
    }

    public function privacyPolicy(PrivacyPolicyService $privacyPolicyService)
    {
        $privacyPolicy = $privacyPolicyService->getAllPrivacyPolicy();

        return Inertia::render('frontends/privacy_policy/index', [
            'privacy_policy' => $privacyPolicy,
            'base_url' => url('/'),
        ]);
    }

    public function disclaimer(DisclaimerService $disclaimerService)
    {
        $disclaimer = $disclaimerService->getAllDisclaimer();

        return Inertia::render('frontends/disclaimer/index', [
            'disclaimer' => $disclaimer,
            'base_url' => url('/'),
        ]);
    }
}
