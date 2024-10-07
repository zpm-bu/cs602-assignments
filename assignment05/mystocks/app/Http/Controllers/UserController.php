<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register_page(Request $request): View
    {
        return view('accounts.register');
    }

    public function register(Request $request): RedirectResponse
    {
        $incomingFields = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|max:255',
        ]);

        $incomingFields['password'] = bcrypt($incomingFields['password']);
        $user = User::create($incomingFields);
        auth()->login($user);

        return redirect('/');
    }

    public function login_page(Request $request): View
    {
        return view('accounts.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $incomingFields = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (auth()->attempt(['email' => $incomingFields['email'], 'password' => $incomingFields['password']])) {
            $request->session()->regenerate();
        }

        return redirect('/');
    }

    public function logout_page(Request $request): View
    {
        return view('accounts.logout');
    }

    public function logout(Request $request): RedirectResponse
    {
        auth()->logout();

        return redirect('/');
    }
}
