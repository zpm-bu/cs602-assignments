@extends('accounts._frame')
@section('content')
    <h1>Sign out</h1>
    <p>Are you sure you want to sign out?
    <p>
    <form method="post" action="{{ route('accounts.logout') }}">
        @csrf
        <button type="submit" class="btn btn-primary">Sign out</button>
    </form>
@endsection
