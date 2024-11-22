<?php

namespace App\Http\Controllers;

use App\Models\Accounts;
use App\Models\Entry;
use App\Models\Ledger;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EntryController extends Controller
{
    //

    public function show()
    {
        return Inertia::render('Entry', [
            'accounts' => Accounts::all(),
            'entries' =>  Entry::all()
        ]);
    }


    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->data;

           

            //SAVE TO ENTRY 
            foreach ($data as $entry) {
                $formattedDate = Carbon::parse($entry['entryDate']);
                $entryDate = $formattedDate->format('Y-m-d H:i:s');
                $referenceId = 'EJ000' . (Entry::max('id') + 1);
                $journalEntry = Entry::create([
                    'description' => $entry['description'],
                    'entry_date' => $entryDate,
                    'debit_account_id' => $entry['debit_account_id'],
                    'debit_amount' => $entry['debit'],
                    'credit_account_id' =>  $entry['credit_account_id'],
                    'credit_amount' => $entry['credit'],
                    'reference_no' => $referenceId,
                    'entered_by' => $request->user()->id
                ]);

                // Insert ledger entries for debit and credit accounts.
                Ledger::create([
                    'entry_id' => $journalEntry->id,
                    'account_id' => $entry['debit_account_id'], 
                    'debit_amount' => $entry['debit'], 
                    'credit_amount' => 0, 
                    'transaction_date' => $entryDate,
                    'entered_by' => $request->user()->id
                ]);

                Ledger::create([
                    'entry_id' => $journalEntry->id, 
                    'account_id' => $entry['credit_account_id'], 
                    'debit_amount' => 0, 
                    'credit_amount' => $entry['credit'], 
                    'transaction_date' => $entryDate,
                    'entered_by' => $request->user()->id
                ]);
            }

        });
         return redirect()->back();
   
    }
}
