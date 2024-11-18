export const getRoles = (i:number) =>{
    const role_list = ["MAKER","APPROVER","ENCODERS"]

    return role_list[i-1];
}