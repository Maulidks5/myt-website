<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\ClientProject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ClientProjectController extends Controller
{
    private const SERVICES = ['Website', 'System', 'Branding', 'Hosting', 'Social Media', 'Other'];
    private const STATUSES = ['New', 'In Progress', 'Waiting Payment', 'Completed', 'Paused', 'Cancelled'];

    public function index(): Response
    {
        $records = ClientProject::latest()->get();

        return Inertia::render('Admin/Clients', [
            'records' => $records,
            'serviceOptions' => self::SERVICES,
            'statusOptions' => self::STATUSES,
            'summary' => [
                'clients' => $records->unique(fn (ClientProject $record) => strtolower($record->client_name.'|'.$record->business_name))->count(),
                'projects' => $records->count(),
                'revenue' => (float) $records->sum('amount_paid'),
                'balance' => (float) $records->sum(fn (ClientProject $record) => $record->balance),
                'profit' => (float) $records->sum(fn (ClientProject $record) => $record->profit),
            ],
            'serviceSummary' => $records
                ->groupBy('service_type')
                ->map(fn ($items, string $service) => [
                    'service' => $service,
                    'projects' => $items->count(),
                    'revenue' => (float) $items->sum('amount_paid'),
                    'profit' => (float) $items->sum(fn (ClientProject $record) => $record->profit),
                ])
                ->values(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $record = ClientProject::create($this->validated($request));
        AuditLog::record('create', 'Clients', $record, "Created client project: {$record->project_name}");

        return back()->with('success', 'Client project saved.');
    }

    public function update(Request $request, ClientProject $client): RedirectResponse
    {
        $client->update($this->validated($request));
        AuditLog::record('update', 'Clients', $client, "Updated client project: {$client->project_name}");

        return back()->with('success', 'Client project updated.');
    }

    public function destroy(ClientProject $client): RedirectResponse
    {
        AuditLog::record('delete', 'Clients', $client, "Deleted client project: {$client->project_name}");
        $client->delete();

        return back()->with('success', 'Client project deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'client_name' => ['required', 'string', 'max:255'],
            'business_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'service_type' => ['required', Rule::in(self::SERVICES)],
            'project_name' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in(self::STATUSES)],
            'start_date' => ['nullable', 'date'],
            'deadline' => ['nullable', 'date'],
            'total_price' => ['required', 'numeric', 'min:0'],
            'amount_paid' => ['required', 'numeric', 'min:0'],
            'expenses' => ['required', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string', 'max:5000'],
            'credential_url' => ['nullable', 'url', 'max:500'],
            'credential_username' => ['nullable', 'string', 'max:1000'],
            'credential_password' => ['nullable', 'string', 'max:1000'],
            'credential_notes' => ['nullable', 'string', 'max:3000'],
        ]);
    }
}
