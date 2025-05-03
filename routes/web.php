<?php

use App\Http\Controllers\FrontendController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\ProductController;
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
    
    Route::prefix('/products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('product.index');
        Route::get('/create', [ProductController::class, 'create'])->name('product.create');
        Route::post('/store', [ProductController::class, 'store'])->name('product.store');
        Route::get('/{id}/edit', [ProductController::class, 'edit'])->name('product.edit');
        Route::put('/{id}/update', [ProductController::class, 'update'])->name('product.update');
        Route::delete('/{id}/delete', [ProductController::class, 'destroy'])->name('product.delete');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
