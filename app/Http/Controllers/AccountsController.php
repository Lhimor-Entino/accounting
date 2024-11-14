<?php

namespace App\Http\Controllers;

use App\Models\AccountAdditionalInfo;
use App\Models\Accounts;
use App\Models\AccountSubTypes;
use App\Models\AccountTypes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AccountsController extends Controller
{
  //
  public function show($account_type = null)
  {
    if ($account_type > 6) {
      abort(404);  // This will return a 404 error page
    }
    $accounts = Accounts::with('accountSubType.accountType')  // Eager load AccountType through AccountSubType
      ->whereHas('accountSubType.accountType', function ($query) use ($account_type) {
        if ($account_type !== null) {
          $query->where('id', $account_type);  // Filter AccountTypes by name "Assets"
        } else {
          $query->where('id', 1);  // Filter AccountTypes by name "Assets"
        }
      })
      ->get();


    return Inertia::render('Accounts', [
      'accounts' => $accounts,
      'account_type' => $account_type ? $account_type : 1,
    ]);
    
  }

  public function store(Request $request)
  {
    $account =[];
    DB::transaction(function () use ($request) {
      $account =  Accounts::create([
        "bank_account_code" => $request->bank_account_code,
        "bank_name" => $request->bank_name,
        "branch" => $request->branch,
        "account_name" => $request->account_name,
        "account_no" => $request->account_no,
        "currency" => $request->currency,
        "name" => $request->name,
        "others_info" => $request->others_info,
        "account_sub_id" => $request->account_sub_id,
        "num_months_depreciation" => $request->num_months_depreciation,
        "account_source_id" => $request->account_source_id
      ]);

      foreach ($request->otherInfo as $ot) {
        AccountAdditionalInfo::create([
          "field" => $ot['field'],
          "value" => $ot['value'],
          "account_id" =>  $account->id,
        ]);
      }
    });

    // // Redirect to the newly created account's WITH THE UPDATED DATA
    // return Inertia::location(route('accounts.show', ['account_type' => $request->account_type]));
    // Flash the updated account data to the session and redirect back

    return redirect()->back()->with([
     
      'accounts' => Accounts::all()
  ]);
  }


  public function cashInBankAccounts(string $filter = "")
  {
    $accounts = Accounts::where("account_sub_id", 1)->get();

    return $accounts;
  }
}
