<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminMessagesTest extends TestCase
{
    use DatabaseTransactions;

    public function test_admin_messages_page_shows_contact_messages(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin-test@example.com',
            'permissions' => ['dashboard.view', 'messages.manage'],
            'password' => Hash::make('password'),
        ]);

        ContactMessage::create([
            'name' => 'Dashboard Client',
            'email' => 'dashboard@example.com',
            'phone' => '+255657963896',
            'subject' => 'Dashboard inquiry',
            'service_name' => 'System Development',
            'package_name' => 'Custom Business System',
            'message' => 'Please build my website.',
        ]);

        $this->actingAs($admin)
            ->get('/admin/messages')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Messages', false)
                ->has('messages.data')
                ->where('messages.data.0.name', 'Dashboard Client')
                ->where('messages.data.0.email', 'dashboard@example.com')
                ->where('messages.data.0.service_name', 'System Development')
                ->where('messages.data.0.package_name', 'Custom Business System')
                ->where('messages.data.0.is_read', false)
                ->where('unreadCount', fn (int $count) => $count >= 1)
            );
    }

    public function test_guest_is_redirected_to_admin_login(): void
    {
        $this->get('/admin/messages')
            ->assertRedirect('/admin/login');
    }

    public function test_admin_can_login(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'login-admin@example.com',
            'permissions' => ['dashboard.view'],
            'password' => Hash::make('secret-password'),
        ]);

        $this->post('/admin/login', [
            'email' => 'login-admin@example.com',
            'password' => 'secret-password',
        ])->assertRedirect(route('admin.dashboard'));

        $this->assertAuthenticated();
    }

    public function test_admin_can_mark_message_as_read(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'read-admin@example.com',
            'permissions' => ['dashboard.view', 'messages.manage'],
            'password' => Hash::make('password'),
        ]);

        $message = ContactMessage::create([
            'name' => 'Unread Client',
            'email' => 'unread@example.com',
            'message' => 'Please call me.',
        ]);

        $this->actingAs($admin)
            ->patch("/admin/messages/{$message->id}/read")
            ->assertRedirect();

        $this->assertNotNull($message->fresh()->read_at);
    }

    public function test_admin_can_delete_message(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'delete-admin@example.com',
            'permissions' => ['dashboard.view', 'messages.manage'],
            'password' => Hash::make('password'),
        ]);

        $message = ContactMessage::create([
            'name' => 'Delete Client',
            'email' => 'delete@example.com',
            'message' => 'Remove this lead.',
        ]);

        $this->actingAs($admin)
            ->delete("/admin/messages/{$message->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('contact_messages', [
            'id' => $message->id,
        ]);
    }
}
