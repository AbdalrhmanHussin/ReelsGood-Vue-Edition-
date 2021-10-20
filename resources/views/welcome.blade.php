<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Reelsgood</title>
        <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ secure_asset('css/styles.css') }}" rel="stylesheet">
        <!-- Fonts -->
    </head>
    <body class="antialiased">
    <div id="app">
        <app-component></app-component>
    </div>  
    <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
