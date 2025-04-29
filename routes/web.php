<?php

use App\Http\Controllers\Frontend\FrontendController;
use App\Http\Controllers\Homepage\HomepageController;
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
        Route::get('/{id}/delete', [HomepageController::class, 'delete'])->name('homepage.delete');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
