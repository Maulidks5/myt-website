<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::orderBy('name')->get(['id', 'name', 'email', 'is_active', 'can_access_client_dashboard', 'permissions', 'created_at']),
            'availablePermissions' => User::availablePermissions(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'is_active' => ['required', 'boolean'],
            'permissions' => ['array'],
            'permissions.*' => [Rule::in(array_keys(User::availablePermissions()))],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $data['permissions'] = $this->normalizePermissions($data['permissions'] ?? []);
        $data['can_access_client_dashboard'] = in_array('clients.manage', $data['permissions'], true);

        $user = User::create($data);
        AuditLog::record('create', 'Users', $user, "Created user: {$user->email}");

        return back()->with('success', 'User created.');
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'is_active' => ['required', 'boolean'],
            'permissions' => ['array'],
            'permissions.*' => [Rule::in(array_keys(User::availablePermissions()))],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $data['permissions'] = $this->normalizePermissions($data['permissions'] ?? []);

        if ($request->user()->is($user) && (! $data['is_active'] || ! in_array('users.manage', $data['permissions'], true))) {
            return back()->withErrors([
                'is_active' => 'You cannot remove your own active user-management access.',
            ]);
        }

        if (blank($data['password'])) {
            unset($data['password']);
        }

        $data['can_access_client_dashboard'] = in_array('clients.manage', $data['permissions'], true);

        $user->update($data);
        AuditLog::record('update', 'Users', $user, "Updated user: {$user->email}");

        return back()->with('success', 'User updated.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->is($user)) {
            return back()->withErrors([
                'user' => 'You cannot delete your own account.',
            ]);
        }

        AuditLog::record('delete', 'Users', $user, "Deleted user: {$user->email}");
        $user->delete();

        return back()->with('success', 'User deleted.');
    }

    /**
     * @param  array<int, string>  $permissions
     * @return array<int, string>
     */
    private function normalizePermissions(array $permissions): array
    {
        return array_values(array_unique([
            'dashboard.view',
            ...$permissions,
        ]));
    }
}
