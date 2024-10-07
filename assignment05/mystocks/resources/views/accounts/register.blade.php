@extends('accounts._frame')
@section('content')
    <h1>Sign up</h1>
    <p>Already have an account? Then <a href="{{ route('accounts.login_page') }}">sign in</a>.</p>
    <form method="post" action="{{ route('accounts.login') }}">
        @csrf
        <div class="form-floating mb-3">
            <input type="text" id="id_name" name="name" placeholder="name" class="form-control">
            <label for="id_name">Username</label>
        </div>
        <div class="form-floating mb-3">
            <input type="email" id="id_email" name="email" placeholder="example@example.com" class="form-control">
            <label for="id_email">Email</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" id="id_password" name="password" placeholder="*****" class="form-control">
            <label for="id_password">Password</label>
        </div>
        <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
@endsection
