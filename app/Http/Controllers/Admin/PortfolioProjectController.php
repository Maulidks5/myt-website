<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\MarketingService;
use App\Models\PortfolioProject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Portfolio', [
            'projects' => PortfolioProject::with('service')->orderByDesc('is_featured')->orderBy('sort_order')->latest()->get(),
            'services' => MarketingService::where('is_active', true)->orderByDesc('is_featured')->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $project = PortfolioProject::create($this->payload($request));
        AuditLog::record('create', 'Portfolio', $project, "Created portfolio project: {$project->title}");

        return back()->with('success', 'Project created.');
    }

    public function update(Request $request, PortfolioProject $portfolio): RedirectResponse
    {
        $portfolio->update($this->payload($request, $portfolio));
        AuditLog::record('update', 'Portfolio', $portfolio, "Updated portfolio project: {$portfolio->title}");

        return back()->with('success', 'Project updated.');
    }

    public function destroy(PortfolioProject $portfolio): RedirectResponse
    {
        AuditLog::record('delete', 'Portfolio', $portfolio, "Deleted portfolio project: {$portfolio->title}");
        if ($portfolio->image_url && str_starts_with($portfolio->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $portfolio->image_url));
        }

        $portfolio->delete();

        return back()->with('success', 'Project deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'marketing_service_id' => ['required', 'exists:marketing_services,id'],
            'title' => ['required', 'string', 'max:255'],
            'client_name' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'challenge' => ['nullable', 'string', 'max:2000'],
            'solution' => ['nullable', 'string', 'max:2000'],
            'result' => ['nullable', 'string', 'max:2000'],
            'is_featured' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);
    }

    private function payload(Request $request, ?PortfolioProject $portfolio = null): array
    {
        $data = $this->validated($request);
        $service = MarketingService::find($data['marketing_service_id']);

        $data['category'] = $portfolio?->category ?? $service?->portfolio_category ?? 'General';
        $data['gradient'] = $portfolio?->gradient ?? 'linear-gradient(135deg,#0891b2,#06b6d4)';

        if ($request->hasFile('image')) {
            if ($portfolio?->image_url && str_starts_with($portfolio->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $portfolio->image_url));
            }

            $data['image_url'] = Storage::url($request->file('image')->store('portfolio', 'public'));
        }

        unset($data['image']);

        return $data;
    }
}
