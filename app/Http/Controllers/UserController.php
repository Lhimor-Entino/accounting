<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function show()
    {
        $users = User::where("archive", 0)->get();

        return Inertia::render('Users', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
  
        // Create a Carbon instance from the string
        $formattedDate = Carbon::parse($request->activation_effectivity_date);

        // Format the date as desired
        $activation_effectivity_date = $formattedDate->format('Y-m-d H:i:s');
        $users = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'privilege' => $request->privilege,
            'password_expiration_date' => $request->password_expiration_date,
            'activation_effectivity_date' => $activation_effectivity_date,
            'activation_expiration_date' => $request->activation_expiration_date
        ]);


        return redirect()->back()->with('users', $users);
    }

    public function deactivateAccount(Request $request) {
         // Get the current date
         $currentDate = Carbon::now()->toDateString();
         $user = User::findOrFail($request->id);
         // Create a Carbon instance from the string
         $formattedDate = Carbon::parse($request->effectivity_date);
         $deactivation_effectivity_date = $formattedDate->format('Y-m-d H:i:s');
         $deactivation_effectivity = $formattedDate->format('Y-m-d');

      
         $user->update([
            'archive' => $currentDate ==   $deactivation_effectivity ? 1 : 0,
            'deactivation_effectivity_date' => $deactivation_effectivity_date,
            'deactivation_reason' => $request->reason
        ]);

        return redirect()->back();
    }
}
