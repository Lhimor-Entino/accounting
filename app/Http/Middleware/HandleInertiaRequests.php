<?php

namespace App\Http\Middleware;

use App\Models\Accounts;
use App\Models\AccountSubTypes;
use App\Models\AccountTypes;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'accountTypes' => $request->user() ? AccountTypes::all() : [],
            'accountSubTypes' => $request->user() ? AccountSubTypes::all() : [],
         
        ];
    }
}