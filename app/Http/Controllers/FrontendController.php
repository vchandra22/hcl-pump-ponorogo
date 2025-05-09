<?php

namespace App\Http\Controllers;

use App\Models\SocialMediaModel;
use App\Services\AboutService;
use App\Services\ArticleService;
use App\Services\ContactService;
use App\Services\DisclaimerService;
use App\Services\HomepageService;
use App\Services\PrivacyPolicyService;
use App\Services\ProductService;
use App\Services\ReasonService;
use App\Services\SocialMediaService;
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

    public function home(ProductService $productService, ArticleService $articleService, ReasonService $reasonService, SocialMediaService $socialMediaService)
    {
        $homepage = $this->homepageService->getAllHomepages();
        $product = $productService->getFeaturedProducts();
        $articles = $articleService->getAllArticles();
        $socialMedia = $socialMediaService->getSocialMediaWithNoAddrees();
        $socialMediaLink = SocialMediaModel::where('platform', 'whatsapp')->first();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();
        // dd($sendaddress);    
        $reasonService = $reasonService->getAllReasons();
        return Inertia::render('frontends/index', [
            'homepage' => $homepage,
            'product' => $product,
            'articles' => $articles,
            'base_url' => url('/'),
            'social_media_link' => $socialMediaLink['social_media_link'],
            'reason_service' => $reasonService,
            'social_media' => $socialMedia,
            'addressData' => $sendAddress,
        ]);
    }

    public function product(SocialMediaService $socialMediaService)
    {
        $product = $this->product_service->getAllProducts();
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $socialMediaLink = SocialMediaModel::where('platform', 'whatsapp')->first();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();

        return Inertia::render('frontends/product/index', [
            'products' => $product,
            'social_media' => $socialMedia,
            'social_media_link' => $socialMediaLink['social_media_link'],
            'base_url' => url('/'),
            'addressData' => $sendAddress,
        ]);
    }

    public function article(AboutService $aboutService, ArticleService $articleService, SocialMediaService $socialMediaService)
    {
        $about = $aboutService->getAllAbout();
        $articles = $articleService->getPaginatedArticles(
            perPage: 4,
            columns: ['id', 'title', 'slug', 'summary', 'content', 'image_article', 'author', 'meta_id', 'created_at'], // Select specific columns
            pageName: 'articles_page'
        );
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();

        return Inertia::render('frontends/article/index', [
            'about' => $about,
            'articles' => $articles,
            'social_media' => $socialMedia,
            'base_url' => url('/'),
            'addressData' => $sendAddress,

        ]);
    }

    public function about(AboutService $aboutService, ProductService $productService, SocialMediaService $socialMediaService)
    {
        $about = $aboutService->getAllAbout();
        $product = $productService->getFeaturedProducts();
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $socialMediaLink = SocialMediaModel::where('platform', 'whatsapp')->firstOrFail();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();

        return Inertia::render('frontends/about_us/index', [
            'about' => $about,
            'product' => $product,
            'social_media' => $socialMedia,
            'social_media_link' => $socialMediaLink['social_media_link'],
            'base_url' => url('/'),
            'addressData' => $sendAddress,
        ]);
    }

    public function articleDetail($slug, ArticleService $articleService, SocialMediaService $socialMediaService)
    {
        $article = $articleService->getArticleBySlug($slug);
        $listArticle = $articleService->getAllArticles();
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();

        return Inertia::render('frontends/article/detail', [
            'article' => $article,
            'listArticle' => $listArticle,
            'social_media' => $socialMedia,
            'base_url' => url('/'),
            'addressData' => $sendAddress,
        ]);
    }

    public function contact(ContactService $contactService, SocialMediaService $socialMediaService)
    {
        $contacts = $contactService->getAllContacts();
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();

        return Inertia::render('frontends/contact/index', [
            'contacts' => $contacts,
            'social_media' => $socialMedia,
            'base_url' => url('/'),
            'status' => session('status'),
            'addressData' => $sendAddress,
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

    public function productDetail(string $slug, SocialMediaService $socialMediaService)
    {
        try {
            $product = $this->product_service->getProductBySlug($slug);
            $products = $this->product_service->getAllProducts();
            $socialMedia = $socialMediaService->getAllSocialMedia();
            $socialMediaLink = SocialMediaModel::where('platform', 'whatsapp')->first();
            $address = SocialMediaModel::where('platform', 'address')->get();
            $sendAddress = $address->pluck('title')->toArray();

            if (!$product) {
                abort(404, 'Produk tidak ditemukan.');
            }

            return Inertia::render('frontends/product/detail', [
                'product' => $product,
                'products' => $products,
                'social_media' => $socialMedia,
                'social_media_link' => $socialMediaLink['social_media_link'],
                'addressData' => $sendAddress,
            ]);
        } catch (\Exception $err) {
            return back()->with('failed', 'Produk tidak ditemukan.');
        }
    }

    public function termsCondition(TermsConditionService $termsConditionService, SocialMediaService $socialMediaService)
    {
        $termsCondition = $termsConditionService->getAllTermsCondition();
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();

        return Inertia::render('frontends/terms/index', [
            'terms_condition' => $termsCondition,
            'social_media' => $socialMedia,
            'base_url' => url('/'),
            'addressData' => $sendAddress,
        ]);
    }

    public function privacyPolicy(PrivacyPolicyService $privacyPolicyService, SocialMediaService $socialMediaService)
    {
        $privacyPolicy = $privacyPolicyService->getAllPrivacyPolicy();
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();

        return Inertia::render('frontends/privacy_policy/index', [
            'privacy_policy' => $privacyPolicy,
            'social_media' => $socialMedia,
            'base_url' => url('/'),
            'addressData' => $sendAddress,
        ]);
    }

    public function disclaimer(DisclaimerService $disclaimerService, SocialMediaService $socialMediaService)
    {
        $disclaimer = $disclaimerService->getAllDisclaimer();
        $socialMedia = $socialMediaService->getAllSocialMedia();
        $address = SocialMediaModel::where('platform', 'address')->get();
        $sendAddress = $address->pluck('title')->toArray();
        
        return Inertia::render('frontends/disclaimer/index', [
            'disclaimer' => $disclaimer,
            'social_media' => $socialMedia,
            'base_url' => url('/'),
            'addressData' => $sendAddress,
        ]);
    }
}
