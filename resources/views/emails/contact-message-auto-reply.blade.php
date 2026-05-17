<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>We received your message</title>
    </head>
    <body style="margin: 0; padding: 0; background: #f6f8fb; color: #102033; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f6f8fb; padding: 32px 16px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5edf4;">
                        <tr>
                            <td style="background: #0b3551; padding: 28px 32px;">
                                <h1 style="margin: 0; color: #5ec8c8; font-size: 24px;">Thank you, {{ $contactMessage->name }}</h1>
                                <p style="margin: 8px 0 0; color: #d7e8f0; font-size: 14px;">We have received your message.</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 32px;">
                                <p style="margin: 0 0 16px; line-height: 1.7;">
                                    Hello {{ $contactMessage->name }},
                                </p>
                                <p style="margin: 0 0 16px; line-height: 1.7;">
                                    Thank you for contacting Mwambao Youth Technology. Our team has received your inquiry and will review your project details shortly.
                                </p>
                                <p style="margin: 0 0 20px; line-height: 1.7;">
                                    We usually respond as soon as possible with the next steps, package guidance, timeline, and any questions needed to prepare a clear quote.
                                </p>

                                <div style="margin: 24px 0; padding: 20px; border-radius: 10px; background: #f3f7fa;">
                                    <div style="margin-bottom: 8px; color: #6b7c8f; font-size: 13px; text-transform: uppercase;">Your message summary</div>
                                    <div style="line-height: 1.6;"><strong>Subject:</strong> {{ $contactMessage->subject ?: 'Website inquiry' }}</div>
                                    <div style="line-height: 1.6;"><strong>Service:</strong> {{ $contactMessage->service_name ?: 'General inquiry' }}</div>
                                </div>

                                <p style="margin: 0; color: #6b7c8f; font-size: 13px; line-height: 1.6;">
                                    This is an automatic confirmation from {{ config('mail.from.address') }}. You can reply to this email if you need to add more details.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
