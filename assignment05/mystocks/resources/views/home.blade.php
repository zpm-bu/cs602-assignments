<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Stocks</title>
</head>

<body>
    @auth
        <p>You are logged in.</p>
        <div>
            <form action="/logout" method="post">
                @csrf
                <button type="submit">Log out</button>
            </form>
        </div>
    @else
        <div>
            <h1>Stocks app</h1>
            <h2>Register</h2>
            <form action="/register" method="post">
                @csrf
                <input type="text" name="name" required>
                <input type="email" name="email" required>
                <input type="password" name="password" required>
                <button type="submit">Register</button>
            </form>
            <h2>Login</h2>
            <form action="/login" method="post">
                @csrf
                <input type="email" name="email" required>
                <input type="password" name="password" required>
                <button type="submit">Login</button>
            </form>
        </div>
    @endauth
</body>

</html>
