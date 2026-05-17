<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\AboutPageController as AdminAboutPageController;
use App\Http\Controllers\Admin\AuditLogController as AdminAuditLogController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\ClientProjectController as AdminClientProjectController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\HomePageController as AdminHomePageController;
use App\Http\Controllers\Admin\MarketingServiceController as AdminMarketingServiceController;
use App\Http\Controllers\Admin\PortfolioProjectController as AdminPortfolioProjectController;
use App\Http\Controllers\Admin\PreviewController as AdminPreviewController;
use App\Http\Controllers\Admin\ServicePackageController as AdminServicePackageController;
use App\Http\Controllers\Admin\SiteSettingController as AdminSiteSettingController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\TestimonialSubmissionController;
use App\Models\AboutPage;
use App\Models\Faq;
use App\Models\HomePage;
use App\Models\MarketingService;
use App\Models\PortfolioProject;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Index', [
    'home' => Schema::hasTable('home_pages') ? HomePage::first() : null,
    'services' => MarketingService::where('is_active', true)->orderByDesc('is_featured')->orderBy('sort_order')->get(),
    'projects' => PortfolioProject::where('is_active', true)->orderByDesc('is_featured')->orderBy('sort_order')->take(3)->get(),
    'testimonials' => Testimonial::where('is_active', true)->orderByDesc('is_featured')->orderBy('sort_order')->get(),
    'faqs' => Faq::where('is_active', true)->orderBy('sort_order')->get(),
]))->name('home');
Route::get('/about', fn () => Inertia::render('About', [
    'about' => AboutPage::first(),
]))->name('about');
Route::get('/services', fn () => Inertia::render('Services', [
    'services' => MarketingService::with(['packages' => fn ($query) => $query->where('is_active', true)->orderByDesc('is_featured')->orderBy('sort_order')])
        ->where('is_active', true)
        ->orderByDesc('is_featured')
        ->orderBy('sort_order')
        ->get(),
    'faqs' => Faq::where('is_active', true)->orderBy('sort_order')->get(),
]))->name('services');
Route::get('/portfolio', fn () => Inertia::render('Portfolio', [
    'projects' => PortfolioProject::with('service')->where('is_active', true)->orderByDesc('is_featured')->orderBy('sort_order')->get(),
    'services' => MarketingService::where('is_active', true)->orderByDesc('is_featured')->orderBy('sort_order')->get(),
    'categories' => PortfolioProject::where('is_active', true)->select('category')->distinct()->orderBy('category')->pluck('category')->prepend('All')->values(),
]))->name('portfolio');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');
Route::post('/testimonials', [TestimonialSubmissionController::class, 'store'])->name('testimonials.store');

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AdminAuthController::class, 'create'])->name('admin.login');
    Route::post('/admin/login', [AdminAuthController::class, 'store'])->name('admin.login.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/admin', AdminDashboardController::class)->middleware('permission:dashboard.view')->name('admin.dashboard');
    Route::post('/admin/logout', [AdminAuthController::class, 'destroy'])->name('admin.logout');
    Route::get('/admin/preview/{page}', AdminPreviewController::class)->name('admin.preview');
    Route::get('/admin/messages', [AdminContactMessageController::class, 'index'])->middleware('permission:messages.manage')->name('admin.messages.index');
    Route::resource('/admin/clients', AdminClientProjectController::class)->middleware('myt-office')->only(['index', 'store', 'update', 'destroy'])->names('admin.clients')->parameters(['clients' => 'client']);
    Route::patch('/admin/messages/{message}/read', [AdminContactMessageController::class, 'markRead'])->middleware('permission:messages.manage')->name('admin.messages.read');
    Route::delete('/admin/messages/{message}', [AdminContactMessageController::class, 'destroy'])->middleware('permission:messages.manage')->name('admin.messages.destroy');
    Route::resource('/admin/testimonials', AdminTestimonialController::class)->middleware('permission:testimonials.manage')->only(['index', 'store', 'update', 'destroy'])->names('admin.testimonials');
    Route::resource('/admin/faqs', AdminFaqController::class)->middleware('permission:faqs.manage')->only(['index', 'store', 'update', 'destroy'])->names('admin.faqs');
    Route::get('/admin/packages', [AdminMarketingServiceController::class, 'packages'])->middleware('permission:services.manage')->name('admin.packages.index');
    Route::resource('/admin/services', AdminMarketingServiceController::class)->middleware('permission:services.manage')->only(['index', 'store', 'update', 'destroy'])->names('admin.services')->parameters(['services' => 'service']);
    Route::post('/admin/services/{service}/packages', [AdminServicePackageController::class, 'store'])->middleware('permission:services.manage')->name('admin.service-packages.store');
    Route::put('/admin/packages/{package}', [AdminServicePackageController::class, 'update'])->middleware('permission:services.manage')->name('admin.service-packages.update');
    Route::delete('/admin/packages/{package}', [AdminServicePackageController::class, 'destroy'])->middleware('permission:services.manage')->name('admin.service-packages.destroy');
    Route::post('/admin/portfolio/{portfolio}', [AdminPortfolioProjectController::class, 'update'])->middleware('permission:portfolio.manage')->name('admin.portfolio.multipart-update');
    Route::resource('/admin/portfolio', AdminPortfolioProjectController::class)->middleware('permission:portfolio.manage')->only(['index', 'store', 'update', 'destroy'])->names('admin.portfolio');
    Route::get('/admin/about', [AdminAboutPageController::class, 'edit'])->middleware('permission:about.manage')->name('admin.about.edit');
    Route::post('/admin/about', [AdminAboutPageController::class, 'update'])->middleware('permission:about.manage')->name('admin.about.multipart-update');
    Route::put('/admin/about', [AdminAboutPageController::class, 'update'])->middleware('permission:about.manage')->name('admin.about.update');
    Route::get('/admin/homepage', [AdminHomePageController::class, 'edit'])->middleware('permission:homepage.manage')->name('admin.homepage.edit');
    Route::put('/admin/homepage', [AdminHomePageController::class, 'update'])->middleware('permission:homepage.manage')->name('admin.homepage.update');

    Route::resource('/admin/users', AdminUserController::class)->middleware('permission:users.manage')->only(['index', 'store', 'update', 'destroy'])->names('admin.users');
    Route::get('/admin/activity-logs', [AdminAuditLogController::class, 'index'])->middleware('permission:activity-logs.view')->name('admin.audit-logs.index');
    Route::get('/admin/settings', [AdminSiteSettingController::class, 'edit'])->middleware('permission:settings.manage')->name('admin.settings.edit');
    Route::put('/admin/settings', [AdminSiteSettingController::class, 'updateSettings'])->middleware('permission:settings.manage')->name('admin.settings.update');
    Route::put('/admin/seo/{seoPage}', [AdminSiteSettingController::class, 'updateSeo'])->middleware('permission:settings.manage')->name('admin.seo.update');
});
