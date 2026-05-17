<?php

namespace Tests\Feature;

use App\Mail\ContactMessageReceived;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactMessageTest extends TestCase
{
    use DatabaseTransactions;

    public function test_contact_form_stores_a_message(): void
    {
        Mail::fake();

        $response = $this->post('/contact', [
            'name' => 'Test Client',
            'email' => 'client@example.com',
            'phone' => '+255657963896',
            'subject' => 'Website inquiry',
            'service_name' => 'Website Design & Development',
            'package_name' => 'Business Website',
            'message' => 'I need a business website.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Test Client',
            'email' => 'client@example.com',
            'phone' => '+255657963896',
            'subject' => 'Website inquiry',
            'service_name' => 'Website Design & Development',
            'package_name' => 'Business Website',
            'message' => 'I need a business website.',
        ]);

        Mail::assertSent(ContactMessageReceived::class, function (ContactMessageReceived $mail) {
            return $mail->contactMessage->email === 'client@example.com'
                && $mail->hasTo(config('mail.contact_recipient.address'));
        });
    }

    public function test_contact_form_requires_name_email_and_message(): void
    {
        $response = $this->post('/contact', []);

        $response->assertSessionHasErrors(['name', 'email', 'message']);
    }
}
