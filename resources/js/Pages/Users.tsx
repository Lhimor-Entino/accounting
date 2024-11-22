import { Button } from '@/components/ui/button';
import AddUserModal from '@/CustomComponents/Modals/AddUserModal';
import UsersTbl from '@/CustomComponents/Tables&List/users/UsersTbl';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { UserCog2Icon } from 'lucide-react';

import React from 'react'

interface Props {
    users: User[]
}
const Users = (props: Props) => {

    const { users } = props;


    return (
        <Authenticated>
        <div className='flex flex-col gap-x-9 w-full' >

        <div className='flex gap-4'>
            <div className='flex-1 flex items-center gap-x-2 '>
                <UserCog2Icon className=' text-slate-600 w-5 h-5'/>
               <p className=' text-slate-700 font-bold text-lg'> User Management</p>
            </div>

            <div className="flex justify-end">
              {/* <AddAccountModal account_type={account_type} /> */}
           <AddUserModal />
            </div>
          </div>
        <UsersTbl users={users}  />

        </div>

      </Authenticated>
    )
}

export default Users