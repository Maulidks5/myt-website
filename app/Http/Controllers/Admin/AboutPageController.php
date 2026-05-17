<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\AboutPage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutPageController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/About', [
            'about' => AboutPage::firstOrCreate([], $this->defaults()),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $about = AboutPage::firstOrCreate([], $this->defaults());
        $data = $request->validate([
            'hero_title' => ['required', 'string', 'max:255'],
            'hero_subtitle' => ['required', 'string', 'max:1000'],
            'about_image' => ['nullable', 'image', 'max:4096'],
            'story_eyebrow' => ['required', 'string', 'max:100'],
            'story_title' => ['required', 'string', 'max:255'],
            'story_body' => ['required', 'string', 'max:3000'],
            'story_body_extra' => ['nullable', 'string', 'max:3000'],
            'mission_title' => ['required', 'string', 'max:255'],
            'mission_text' => ['required', 'string', 'max:2000'],
            'vision_title' => ['required', 'string', 'max:255'],
            'vision_text' => ['required', 'string', 'max:2000'],
            'values_text' => ['nullable', 'string', 'max:5000'],
        ]);

        if ($request->hasFile('about_image')) {
            $data['about_image_url'] = $this->storeImage($request->file('about_image'), $about->about_image_url);
        }

        $data['values'] = collect(preg_split('/\r\n|\r|\n/', $data['values_text'] ?? ''))
            ->map(fn (string $line) => array_map('trim', explode('|', $line, 3)))
            ->filter(fn (array $parts) => count($parts) === 3 && $parts[0] !== '' && $parts[1] !== '' && $parts[2] !== '')
            ->map(fn (array $parts) => ['icon_name' => $parts[0], 'title' => $parts[1], 'text' => $parts[2]])
            ->values()
            ->all();

        unset($data['values_text'], $data['about_image']);
        $about->update($data);
        AuditLog::record('update', 'About', $about, 'Updated about page content.');

        return back()->with('success', 'About page updated.');
    }

    private function storeImage(UploadedFile $file, ?string $oldImage = null): string
    {
        if ($oldImage && str_starts_with($oldImage, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $oldImage));
        }

        return Storage::url($file->store('about', 'public'));
    }

    private function defaults(): array
    {
        return [
            'hero_title' => 'About MYT',
            'hero_subtitle' => "We're a young, passionate digital studio building modern technology and creative solutions for ambitious businesses.",
            'story_eyebrow' => 'Our Story',
            'story_title' => 'From a small idea to a full digital partner',
            'story_body' => 'Mwambao Youth Technology was founded by a group of young creatives and developers with one belief: modern technology should be accessible to every business. Today MYT helps companies of all sizes design, build and grow their digital presence with services that cover web, systems, branding and content.',
            'story_body_extra' => 'We combine technical excellence with creative thinking to deliver work that not only looks great but drives real results.',
            'mission_title' => 'Our Mission',
            'mission_text' => 'To empower businesses with affordable, modern digital solutions that drive growth and unlock new opportunities.',
            'vision_title' => 'Our Vision',
            'vision_text' => 'To become the most trusted technology and creative partner for ambitious brands across the region and beyond.',
            'values' => [
                ['icon_name' => 'Award', 'title' => 'Excellence', 'text' => 'We pursue craft and quality in every pixel and every line of code.'],
                ['icon_name' => 'Heart', 'title' => 'Integrity', 'text' => 'Honest communication, transparent pricing, dependable delivery.'],
                ['icon_name' => 'Lightbulb', 'title' => 'Innovation', 'text' => 'We embrace new tools and ideas to keep our clients ahead.'],
                ['icon_name' => 'Users', 'title' => 'Collaboration', 'text' => 'We treat our clients as long-term partners, not transactions.'],
            ],
        ];
    }
}
