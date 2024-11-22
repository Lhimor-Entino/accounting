<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Termwind\render;

class LedgerController extends Controller
{
    //
    public function show()
    {

        $ledgerEntries = Ledger::with('account', 'enteredBy')
            // ->where('transaction_date', '>=', $startDate)
            // ->where('transaction_date', '<=', $endDate)
            ->get()
            ->groupBy('account_id');

        $accountBalances = [];

        foreach ($ledgerEntries as $accountId => $entries) {

            $totalDebit = 0;
            $totalCredit = 0;

            // Calculate total debit and credit for each account
            foreach ($entries as $entry) {
                $totalDebit += $entry->debit_amount;
                $totalCredit += $entry->credit_amount;
            }

            // Calculate the account balance (Debit - Credit)
            $balance = $totalDebit - $totalCredit;

            $accountBalances[] = [

                'account_id' => $accountId,
                'account_name' => $entries->first()->account->account_name,
                'total_debit' => number_format($totalDebit, 2),
                'total_credit' => number_format($totalCredit, 2),
                'balance' => $balance,
            ];
        }

        return Inertia::render("Ledger", [
            "ledgers" => $accountBalances
        ]);
    }

    public function accountBreakdown($account_id)
    {

        $account_ledgers = Ledger::where("account_id", $account_id)->get();
        

        return Inertia::render("AccountLedgerBreakdown", [
            "account_ledgers" => $account_ledgers
        ]);
    }
}
