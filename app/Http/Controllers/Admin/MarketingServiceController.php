<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\MarketingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarketingServiceController extends Controller
{
    public function index(): Response
    {
        return $this->renderSection('services');
    }

    public function packages(): Response
    {
        return $this->renderSection('packages');
    }

    private function renderSection(string $section): Response
    {
        return Inertia::render('Admin/Services', [
            'services' => MarketingService::with(['packages' => fn ($query) => $query->orderBy('sort_order')->latest()])
                ->orderByDesc('is_featured')
                ->orderBy('sort_order')
                ->latest()
                ->get(),
            'initialSection' => $section,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $service = MarketingService::create($this->validated($request));
        AuditLog::record('create', 'Services', $service, "Created service: {$service->title}");

        return back()->with('success', 'Service created.');
    }

    public function update(Request $request, MarketingService $service): RedirectResponse
    {
        $service->update($this->validated($request));
        AuditLog::record('update', 'Services', $service, "Updated service: {$service->title}");

        return back()->with('success', 'Service updated.');
    }

    public function destroy(MarketingService $service): RedirectResponse
    {
        AuditLog::record('delete', 'Services', $service, "Deleted service: {$service->title}");
        $service->delete();

        return back()->with('success', 'Service deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'icon_name' => ['required', 'string', 'max:50'],
            'portfolio_category' => ['required', 'string', 'max:100'],
            'features_text' => ['nullable', 'string', 'max:2000'],
            'is_featured' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $data['features'] = collect(preg_split('/\r\n|\r|\n/', $data['features_text'] ?? ''))
            ->map(fn (string $feature) => trim($feature))
            ->filter()
            ->values()
            ->all();

        unset($data['features_text']);

        return $data;
    }
}
