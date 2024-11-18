<?php

namespace App\Http\Controllers;

use App\Models\AccessLevel;
use Illuminate\Http\Request;

class AccessLevelController extends Controller
{
    //

    public function show () {
        $levels = AccessLevel::where("archive", 0)->get();

        return $levels;
    }
}
