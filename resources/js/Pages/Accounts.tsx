import AdministrativeExpenses from '@/CustomComponents/AccountTypes/AdministrativeExpenses'
import Assets from '@/CustomComponents/AccountTypes/Assets'
import DirectExpenses from '@/CustomComponents/AccountTypes/DirectExpenses'
import Equity from '@/CustomComponents/AccountTypes/Equity'
import Liabilities from '@/CustomComponents/AccountTypes/Liabilities'
import Revenue from '@/CustomComponents/AccountTypes/Revenue'
import FinancialStatements from '@/CustomComponents/FinancialStatements'
import EquityForms from '@/CustomComponents/Form/Equity/EquityForms'
import AddAccountModal from '@/CustomComponents/Modals/AddAccountModal'
// import AdministrativeExpenses from '@/CustomComponents/Tables&List/AdministrativeExpenses'
// import DirectExpenses from '@/CustomComponents/Tables&List/DirectExpenses'


import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Account, PageProps } from '@/types'

import { Head, usePage } from '@inertiajs/react'
import { OctagonXIcon } from 'lucide-react'



interface Props {
  accounts: Account[]
  account_type: number
}
const Accounts = (props:Props) => {
  const { accounts, account_type } = props
  return (
    <>
      <Head title="Create Account" />
      <Authenticated>
        <div className='flex flex-col gap-x-9 w-full' >

          <div className='flex gap-4'>
            <div className='flex-1'>

              <FinancialStatements account_type={account_type} />
            </div>

            <div className="flex justify-end">
              <AddAccountModal account_type={account_type} />
            </div>
          </div>
          <div className='flex-1 relative' >
            {
              account_type == 1 || !account_type ? <Assets accounts={accounts} account_type={!account_type ? 1 : account_type} /> :
                account_type == 2 ? <Liabilities accounts={accounts} account_type={account_type} /> :
                  account_type == 3 ? <Equity accounts={accounts} account_type={account_type} /> :
                    account_type == 4 ? <Revenue accounts={accounts} account_type={account_type} /> :
                      account_type == 5 ? <DirectExpenses accounts={accounts} account_type={account_type} /> :
                        account_type == 6 ? <AdministrativeExpenses accounts={accounts} account_type={account_type} />
                          : <div className='absolute top-60 flex gap-x-2 w-full justify-center' >
                            <OctagonXIcon />
                            <p >Opps Theres Nothing Here</p>
                          </div>
            }

          </div>

        </div>

      </Authenticated>
    </>

  )
}

export default Accounts