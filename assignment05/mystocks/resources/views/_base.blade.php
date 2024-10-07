<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Stocks</title>
    {{-- Add bootstrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    {{-- Add alpine --}}
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>
</head>

<body>
    <header class="p-3 mb-3 border-bottom d-flex justify-content-between align-items-center">
        <a href="{{ route('home') }}"
            class="link-body-emphasis link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
            <span><b>Tickers</b></span>
        </a>
        <div>
            @auth
                <a href="{{ route('accounts.logout_page') }}" class="btn btn-link">Sign out</a>
            @else
                <a href="{{ route('accounts.login_page') }}" class="btn btn-link">Sign in</a>
                <a href="{{ route('accounts.register_page') }}" class="btn btn-link">Sign up</a>
            @endauth
        </div>
    </header>
    <main class="container">
        @yield('appcontent')
    </main>
</body>

</html>
