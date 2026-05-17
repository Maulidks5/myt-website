<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\SeoPage;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings', [
            'settings' => SiteSetting::firstOrCreate([], $this->settingDefaults()),
            'seoPages' => SeoPage::orderByRaw("FIELD(path, '/', '/about', '/services', '/portfolio', '/contact')")->get(),
        ]);
    }

    public function updateSettings(Request $request): RedirectResponse
    {
        $settings = SiteSetting::firstOrCreate([], $this->settingDefaults());
        $data = $request->validate([
            'site_name' => ['required', 'string', 'max:255'],
            'site_url' => ['required', 'url', 'max:255'],
            'logo_url' => ['required', 'string', 'max:255'],
            'logo_file' => ['nullable', 'image', 'max:4096'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'whatsapp_number' => ['required', 'string', 'max:30'],
            'location' => ['required', 'string', 'max:255'],
            'maps_url' => ['nullable', 'url', 'max:500'],
            'map_embed_url' => ['nullable', 'url', 'max:500'],
            'facebook_url' => ['nullable', 'url', 'max:500'],
            'twitter_url' => ['nullable', 'url', 'max:500'],
            'instagram_url' => ['nullable', 'url', 'max:500'],
            'linkedin_url' => ['nullable', 'url', 'max:500'],
            'footer_text' => ['nullable', 'string', 'max:1000'],
            'default_og_image' => ['required', 'string', 'max:255'],
            'default_og_image_file' => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('default_og_image_file')) {
            $data['default_og_image'] = $this->storeImage($request->file('default_og_image_file'), 'seo', $settings->default_og_image);
        }

        if ($request->hasFile('logo_file')) {
            $data['logo_url'] = $this->storeImage($request->file('logo_file'), 'brand', $settings->logo_url);
        }

        unset($data['default_og_image_file'], $data['logo_file']);

        $settings->update($data);
        AuditLog::record('update', 'Settings', $settings, 'Updated site settings.');

        return back()->with('success', 'Site settings updated.');
    }

    public function updateSeo(Request $request, SeoPage $seoPage): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:300'],
            'image' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'is_indexable' => ['required', 'boolean'],
        ]);

        if ($request->hasFile('image_file')) {
            $data['image'] = $this->storeImage($request->file('image_file'), 'seo', $seoPage->image);
        }

        unset($data['image_file']);

        $seoPage->update($data);
        AuditLog::record('update', 'SEO', $seoPage, "Updated SEO page: {$seoPage->path}");

        return back()->with('success', 'SEO page updated.');
    }

    private function storeImage(UploadedFile $file, string $directory, ?string $oldImage = null): string
    {
        if ($oldImage && str_starts_with($oldImage, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $oldImage));
        }

        return Storage::url($file->store($directory, 'public'));
    }

    private function settingDefaults(): array
    {
        return [
            'site_name' => 'Mwambao Youth Technology',
            'site_url' => 'https://myt.co.tz',
            'logo_url' => '/images/mwambao.png',
            'email' => 'info@myt.co.tz',
            'phone' => '+255 657 963 896',
            'whatsapp_number' => '255657963896',
            'location' => 'Kariakoo, Zanzibar',
            'maps_url' => 'https://www.google.com/maps/search/?api=1&query=Kariakoo%2C%20Zanzibar',
            'map_embed_url' => 'https://www.google.com/maps?q=Kariakoo%2C%20Zanzibar&output=embed',
            'footer_text' => 'Mwambao Youth Technology - transforming businesses with modern websites, systems and creative digital solutions.',
            'default_og_image' => '/images/mwambao.png',
        ];
    }
}
