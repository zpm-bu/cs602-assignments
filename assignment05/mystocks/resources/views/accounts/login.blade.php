@extends('accounts._frame')
@section('content')
    <h1>Sign in</h1>
    <p>If you have not created an account yet, please <a href="{{ route('accounts.register_page') }}">sign up</a>.</p>
    <form method="post" action="{{ route('accounts.login') }}">
        @csrf
        <div class="form-floating mb-3">
            <input type="email" id="id_email" name="email" placeholder="name@example.com" class="form-control">
            <label for="id_email">Email</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" id="id_password" name="password" placeholder="*****" class="form-control">
            <label for="id_password" class="form-label">Password</label>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
@endsection
