<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\HomePage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomePageController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Homepage', [
            'home' => HomePage::firstOrCreate([], $this->defaults()),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $home = HomePage::firstOrCreate([], $this->defaults());
        $data = $request->validate([
            'hero_eyebrow' => ['required', 'string', 'max:120'],
            'hero_title' => ['required', 'string', 'max:500'],
            'hero_subtitle' => ['required', 'string', 'max:1000'],
            'hero_card_title' => ['required', 'string', 'max:255'],
            'hero_card_text' => ['nullable', 'string', 'max:500'],
            'hero_stats_text' => ['nullable', 'string', 'max:1000'],
            'trust_items_text' => ['nullable', 'string', 'max:1500'],
            'hero_image' => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('hero_image')) {
            $data['hero_image_url'] = $this->storeImage($request->file('hero_image'), $home->hero_image_url);
        }

        $data['hero_stats'] = $this->parsePairs($data['hero_stats_text'] ?? '', ['value', 'label']);
        $data['trust_items'] = $this->parsePairs($data['trust_items_text'] ?? '', ['icon_name', 'title']);

        unset($data['hero_stats_text'], $data['trust_items_text'], $data['hero_image']);

        $home->update($data);
        AuditLog::record('update', 'Homepage', $home, 'Updated homepage content.');

        return back()->with('success', 'Homepage updated.');
    }

    private function parsePairs(string $value, array $keys): array
    {
        return collect(preg_split('/\r\n|\r|\n/', $value))
            ->map(fn (string $line) => array_map('trim', explode('|', $line, count($keys))))
            ->filter(fn (array $parts) => count($parts) === count($keys) && collect($parts)->every(fn ($part) => $part !== ''))
            ->map(fn (array $parts) => array_combine($keys, $parts))
            ->values()
            ->all();
    }

    private function storeImage(UploadedFile $file, ?string $oldImage = null): string
    {
        if ($oldImage && str_starts_with($oldImage, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $oldImage));
        }

        return Storage::url($file->store('homepage', 'public'));
    }

    private function defaults(): array
    {
        return [
            'hero_eyebrow' => 'Digital partner for growing businesses',
            'hero_title' => 'Tunatengeneza websites, branding na systems zinazokuletea wateja zaidi',
            'hero_subtitle' => 'Mwambao Youth Technology inasaidia biashara Zanzibar na Tanzania kuonekana professional online, kupata inquiries kupitia WhatsApp, na kusimamia kazi kwa mifumo rahisi kutumia.',
            'hero_card_title' => 'Website inayofanya kazi',
            'hero_card_text' => 'Design nzuri, ujumbe unaouza, SEO basics na WhatsApp flow ya kupata leads.',
            'hero_stats' => [
                ['value' => '50+', 'label' => 'Projects delivered'],
                ['value' => '30+', 'label' => 'Businesses supported'],
                ['value' => '5★', 'label' => 'Client rating'],
            ],
            'trust_items' => [
                ['icon_name' => 'MapPin', 'title' => 'Tupo Zanzibar'],
                ['icon_name' => 'Clock3', 'title' => 'Fast response'],
                ['icon_name' => 'ShieldCheck', 'title' => 'Clear process'],
                ['icon_name' => 'Target', 'title' => 'Built to convert'],
            ],
        ];
    }
}
