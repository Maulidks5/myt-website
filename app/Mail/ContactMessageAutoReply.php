<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageAutoReply extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public ContactMessage $contactMessage
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [config('mail.from.address')],
            subject: 'We received your message - Mwambao Youth Technology',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-message-auto-reply',
        );
    }
}
