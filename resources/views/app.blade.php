<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#5ec8c8">
        <meta name="robots" content="index, follow">

        <title inertia>{{ config('app.name', 'MYT Website') }}</title>
        <link rel="icon" type="image/jpeg" href="/images/falco.jpeg">
        <link rel="apple-touch-icon" href="/images/falco.jpeg">

        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
