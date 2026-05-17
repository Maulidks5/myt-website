<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>New Website Inquiry</title>
    </head>
    <body style="margin: 0; padding: 0; background: #f6f8fb; color: #102033; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f6f8fb; padding: 32px 16px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5edf4;">
                        <tr>
                            <td style="background: #0b3551; padding: 28px 32px;">
                                <h1 style="margin: 0; color: #5ec8c8; font-size: 24px;">New Website Inquiry</h1>
                                <p style="margin: 8px 0 0; color: #d7e8f0; font-size: 14px;">A visitor submitted the contact form on {{ config('app.name') }}.</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 32px;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f; width: 120px;">Name</td>
                                        <td style="padding: 10px 0; font-weight: bold;">{{ $contactMessage->name }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f;">Email</td>
                                        <td style="padding: 10px 0;">
                                            <a href="mailto:{{ $contactMessage->email }}" style="color: #168a9b;">{{ $contactMessage->email }}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f;">Phone</td>
                                        <td style="padding: 10px 0;">{{ $contactMessage->phone ?: 'Not provided' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f;">Subject</td>
                                        <td style="padding: 10px 0;">{{ $contactMessage->subject ?: 'No subject' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f;">Service</td>
                                        <td style="padding: 10px 0;">{{ $contactMessage->service_name ?: 'General inquiry' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f;">Package</td>
                                        <td style="padding: 10px 0;">{{ $contactMessage->package_name ?: 'Not selected' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f;">Budget</td>
                                        <td style="padding: 10px 0;">{{ $contactMessage->budget_range ?: 'Not selected' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7c8f;">Timeline</td>
                                        <td style="padding: 10px 0;">{{ $contactMessage->timeline ?: 'Not selected' }}</td>
                                    </tr>
                                </table>

                                <div style="margin-top: 24px; padding: 20px; border-radius: 10px; background: #f3f7fa;">
                                    <div style="margin-bottom: 8px; color: #6b7c8f; font-size: 13px; text-transform: uppercase;">Message</div>
                                    <div style="white-space: pre-line; line-height: 1.6;">{{ $contactMessage->message }}</div>
                                </div>

                                <p style="margin: 24px 0 0; color: #6b7c8f; font-size: 13px;">
                                    Received on {{ $contactMessage->created_at?->format('M d, Y H:i') }}.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
