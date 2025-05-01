<?php

namespace App\Providers;

use App\Repositories\About\AboutRepository;
use App\Repositories\About\AboutRepositoryInterface;
use App\Repositories\Article\ArticleRepository;
use App\Repositories\Article\ArticleRepositoryInterface;
use App\Repositories\Contact\ContactRepository;
use App\Repositories\Contact\ContactRepositoryInterface;
use App\Repositories\Homepage\HomepageRepository;
use App\Repositories\Homepage\HomepageRepositoryInterface;
use App\Repositories\Meta\MetaRepository;
use App\Repositories\Meta\MetaRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(MetaRepositoryInterface::class, MetaRepository::class);
        $this->app->bind(HomepageRepositoryInterface::class, HomepageRepository::class);

        $this->app->bind(ContactRepositoryInterface::class, ContactRepository::class);
        $this->app->bind(AboutRepositoryInterface::class, AboutRepository::class);
        $this->app->bind(ArticleRepositoryInterface::class, ArticleRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
