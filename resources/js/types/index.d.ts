
interface TimeStamps {
    created_at: string;
    updated_at: string;
}

export interface Role {
    role: 'MAKER' | 'APPROVER' | 'ENCODERS'
}
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'MAKER' | 'APPROVER' | 'ENCODERS'
    access_level: AccessLevel,
    deactivation_reason: string,
    deactivation_effectivity_date: string
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    accountTypes: AccountTypes[];
    accountSubTypes: SubAccountTypes[];

};

export interface AccessLevel {
    id: number,
    role: string,
    description: string
}


export interface AccountTypes extends TimeStamps {
    id: number,
    name: string,
    abbr: string,
    description: string
}
export interface Account {

    account_name: string;
    account_no: string;
    account_sub_id: number;
    account_type: string;
    bank_account_code: string;
    bank_name: string;
    branch: string;
    currency: string;
    id: number;
    others_info: string;
    name: string
    account_payables_source_of_fund: Account
    account_sub_type: SubAccountTypes
}

export interface AccountOtherInfo {
    account_id: number;
    field: string;
    value: string;
}
export interface SubAccountTypes extends TimeStamps {
    id: number,
    name: string,
    abbr: string,
    description: string,
    account_id: number
    account_type: AccountTypes
}
export interface Entries {
    id: number,
    description: string,
    debit_amount: string,
    credit_amount: string,
    entry_date: string,
    debit_account: Account,
    credit_account: Account,
    reference_no: string,
    entered_by: User
}

export interface Ledgers {

    account_id: number
    account_name: string
    total_debit: number
    total_credit: number
    balance: number
}
export interface AccountLedgers {
    entered_by: User
    debit_amount:number
    credit_amount:number
    transaction_date: string
    account: Account
}
