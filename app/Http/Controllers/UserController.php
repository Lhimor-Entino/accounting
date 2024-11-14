<?php

namespace App\Http\Controllers;

use App\Models\User;
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


        $users = User::create([
            'name' =>$request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role
        ]);
        
     
      return redirect()->back()->with(  'users' , $users);
    }
}
