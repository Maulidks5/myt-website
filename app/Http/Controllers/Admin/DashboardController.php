<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientProject;
use App\Models\ContactMessage;
use App\Models\Faq;
use App\Models\MarketingService;
use App\Models\PortfolioProject;
use App\Models\ServicePackage;
use App\Models\SeoPage;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $clientProjects = Schema::hasTable('client_projects') ? ClientProject::all() : collect();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'messages' => ContactMessage::count(),
                'unreadMessages' => ContactMessage::whereNull('read_at')->count(),
                'clients' => $clientProjects->unique(fn (ClientProject $record) => strtolower($record->client_name.'|'.$record->business_name))->count(),
                'clientProjects' => $clientProjects->count(),
                'clientRevenue' => (float) $clientProjects->sum('amount_paid'),
                'clientBalance' => (float) $clientProjects->sum(fn (ClientProject $record) => $record->balance),
                'clientProfit' => (float) $clientProjects->sum(fn (ClientProject $record) => $record->profit),
                'testimonials' => Testimonial::count(),
                'faqs' => Faq::count(),
                'services' => MarketingService::count(),
                'packages' => ServicePackage::count(),
                'projects' => PortfolioProject::count(),
                'seoPages' => SeoPage::count(),
            ],
            'latestMessages' => ContactMessage::latest()->take(5)->get()->map(fn (ContactMessage $message) => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'subject' => $message->subject,
                'created_at' => $message->created_at?->format('M d, Y H:i'),
            ]),
        ]);
    }
}
