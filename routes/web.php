<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\SocialMediaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontendController::class, 'home'])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('/homepage')->group(function () {
        Route::get('/', [HomepageController::class, 'index'])->name('homepage.index');
        Route::get('/create', [HomepageController::class, 'create'])->name('homepage.create');
        Route::post('/store', [HomepageController::class, 'store'])->name('homepage.store');
        Route::get('/{id}/edit', [HomepageController::class, 'edit'])->name('homepage.edit');
        Route::put('/{id}/update', [HomepageController::class, 'update'])->name('homepage.update');
        Route::delete('/{id}/delete', [HomepageController::class, 'destroy'])->name('homepage.delete');
    });

    Route::prefix('/contacts')->group(function () {
        Route::get('/', [ContactController::class, 'index'])->name('contact.index');
        Route::get('/create', [ContactController::class, 'create'])->name('contact.create');
        Route::post('/store', [ContactController::class, 'store'])->name('contact.store');
        Route::get('/{id}/edit', [ContactController::class, 'edit'])->name('contact.edit');
        Route::post('/{id}/update', [ContactController::class, 'update'])->name('contact.update');
        Route::delete('/{id}/delete', [ContactController::class, 'destroy'])->name('contact.delete');
    });

    Route::prefix('/about_us')->group(function () {
        Route::get('/', [AboutController::class, 'index'])->name('about.index');
        Route::get('/create', [AboutController::class, 'create'])->name('about.create');
        Route::post('/store', [AboutController::class, 'store'])->name('about.store');
        Route::get('/{id}/edit', [AboutController::class, 'edit'])->name('about.edit');
        Route::put('/{id}/update', [AboutController::class, 'update'])->name('about.update');
        Route::delete('/{id}/delete', [AboutController::class, 'destroy'])->name('about.delete');
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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
