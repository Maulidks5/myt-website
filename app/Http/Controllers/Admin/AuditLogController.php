<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/AuditLogs', [
            'logs' => AuditLog::with('user:id,name,email')
                ->latest()
                ->paginate(40)
                ->through(fn (AuditLog $log) => [
                    'id' => $log->id,
                    'user' => $log->user ? [
                        'name' => $log->user->name,
                        'email' => $log->user->email,
                    ] : null,
                    'action' => $log->action,
                    'module' => $log->module,
                    'description' => $log->description,
                    'ip_address' => $log->ip_address,
                    'created_at' => $log->created_at?->format('M d, Y H:i'),
                ]),
        ]);
    }
}
