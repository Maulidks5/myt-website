<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageAutoReply;
use App\Mail\ContactMessageReceived;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['nullable', 'string', 'max:255'],
            'service_name' => ['nullable', 'string', 'max:255'],
            'package_name' => ['nullable', 'string', 'max:255'],
            'budget_range' => ['nullable', 'string', 'max:255'],
            'timeline' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $contactMessage = ContactMessage::create($validated);
        $recipient = config('mail.contact_recipient.address');

        try {
            Mail::to($recipient)->send(new ContactMessageReceived($contactMessage));
        } catch (\Throwable $exception) {
            Log::error('Contact notification email failed.', [
                'contact_message_id' => $contactMessage->id,
                'recipient' => $recipient,
                'error' => $exception->getMessage(),
            ]);
        }

        try {
            Mail::to($contactMessage->email)->send(new ContactMessageAutoReply($contactMessage));
        } catch (\Throwable $exception) {
            Log::error('Contact auto-reply email failed.', [
                'contact_message_id' => $contactMessage->id,
                'auto_reply_recipient' => $contactMessage->email,
                'error' => $exception->getMessage(),
            ]);
        }

        return back()->with('success', 'Message sent successfully. We will get back to you soon.');
    }
}
