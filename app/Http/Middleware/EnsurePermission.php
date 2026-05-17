<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePermission
{
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        if (! $request->user()?->canAccess($permission)) {
            if ($request->user()?->canAccess('dashboard.view')) {
                return redirect()
                    ->route('admin.dashboard')
                    ->with('error', 'You do not have access to that admin section.');
            }

            abort(403);
        }

        return $next($request);
    }
}
