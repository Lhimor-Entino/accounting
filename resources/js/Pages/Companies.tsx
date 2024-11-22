import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'

type Props = {}

const Companies = (props: Props) => {
  return (
    <div>
    <Authenticated>
        <div className='flex flex-col gap-x-9 w-full' >

            <div className='flex gap-4'>
                <div className='flex-1 flex items-center gap-x-2 '>
                    {/* <NotebookPenIcon className=' text-slate-600 w-5 h-5' /> */}
                    <p className=' text-slate-700 font-bold text-lg'>Companies</p>
                </div>

                
            </div>
          
           

        </div>

    </Authenticated>

</div>
  )
}

export default Companies