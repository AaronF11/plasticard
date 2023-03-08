export const STORAGE_COST: bigint = BigInt("500000000000000000000000")

export class User{
    account_id: string;
    //Personal data
    name: string;
    gener: string;
    born_date: string;
    phone: string;
    //Shool data
    career: string;
    admission: string;
    current_cycle: string;
    //Campus data
    student_code: string;
    status: string;
    campus: string;
}

export class Activities{
    account_id: string;
    total_amount: bigint;   
}

export class Credits{
    account_id: string;
    total_amount: bigint;
}