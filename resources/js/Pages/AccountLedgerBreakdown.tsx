import Authenticated from '@/Layouts/AuthenticatedLayout'
import { AccountLedgers } from '@/types'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { getFormattedDateString } from '@/utils/dateUtils'
import { CreditCardIcon } from 'lucide-react'

type Props = {
  account_ledgers: AccountLedgers[]
}

const AccountLedgerBreakdown = (props: Props) => {
  const { account_ledgers } = props
  return (
    <Authenticated>
      <div className='flex flex-col gap-x-9 w-full' >

        <div className='flex gap-4'>
          <div className='flex-1 flex items-center gap-x-2 '>
            <CreditCardIcon className=' text-slate-600 w-5 h-5' />
            <p className=' text-slate-700 font-bold text-lg'> {account_ledgers[0].account.account_name} Transaction Breakdown</p>
          </div>
        </div>

        <div className="max-h-[450px] overflow-y-auto mt-5">
          <Table>
            <TableCaption>List of all transaction in this account.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead >Entered By</TableHead>
                <TableHead>Debit Amount</TableHead>
                <TableHead>Credit Amount</TableHead>
                <TableHead>Transaction Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                account_ledgers?.map((tdata: AccountLedgers, index: number) =>
                  <TableRow key={index}>
                    <TableCell className="font-medium w-[250px]">
                      {tdata.entered_by.name}
                    </TableCell>
                    <TableCell> {tdata.debit_amount === 0 ? "" : `$ ${tdata.debit_amount}`}</TableCell>
                    <TableCell>{tdata.credit_amount === 0 ? "" : `$ ${tdata.credit_amount}`}</TableCell>
                    <TableCell>{getFormattedDateString(tdata.transaction_date) }</TableCell>
                  </TableRow>)
              }

            </TableBody>
          </Table>
        </div>
      </div>

    </Authenticated>

  )
}

export default AccountLedgerBreakdown