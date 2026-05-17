<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Testimonials', [
            'testimonials' => Testimonial::orderByDesc('is_featured')->orderBy('sort_order')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $testimonial = Testimonial::create($this->validated($request));
        AuditLog::record('create', 'Testimonials', $testimonial, "Created testimonial: {$testimonial->name}");

        return back()->with('success', 'Testimonial created.');
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update($this->validated($request));
        AuditLog::record('update', 'Testimonials', $testimonial, "Updated testimonial: {$testimonial->name}");

        return back()->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        AuditLog::record('delete', 'Testimonials', $testimonial, "Deleted testimonial: {$testimonial->name}");
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'service' => ['required', 'string', 'max:255'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:2000'],
            'is_featured' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);
    }
}
