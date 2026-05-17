<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(): Response
    {
        $unreadCount = ContactMessage::query()
            ->whereNull('read_at')
            ->count();

        $messages = ContactMessage::query()
            ->latest()
            ->paginate(15)
            ->through(fn (ContactMessage $message) => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'phone' => $message->phone,
                'subject' => $message->subject,
                'service_name' => $message->service_name,
                'package_name' => $message->package_name,
                'budget_range' => $message->budget_range,
                'timeline' => $message->timeline,
                'message' => $message->message,
                'is_read' => $message->read_at !== null,
                'created_at' => $message->created_at?->format('M d, Y H:i'),
            ]);

        return Inertia::render('Admin/Messages', [
            'messages' => $messages,
            'unreadCount' => $unreadCount,
        ]);
    }

    public function markRead(ContactMessage $message): RedirectResponse
    {
        $message->forceFill([
            'read_at' => now(),
        ])->save();
        AuditLog::record('update', 'Leads', $message, "Marked lead as read: {$message->email}");

        return back();
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        AuditLog::record('delete', 'Leads', $message, "Deleted lead: {$message->email}");
        $message->delete();

        return back();
    }
}
