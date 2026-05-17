<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutPage;
use App\Models\Faq;
use App\Models\HomePage;
use App\Models\MarketingService;
use App\Models\PortfolioProject;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class PreviewController extends Controller
{
    public function __invoke(string $page): Response
    {
        return match ($page) {
            'home' => Inertia::render('Index', [
                'home' => Schema::hasTable('home_pages') ? HomePage::first() : null,
                'services' => MarketingService::orderByDesc('is_featured')->orderBy('sort_order')->get(),
                'projects' => PortfolioProject::orderByDesc('is_featured')->orderBy('sort_order')->take(3)->get(),
                'testimonials' => Testimonial::orderByDesc('is_featured')->orderBy('sort_order')->get(),
                'faqs' => Faq::orderBy('sort_order')->get(),
                'isPreview' => true,
            ]),
            'about' => Inertia::render('About', [
                'about' => AboutPage::first(),
                'isPreview' => true,
            ]),
            'services' => Inertia::render('Services', [
                'services' => MarketingService::with(['packages' => fn ($query) => $query->orderByDesc('is_featured')->orderBy('sort_order')])
                    ->orderByDesc('is_featured')
                    ->orderBy('sort_order')
                    ->get(),
                'faqs' => Faq::orderBy('sort_order')->get(),
                'isPreview' => true,
            ]),
            'portfolio' => Inertia::render('Portfolio', [
                'projects' => PortfolioProject::with('service')->orderByDesc('is_featured')->orderBy('sort_order')->get(),
                'services' => MarketingService::orderByDesc('is_featured')->orderBy('sort_order')->get(),
                'categories' => PortfolioProject::select('category')->distinct()->orderBy('category')->pluck('category')->prepend('All')->values(),
                'isPreview' => true,
            ]),
            'contact' => Inertia::render('Contact', [
                'isPreview' => true,
            ]),
            default => abort(404),
        };
    }
}
