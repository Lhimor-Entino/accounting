<?php

namespace App\Http\Controllers;

use App\Models\AccountSubTypes;
use Illuminate\Http\Request;

class AccountSubTypesController extends Controller
{
    //
    public function store(Request $request){
        AccountSubTypes::create([
            "name" => $request->name,
            'account_id' =>$request->account_id
        ]);
    }
}
