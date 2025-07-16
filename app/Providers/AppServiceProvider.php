<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            RepositoryInterface::class,
            BookRepository::class
        );
        $this->app->bind(
            \App\Repositories\ReviewRepository::class,
            function ($app) {
                return new \App\Repositories\ReviewRepository(new \App\Models\Review);
            }
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
