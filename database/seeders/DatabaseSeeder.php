<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\AboutPage;
use App\Models\MarketingService;
use App\Models\PortfolioProject;
use App\Models\SeoPage;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => env('ADMIN_EMAIL', 'admin@myt.co.tz'),
        ], [
            'name' => env('ADMIN_NAME', 'Mwambao Admin'),
            'is_active' => true,
            'can_access_client_dashboard' => true,
            'permissions' => array_keys(User::availablePermissions()),
            'password' => env('ADMIN_PASSWORD', 'Admin2026@'),
        ]);

        SiteSetting::firstOrCreate([], [
            'site_name' => 'Mwambao Youth Technology',
            'site_url' => 'https://myt.co.tz',
            'email' => 'info@myt.co.tz',
            'phone' => '+255 657 963 896',
            'whatsapp_number' => '255657963896',
            'location' => 'Kariakoo, Zanzibar',
            'maps_url' => 'https://www.google.com/maps/search/?api=1&query=Kariakoo%2C%20Zanzibar',
            'map_embed_url' => 'https://www.google.com/maps?q=Kariakoo%2C%20Zanzibar&output=embed',
            'footer_text' => 'Mwambao Youth Technology helps businesses in Zanzibar and Tanzania grow with professional websites, custom systems, branding, hosting and digital marketing support.',
            'default_og_image' => '/images/mwambao.png',
        ]);

        collect([
            ['/', 'Website Design Zanzibar, Systems & Branding Tanzania', 'Mwambao Youth Technology builds websites, custom systems, branding, hosting, and digital marketing solutions that help businesses in Zanzibar and Tanzania attract more customers.'],
            ['/about', 'About Mwambao Youth Technology Zanzibar', 'Learn about Mwambao Youth Technology, a Zanzibar digital studio helping businesses grow through website design, custom systems, branding, hosting, and digital marketing.'],
            ['/services', 'Website, Branding & System Packages in Zanzibar', 'Compare website design, e-commerce, custom system development, branding, social media, hosting, and domain packages for businesses in Zanzibar and Tanzania.'],
            ['/portfolio', 'Portfolio & Case Studies for Zanzibar Businesses', 'View website design, system development, branding, and social media case studies by Mwambao Youth Technology for businesses in Zanzibar and Tanzania.'],
            ['/contact', 'Contact Mwambao Youth Technology Zanzibar', 'Contact Mwambao Youth Technology in Kariakoo, Zanzibar for website design, custom system development, branding, hosting, social media, and digital support.'],
        ])->each(function (array $item): void {
            SeoPage::updateOrCreate([
                'path' => $item[0],
            ], [
                'title' => $item[1],
                'description' => $item[2],
                'image' => '/images/mwambao.png',
                'is_indexable' => true,
            ]);
        });

        collect([
            [
                'title' => 'Website Design & Development',
                'description' => 'Websites za kisasa, fast na mobile-first zinazojenga trust na kuongeza inquiries.',
                'icon_name' => 'Globe',
                'portfolio_category' => 'Websites',
                'features' => ['Responsive design', 'SEO basics', 'Fast loading', 'CMS ready'],
                'packages' => [
                    ['Starter Website', 'Kwa biashara mpya', false, 'Website safi na mobile-friendly ya kuitambulisha biashara yako online.', 'Kuanzia TZS 350,000', ['1-5 responsive pages', 'Contact form', 'WhatsApp button', 'Basic SEO setup']],
                    ['Business Website', 'Most popular', true, 'Company website yenye nguvu zaidi kwa trust, portfolio na customer inquiries.', 'Kuanzia TZS 750,000', ['Up to 10 pages', 'Portfolio showcase', 'Testimonials section', 'Lead capture form']],
                    ['E-commerce Website', 'Kwa kuuza online', false, 'Online store kwa products, orders na customer conversion.', 'Kuanzia TZS 1,500,000', ['Product catalog', 'Cart and checkout flow', 'Order notifications', 'Admin-ready setup']],
                ],
            ],
            [
                'title' => 'System Development',
                'description' => 'Custom systems na dashboards za kurahisisha records, clients, orders na reports.',
                'icon_name' => 'Code2',
                'portfolio_category' => 'Systems',
                'features' => ['Custom dashboards', 'Secure auth', 'Scalable APIs', 'Reliable hosting'],
                'packages' => [
                    ['Admin Dashboard', 'Kwa internal teams', false, 'Dashboard salama ya kusimamia records, clients, orders au operations.', 'Kuanzia TZS 1,200,000', ['Secure login', 'Database management', 'Reports overview', 'Role-ready structure']],
                    ['Business Management System', 'Most popular', true, 'System ya kusimamia customers, sales, stock, bookings, staff au daily operations.', 'Kuanzia TZS 2,500,000', ['Custom workflow setup', 'User roles', 'Reports and exports', 'Training session']],
                    ['Custom Enterprise System', 'Advanced solution', false, 'Platform kubwa kwa automation, integrations na scalable features.', 'Kuanzia TZS 5,000,000', ['Advanced database design', 'Multiple user levels', 'API integrations', 'Priority support']],
                ],
            ],
            [
                'title' => 'Graphic Design & Branding',
                'description' => 'Logo, brand identity na marketing visuals zinazofanya biashara ionekane professional.',
                'icon_name' => 'Palette',
                'portfolio_category' => 'Branding',
                'features' => ['Logo design', 'Brand guidelines', 'Print materials', 'Social graphics'],
                'packages' => [
                    ['Logo Package', 'Brand starter', false, 'Logo direction safi pamoja na files muhimu kwa digital na print.', 'Kuanzia TZS 150,000', ['Logo concepts', 'Color palette', 'Export files', 'Basic usage guide']],
                    ['Brand Starter Kit', 'Most popular', true, 'Identity ya kuanzia kwa biashara inayohitaji logo, colors na marketing materials.', 'Kuanzia TZS 350,000', ['Logo refinement', 'Color palette', 'Business card design', 'Social media profile kit']],
                    ['Full Brand Identity', 'Complete branding', false, 'Visual identity kamili kwa biashara inayotaka consistency kwenye market.', 'Kuanzia TZS 650,000', ['Logo system', 'Brand guidelines', 'Business stationery', 'Social media templates']],
                ],
            ],
            [
                'title' => 'Photography & Videography',
                'description' => 'Photo na video production kwa products, events, brands na digital campaigns.',
                'icon_name' => 'Camera',
                'portfolio_category' => 'Social Media',
                'features' => ['Product shoots', 'Brand videos', 'Event coverage', 'Editing & post'],
                'packages' => [
                    ['Product Shoot', 'Kwa products', false, 'Product photos au short clips kwa website na social media.', 'Kuanzia TZS 250,000', ['Product photos', 'Short edits', 'Color correction', 'Ready-to-post files']],
                    ['Event Coverage', 'Most popular', true, 'Photo na video coverage kwa launches, company events na campaigns.', 'Kuanzia TZS 600,000', ['Event highlights', 'Edited gallery', 'Short recap video', 'Digital delivery']],
                    ['Brand Video Package', 'Premium content', false, 'Brand video package kwa promotions, campaigns na storytelling yenye nguvu.', 'Kuanzia TZS 1,200,000', ['Creative direction', 'Filming session', 'Edited brand video', 'Short social media cuts']],
                ],
            ],
            [
                'title' => 'Social Media Management',
                'description' => 'Content planning, post designs, scheduling na growth support kwa social media.',
                'icon_name' => 'Share2',
                'portfolio_category' => 'Social Media',
                'features' => ['Content strategy', 'Daily posting', 'Audience growth', 'Analytics'],
                'packages' => [
                    ['Content Kit', 'Quick campaign', false, 'Set ya social media graphics na captions kwa campaign au launch.', 'Kuanzia TZS 250,000', ['Post designs', 'Caption ideas', 'Story formats', 'Content calendar']],
                    ['Monthly Management', 'Ongoing growth', true, 'Monthly planning, posting na reporting ili brand yako ibaki active.', 'Kuanzia TZS 450,000 / mwezi', ['Content strategy', 'Scheduled posts', 'Audience engagement', 'Monthly report']],
                    ['Growth Management', 'Premium monthly', false, 'Package kubwa kwa consistent content, campaign support na growth tracking.', 'Kuanzia TZS 850,000 / mwezi', ['Advanced content plan', 'Campaign creatives', 'Performance reporting', 'Growth recommendations']],
                ],
            ],
            [
                'title' => 'Hosting & Domain Support',
                'description' => 'Hosting salama, domain setup, SSL, backups na ongoing technical support.',
                'icon_name' => 'Server',
                'portfolio_category' => 'Websites',
                'features' => ['99.9% uptime', 'SSL included', 'Daily backups', '24/7 support'],
                'packages' => [
                    ['Domain & Hosting Setup', 'Go live', false, 'Domain registration, hosting setup, SSL na launch support kwa website yako.', 'Kuanzia TZS 180,000 / mwaka', ['Domain setup', 'Hosting setup', 'SSL certificate', 'Email guidance']],
                    ['Care & Maintenance', 'Most popular', true, 'Ongoing support kwa updates, backups, security checks na small changes.', 'Kuanzia TZS 150,000 / mwezi', ['Website updates', 'Backups', 'Security checks', 'Technical support']],
                    ['Business Hosting & Email', 'Kwa teams', false, 'Hosting na business email support kwa kampuni inayohitaji online operations za kuaminika.', 'Kuanzia TZS 350,000 / mwaka', ['Business email guidance', 'Hosting monitoring', 'SSL and backups', 'Priority technical support']],
                ],
            ],
        ])->each(function (array $item, int $index): void {
            $service = MarketingService::updateOrCreate([
                'title' => $item['title'],
            ], [
                'description' => $item['description'],
                'icon_name' => $item['icon_name'],
                'portfolio_category' => $item['portfolio_category'],
                'features' => $item['features'],
                'is_featured' => in_array($item['title'], ['Website Design & Development', 'System Development', 'Graphic Design & Branding'], true),
                'is_active' => true,
                'sort_order' => $index + 1,
            ]);

            collect($item['packages'])->each(function (array $package, int $packageIndex) use ($service): void {
                $service->packages()->updateOrCreate([
                    'name' => $package[0],
                ], [
                    'tag' => $package[1],
                    'is_featured' => $package[2],
                    'description' => $package[3],
                    'price_label' => $package[4],
                    'features' => $package[5],
                    'is_active' => true,
                    'sort_order' => $packageIndex + 1,
                ]);
            });
        });

        collect([
            [
                'title' => 'Coastal Tours Booking',
                'category' => 'Websites',
                'client_name' => 'Zanzibar Coastal Tours',
                'gradient' => 'linear-gradient(135deg,#0891b2,#06b6d4)',
                'description' => 'A mobile-first tour website built to present packages clearly and turn visitors into WhatsApp inquiries.',
                'challenge' => 'The business relied on social media messages only, making it hard for tourists to compare packages and trust the brand.',
                'solution' => 'We structured tour pages, added trust content, built clear inquiry CTAs, and made the experience fast on mobile.',
                'result' => 'Visitors can now understand the offer quickly and contact the team with better package-specific inquiries.',
            ],
            [
                'title' => 'School ERP System',
                'category' => 'Systems',
                'client_name' => 'Kijani Academy',
                'gradient' => 'linear-gradient(135deg,#0c4a6e,#0e7490)',
                'description' => 'A school management system concept for student records, payments, reports, and admin workflows.',
                'challenge' => 'Daily records were scattered across books and spreadsheets, slowing down reporting and follow-up.',
                'solution' => 'We designed a secure dashboard flow with student records, role-ready access, and reporting sections.',
                'result' => 'The team gets one central place to manage records and understand operations faster.',
            ],
            [
                'title' => 'Savora Restaurant Brand',
                'category' => 'Branding',
                'client_name' => 'Savora Restaurant',
                'gradient' => 'linear-gradient(135deg,#155e75,#22d3ee)',
                'description' => 'A restaurant identity direction with logo styling, colors, menu visuals, and social media consistency.',
                'challenge' => 'The brand looked different across platforms and did not communicate a clear premium dining feel.',
                'solution' => 'We created a cohesive identity system with visual direction, color palette, and reusable design templates.',
                'result' => 'The restaurant can now promote offers and menus with a consistent, professional look.',
            ],
            [
                'title' => 'Lifestyle Campaign',
                'category' => 'Social Media',
                'client_name' => 'Island Events',
                'gradient' => 'linear-gradient(135deg,#0e7490,#67e8f9)',
                'description' => 'A social campaign concept for event promotion, audience engagement, and launch awareness.',
                'challenge' => 'The event needed a stronger visual presence and a clear content rhythm before launch day.',
                'solution' => 'We planned campaign posts, story formats, captions, and visual templates for consistent rollout.',
                'result' => 'The campaign became easier to schedule, publish, and keep visually consistent across channels.',
            ],
            [
                'title' => 'FinTrack Dashboard',
                'category' => 'Systems',
                'client_name' => 'FinTrack Services',
                'gradient' => 'linear-gradient(135deg,#1e293b,#0891b2)',
                'description' => 'A dashboard concept for tracking business records, summaries, and operational reports.',
                'challenge' => 'The team needed a cleaner way to review figures and reduce manual checking across different files.',
                'solution' => 'We designed a dashboard structure with overview cards, record tables, and export-ready reporting.',
                'result' => 'Management can review key information faster and make decisions with less manual work.',
            ],
            [
                'title' => 'Ocean Apparel Store',
                'category' => 'Websites',
                'client_name' => 'Ocean Apparel',
                'gradient' => 'linear-gradient(135deg,#0369a1,#22d3ee)',
                'description' => 'An e-commerce storefront concept for product browsing, customer questions, and order flow.',
                'challenge' => 'Products were promoted manually, making it difficult for customers to browse options before ordering.',
                'solution' => 'We created a product-focused storefront structure with categories, product details, and inquiry-ready CTAs.',
                'result' => 'Customers can explore products more easily and ask clearer questions before buying.',
            ],
            [
                'title' => 'Elev8 Logo & Identity',
                'category' => 'Branding',
                'client_name' => 'Elev8 Studio',
                'gradient' => 'linear-gradient(135deg,#0891b2,#a5f3fc)',
                'description' => 'A clean identity system for a modern service brand that needed a sharper market presence.',
                'challenge' => 'The brand needed a memorable logo direction and consistent visuals for digital and print use.',
                'solution' => 'We developed logo styling, colors, type direction, and brand-ready export assets.',
                'result' => 'The business gained a clearer identity that can scale across social media, stationery, and promotions.',
            ],
            [
                'title' => 'Growth Reels Series',
                'category' => 'Social Media',
                'client_name' => 'Blue Wave Services',
                'gradient' => 'linear-gradient(135deg,#164e63,#06b6d4)',
                'description' => 'A short-form content series concept for service education, trust building, and audience growth.',
                'challenge' => 'The brand had inconsistent posting and needed repeatable content ideas for growth.',
                'solution' => 'We planned reel topics, captions, visual hooks, and a posting rhythm around customer pain points.',
                'result' => 'The team received a repeatable content framework for staying active and professional online.',
            ],
        ])->each(function (array $item, int $index): void {
            $service = MarketingService::where('portfolio_category', $item['category'])->orderBy('sort_order')->first() ?? MarketingService::orderBy('sort_order')->first();

            PortfolioProject::updateOrCreate([
                'title' => $item['title'],
            ], [
                'marketing_service_id' => $service?->id,
                'client_name' => $item['client_name'],
                'category' => $item['category'],
                'gradient' => $item['gradient'],
                'description' => $item['description'],
                'challenge' => $item['challenge'],
                'solution' => $item['solution'],
                'result' => $item['result'],
                'is_featured' => $index < 3,
                'is_active' => true,
                'sort_order' => $index + 1,
            ]);
        });

        AboutPage::firstOrCreate([], [
            'hero_title' => 'Kuhusu MYT',
            'hero_subtitle' => 'Sisi ni digital studio ya vijana wenye ubunifu, tukijenga websites, systems na branding kwa biashara zinazotaka kukua.',
            'story_eyebrow' => 'Story Yetu',
            'story_title' => 'Kutoka wazo dogo hadi digital partner wa biashara',
            'story_body' => 'Mwambao Youth Technology ilianzishwa na vijana wabunifu na developers wenye imani moja: technology ya kisasa inapaswa kufikiwa na kila biashara. Leo MYT inasaidia kampuni za ukubwa tofauti kujenga digital presence kupitia web, systems, branding na content.',
            'story_body_extra' => 'Tunaunganisha technical excellence na creative thinking ili kazi ionekane vizuri na ilete matokeo ya biashara.',
            'mission_title' => 'Mission Yetu',
            'mission_text' => 'Kuwezesha biashara kwa affordable digital solutions zinazosaidia growth na kufungua opportunities mpya.',
            'vision_title' => 'Vision Yetu',
            'vision_text' => 'Kuwa technology na creative partner anayeaminika zaidi kwa brands zinazotaka kukua ndani na nje ya Tanzania.',
            'values' => [
                ['icon_name' => 'Award', 'title' => 'Excellence', 'text' => 'Tunaweka ubora kwenye kila design, kila page na kila line ya code.'],
                ['icon_name' => 'Heart', 'title' => 'Integrity', 'text' => 'Mawasiliano ya ukweli, pricing iliyo wazi na delivery inayotegemewa.'],
                ['icon_name' => 'Lightbulb', 'title' => 'Innovation', 'text' => 'Tunatumia tools na ideas mpya ili clients wetu waendelee kuwa mbele.'],
                ['icon_name' => 'Users', 'title' => 'Collaboration', 'text' => 'Tunawachukulia clients kama partners wa muda mrefu, si transactions tu.'],
            ],
        ]);

        collect([
            ['Asha Suleiman', 'Zanzibar Coastal Tours', 'Business Website', 'Mwambao walitusaidia kuonyesha tours zetu kwa professional online. Website ni fast, clean, na customers wanatufikia kwa urahisi zaidi.'],
            ['Hassan Ali', 'Kariakoo Traders', 'Custom System', 'Dashboard imerahisisha records zetu za kila siku. Sasa tunafuatilia inquiries na customer information bila kutegemea madaftari.'],
            ['Neema Juma', 'Savora Restaurant', 'Brand Identity', 'Walielewa feel tuliyotaka kwenye brand yetu na wakaleta visuals za kisasa zinazoendana kila platform.'],
            ['Yusuf Abdalla', 'Ocean Apparel', 'E-commerce Website', 'Products zetu sasa ni rahisi kuonekana, na customers wanauliza maswali bora kwa sababu website inaeleza vizuri.'],
            ['Mariam Said', 'Island Events', 'Photography & Videography', 'Event coverage ilikuwa sharp na ilikamilika kwa wakati. Tulitumia photos na short videos haraka kwenye promotion.'],
            ['Khalid Omar', 'Blue Wave Services', 'Social Media Management', 'Content planning yao imefanya pages zetu zionekane professional na kutusaidia kuwa consistent kwenye posting.'],
        ])->each(function (array $item, int $index): void {
            Testimonial::updateOrCreate([
                'name' => $item[0],
                'company' => $item[1],
            ], [
                'service' => $item[2],
                'rating' => 5,
                'comment' => $item[3],
                'is_featured' => $index < 3,
                'is_active' => true,
                'sort_order' => $index + 1,
            ]);
        });

        collect([
            ['Website design Zanzibar inachukua muda gani?', 'Website ndogo ya biashara inaweza kuchukua siku 5-10 za kazi kama content iko tayari. Business website, e-commerce website, au custom web system inaweza kuchukua wiki 2-6 kutegemea ukubwa wa scope, pages, features na approvals.'],
            ['Je, mnatoa domain na hosting Tanzania?', 'Ndiyo. Tunasaidia domain registration, hosting setup, SSL certificate, business email guidance, backups, na launch support ili website yako iwe online vizuri kwa wateja wa Zanzibar, Tanzania na nje ya nchi.'],
            ['Bei ya website au branding inaanzia wapi?', 'Tunatumia packages za kuanzia ili uwe na picha ya bajeti mapema. Starter website inaanzia TZS 350,000, branding inaanzia TZS 150,000, na final quote hutegemea scope, content, timeline na features unazohitaji.'],
            ['Malipo yanafanyikaje kwa project?', 'Kwa kawaida tunafanya deposit kabla ya kuanza kazi, kisha balance baada ya preview/approval kabla ya launch. Kwa website kubwa, e-commerce, au system development tunaweza kugawanya payment kwa milestones.'],
            ['Je, mnafanya maintenance baada ya website kuisha?', 'Ndiyo. Tuna maintenance packages kwa website updates, security checks, backups, content changes, technical support, na monitoring ili website iendelee kuwa stable na professional.'],
            ['Naweza kupata website kwa bajeti ndogo?', 'Ndiyo. Tuna Starter Website package kwa biashara mpya au mtu anayehitaji online presence ya haraka. Tutashauri scope inayofaa bajeti yako bila kupoteza professionalism, mobile design na basic SEO.'],
            ['Custom system development hufanyika kwa process gani?', 'Tunaanza na consultation, tunaandika requirements, tunapanga database/workflow, tunatengeneza prototype, kisha development, testing, training, na support baada ya delivery. Hii inafaa kwa dashboards, booking systems, records na business management systems.'],
            ['Je, mnafanya kazi na clients nje ya Zanzibar?', 'Ndiyo. Tunafanya kazi na clients Zanzibar, Tanzania nzima, na nje ya nchi kupitia online meetings, WhatsApp, email, na project updates za mara kwa mara.'],
            ['Je, mnasaidia biashara kupata wateja kupitia website?', 'Ndiyo. Tunapanga website kwa conversion: clear copy, WhatsApp CTA, contact forms, testimonials, portfolio, SEO basics, na structure inayomsaidia visitor kuelewa huduma zako na kuwasiliana nawe.'],
        ])->each(function (array $item, int $index): void {
            Faq::updateOrCreate([
                'question' => $item[0],
            ], [
                'answer' => $item[1],
                'is_active' => true,
                'sort_order' => $index + 1,
            ]);
        });
    }
}
