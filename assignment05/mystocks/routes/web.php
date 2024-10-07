<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::controller(UserController::class)->name('accounts.')->group(function () {
    Route::get('/register', 'register_page')->name('register_page');
    Route::post('/register', 'register')->name('register');
    Route::get('/login', 'login_page')->name('login_page');
    Route::post('/login', 'login')->name('login');
    Route::get('/logout', 'logout_page')->name('logout_page');
    Route::post('/logout', 'logout')->name('logout');
});
