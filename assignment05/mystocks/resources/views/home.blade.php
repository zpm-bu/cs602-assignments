@extends('_base')
@section('appcontent')
    @auth
        <p>You are logged in.</p>
    @else
        <p>You are not logged in.</p>
    @endauth
@endsection
