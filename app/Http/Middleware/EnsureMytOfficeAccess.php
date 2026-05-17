<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureMytOfficeAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user?->canAccessMytOffice()) {
            return redirect()
                ->route('admin.dashboard')
                ->with('error', 'You do not have access to MYT Office.');
        }

        return $next($request);
    }
}
