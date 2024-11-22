import { Ledgers } from '@/types'
import { BriefcaseBusinessIcon} from "lucide-react"
import Authenticated from '@/Layouts/AuthenticatedLayout'
import LedgerTbl from '@/CustomComponents/Tables&List/ledger/LedgerTbl'

type Props = {
    ledgers: Ledgers[]
}

const Ledger = (props: Props) => {
    const { ledgers } = props

    return (
        <div className="w-full">

            <Authenticated>
                <div className='flex flex-col gap-x-9 w-full' >

                    <div className='flex gap-4'>
                        <div className='flex-1 flex items-center gap-x-2 '>
                            <BriefcaseBusinessIcon className=' text-slate-600 w-5 h-5' />
                            <p className=' text-slate-700 font-bold text-lg'>General Ledger</p>
                        </div>
                    </div>              
                    <LedgerTbl ledgers={ledgers}/>
                </div>

            </Authenticated>

        </div>
    )
}

export default Ledger