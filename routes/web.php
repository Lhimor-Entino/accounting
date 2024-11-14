<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\AccountSubTypesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
 
    return redirect()->route('welcome');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/welcome', function () {
        return Inertia::render('Welcome');
    })->name("welcome");

    Route::prefix('accounts')->name('accounts.')->group(function () {
        Route::get('/show/{account_type?}', [AccountsController::class, 'show'])->name("show");
        Route::post('/store', [AccountsController::class, 'store'])->name("store");
        Route::get('/accounts/{filter?}', [AccountsController::class, 'cashInBankAccounts'])->name("cashInBankAccounts");
    });

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/show', [UserController::class, 'show'])->name("show");
        Route::post('/store', [UserController::class, 'store'])->name("store");
    });

    Route::prefix('sub_types')->name('sub_types.')->group(function () {
       
        Route::post('/store', [AccountSubTypesController::class, 'store'])->name("store");
    });
  
});

require __DIR__ . '/auth.php';
