<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TermsConditionController;
use App\Services\MetaService;
use App\Services\ProductImageService;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', [FrontendController::class, 'home'])->name('home');
Route::prefix('/product')->group(function () {
    Route::get('/', [FrontendController::class, 'product'])->name('product');
    Route::get('/{slug}', [FrontendController::class, 'productDetail'])->name('product.detail');
});

Route::prefix('/article')->group(function () {
    Route::get('/', [FrontendController::class, 'article'])->name('article.index');
    Route::get('/detail', [FrontendController::class, 'articleDetail'])->name('article.detail');
});

Route::prefix('/about')->group(function () {
    Route::get('/', [FrontendController::class, 'about'])->name('about.index');
});

Route::get('/contact', [FrontendController::class, 'contact'])->name('contact.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('/homepage')->group(function () {
        Route::get('/', [HomepageController::class, 'index'])->name('homepage.index');
        Route::get('/create', [HomepageController::class, 'create'])->name('homepage.create');
        Route::post('/store', [HomepageController::class, 'store'])->name('homepage.store');
        Route::get('/{id}/edit', [HomepageController::class, 'edit'])->name('homepage.edit');
        Route::post('/{id}/update', [HomepageController::class, 'update'])->name('homepage.update');
        Route::delete('/{id}/delete', [HomepageController::class, 'destroy'])->name('homepage.delete');
    });

    Route::prefix('/about-us')->group(function () {
        Route::get('/', [AboutController::class, 'index'])->name('about.index');
        Route::get('/create', [AboutController::class, 'create'])->name('about.create');
        Route::post('/store', [AboutController::class, 'store'])->name('about.store');
        Route::get('/{id}/edit', [AboutController::class, 'edit'])->name('about.edit');
        Route::post('/{id}/update', [AboutController::class, 'update'])->name('about.update');
        Route::delete('/{id}/delete', [AboutController::class, 'destroy'])->name('about.delete');
    });

    Route::prefix('/submission')->group(function () {
        Route::get('/', [SubmissionController::class, 'index'])->name('submission.index');
        Route::get('/create', [SubmissionController::class, 'create'])->name('submission.create');
        Route::post('/store', [SubmissionController::class, 'store'])->name('submission.store');
        Route::get('/{id}', [SubmissionController::class, 'show'])->name('submission.show');
        Route::delete('/{id}/delete', [SubmissionController::class, 'destroy'])->name('submission.delete');
    });

    Route::prefix('/social-media')->group(function () {
        Route::get('/', [SocialMediaController::class, 'index'])->name('social_media.index');
        Route::get('/create', [SocialMediaController::class, 'create'])->name('social_media.create');
        Route::post('/store', [SocialMediaController::class, 'store'])->name('social_media.store');
        Route::get('/{id}/edit', [SocialMediaController::class, 'edit'])->name('social_media.edit');
        Route::post('/{id}/update', [SocialMediaController::class, 'update'])->name('social_media.update');
        Route::delete('/{id}/delete', [SocialMediaController::class, 'destroy'])->name('social_media.delete');
    });

    Route::prefix('/articles')->group(function () {
        Route::get('/', [ArticleController::class, 'index'])->name('articles.index');
        Route::get('/create', [ArticleController::class, 'create'])->name('articles.create');
        Route::post('/store', [ArticleController::class, 'store'])->name('articles.store');
        Route::get('/{id}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
        Route::post('/{id}/update', [ArticleController::class, 'update'])->name('articles.update');
        Route::delete('/{id}/delete', [ArticleController::class, 'destroy'])->name('articles.delete');
    });

    Route::prefix('/contacts')->group(function () {
        Route::get('/', [ContactController::class, 'index'])->name('contact.index');
        Route::get('/create', [ContactController::class, 'create'])->name('contact.create');
        Route::post('/store', [ContactController::class, 'store'])->name('contact.store');
        Route::get('/{id}/edit', [ContactController::class, 'edit'])->name('contact.edit');
        Route::post('/{id}/update', [ContactController::class, 'update'])->name('contact.update');
        Route::delete('/{id}/delete', [ContactController::class, 'destroy'])->name('contact.destroy');
    });

    Route::prefix('/terms-conditions')->group(function () {
        Route::get('/', [TermsConditionController::class, 'index'])->name('terms.index');
        Route::get('/create', [TermsConditionController::class, 'create'])->name('terms.create');
        Route::post('/store', [TermsConditionController::class, 'store'])->name('terms.store');
        Route::get('/{id}/edit', [TermsConditionController::class, 'edit'])->name('terms.edit');
        Route::post('/{id}/update', [TermsConditionController::class, 'update'])->name('terms.update');
        Route::delete('/{id}/delete', [TermsConditionController::class, 'destroy'])->name('terms.delete');
    });

    Route::prefix('/privacy-policy')->group(function () {
        Route::get('/', [PrivacyPolicyController::class, 'index'])->name('privacy-policy.index');
        Route::get('/create', [PrivacyPolicyController::class, 'create'])->name('privacy-policy.create');
        Route::post('/store', [PrivacyPolicyController::class, 'store'])->name('privacy-policy.store');
        Route::get('/{id}/edit', [PrivacyPolicyController::class, 'edit'])->name('privacy-policy.edit');
        Route::post('/{id}/update', [PrivacyPolicyController::class, 'update'])->name('privacy-policy.update');
        Route::delete('/{id}/delete', [PrivacyPolicyController::class, 'destroy'])->name('privacy-policy.delete');
    });

    Route::prefix('/products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('product.index');
        Route::get('/create', [ProductController::class, 'create'])->name('product.create');
        Route::post('/store', [ProductController::class, 'store'])->name('product.store');
        Route::get('/{id}/edit', [ProductController::class, 'edit'])->name('product.edit');
        Route::post('/{id}/update', [ProductController::class, 'update'])->name('product.update');
        Route::delete('/{id}/delete', [ProductController::class, 'destroy'])->name('product.delete');
    });

    Route::delete('/image/{id}/delete', function (string $id, ProductImageService $product_image_service) {
        try {
            $product_image_service->deleteProductImage($id);
            return back()->with('success', 'Delete image successfully.');
        } catch(\Exception $err) {
            dd($err);
            return back()->with('failed', 'Delete image failed. Error: '.$err);
        }
    });

    Route::delete('/og-image/{id}/delete', function (string $id, MetaService $meta_service) {
        try {
            $meta = $meta_service->getMetaById($id);
            $array = explode('/', $meta->og_image);
            $path = implode('/', array_splice($array, 2));
            Storage::disk('public')->delete($path);

            $meta_service->updateMeta($id, [
                'meta_title' => $meta->meta_title,
                'meta_description' => $meta->meta_description,
                'meta_keywords' => $meta->meta_keywords,
                'og_image' => null,
                'image_alt' => $meta->image_alt
            ]);

            return back()->with('success', 'Delete OG image successfully.');
        } catch(\Exception $err) {
            dd($err);
            return back()->with('failed', 'Delete OG image failed. Error: '.$err);
        }
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
