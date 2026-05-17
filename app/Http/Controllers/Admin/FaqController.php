<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Faqs', [
            'faqs' => Faq::orderBy('sort_order')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $faq = Faq::create($this->validated($request));
        AuditLog::record('create', 'FAQ', $faq, "Created FAQ: {$faq->question}");

        return back()->with('success', 'FAQ created.');
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $faq->update($this->validated($request));
        AuditLog::record('update', 'FAQ', $faq, "Updated FAQ: {$faq->question}");

        return back()->with('success', 'FAQ updated.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        AuditLog::record('delete', 'FAQ', $faq, "Deleted FAQ: {$faq->question}");
        $faq->delete();

        return back()->with('success', 'FAQ deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string', 'max:3000'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);
    }
}
