<?php

namespace App\Http\Middleware;

use App\Models\SeoPage;
use App\Models\SiteSetting;
use App\Models\ContactMessage;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'auth' => [
                'user' => fn () => $request->user() ? [
                    ...$request->user()->only(['id', 'name', 'email', 'is_active', 'can_access_client_dashboard']),
                    'permissions' => $request->user()->permissions ?? [],
                ] : null,
            ],
            'adminCounts' => fn () => $request->user() ? [
                'unreadMessages' => Schema::hasTable('contact_messages') ? ContactMessage::whereNull('read_at')->count() : 0,
                'pendingTestimonials' => Schema::hasTable('testimonials') ? Testimonial::where('is_active', false)->count() : 0,
            ] : null,
            'siteSettings' => fn () => Schema::hasTable('site_settings') ? SiteSetting::first() : null,
            'seoPages' => fn () => Schema::hasTable('seo_pages') ? SeoPage::all()->keyBy('path') : [],
        ];
    }
}
