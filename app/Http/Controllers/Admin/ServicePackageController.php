<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\MarketingService;
use App\Models\ServicePackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ServicePackageController extends Controller
{
    public function store(Request $request, MarketingService $service): RedirectResponse
    {
        $package = $service->packages()->create($this->validated($request));
        AuditLog::record('create', 'Packages', $package, "Created package: {$package->name}");

        return back()->with('success', 'Package created.');
    }

    public function update(Request $request, ServicePackage $package): RedirectResponse
    {
        $package->update($this->validated($request));
        AuditLog::record('update', 'Packages', $package, "Updated package: {$package->name}");

        return back()->with('success', 'Package updated.');
    }

    public function destroy(ServicePackage $package): RedirectResponse
    {
        AuditLog::record('delete', 'Packages', $package, "Deleted package: {$package->name}");
        $package->delete();

        return back()->with('success', 'Package deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tag' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'price_label' => ['nullable', 'string', 'max:255'],
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
