<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\SubmissionController;
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
    Route::prefix('/about_us')->group(function () {
        Route::get('/', [AboutController::class, 'index'])->name('about.index');
        Route::get('/create', [AboutController::class, 'create'])->name('about.create');
        Route::post('/store', [AboutController::class, 'store'])->name('about.store');
        Route::get('/{id}/edit', [AboutController::class, 'edit'])->name('about.edit');
        Route::put('/{id}/update', [AboutController::class, 'update'])->name('about.update');
        Route::delete('/{id}/delete', [AboutController::class, 'destroy'])->name('about.delete');
    });
    Route::prefix('/submission')->group(function () {
        Route::get('/', [SubmissionController::class, 'index'])->name('submission.index');
        Route::get('/create', [SubmissionController::class, 'create'])->name('submission.create');
        Route::post('/store', [SubmissionController::class, 'store'])->name('submission.store');
        Route::get('/{id}', [SubmissionController::class, 'show'])->name('submission.show');
        Route::delete('/{id}/delete', [SubmissionController::class, 'destroy'])->name('submission.delete');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
