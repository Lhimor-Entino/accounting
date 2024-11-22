<?php

use App\Http\Controllers\AccessLevelController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\AccountSubTypesController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\LedgerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\AccessLevel;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
 
    return redirect()->route('welcome');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function (): void {
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
        Route::post('/deactivateAccount', [UserController::class, 'deactivateAccount'])->name("deactivateAccount");
        
    });
    Route::prefix('entry')->name('entry.')->group(function () {
        Route::get('/show', [EntryController::class, 'show'])->name("show");
        Route::post('/store', [EntryController::class, 'store'])->name("store");
        // Route::post('/deactivateAccount', [UserController::class, 'deactivateAccount'])->name("deactivateAccount");
        
    });
    Route::prefix('ledger')->name('ledger.')->group(function () {
        Route::get('/show', [LedgerController::class, 'show'])->name("show");
    });

    Route::prefix('sub_types')->name('sub_types.')->group(function () {
        Route::post('/store', [AccountSubTypesController::class, 'store'])->name("store");
    });
    Route::prefix('access_levels')->name('access_levels.')->group(function () {
        Route::get('/show', [AccessLevelController::class, 'show'])->name("show");
    });
  
});

require __DIR__ . '/auth.php';
