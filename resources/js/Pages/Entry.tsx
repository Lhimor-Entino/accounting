import AddJournalEntryModal from '@/CustomComponents/Modals/AddJournalEntryModal'
import AddUserModal from '@/CustomComponents/Modals/AddUserModal'
import EntryTbl from '@/CustomComponents/Tables&List/entry/EntryTbl'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Account, Entries } from '@/types'
import { NotebookPenIcon } from 'lucide-react'
import React from 'react'

type Props = {
    accounts: Account[],
    entries: Entries[]
}

const Entry = (props: Props) => {
    const { accounts,entries } = props
    return (
        <div>
            <Authenticated>
                <div className='flex flex-col gap-x-9 w-full' >

                    <div className='flex gap-4'>
                        <div className='flex-1 flex items-center gap-x-2 '>
                            <NotebookPenIcon className=' text-slate-600 w-5 h-5' />
                            <p className=' text-slate-700 font-bold text-lg'> Journal Entry</p>
                        </div>
    
                        <div className="flex justify-end">

                            <AddJournalEntryModal accounts={accounts} />
                        </div>
                    </div>
                    <EntryTbl entries={entries} />
                   

                </div>

            </Authenticated>

        </div>
    )
}

export default Entry