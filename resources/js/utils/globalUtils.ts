import { AccountTypes } from "@/types";

export const getAccountSubType = (arr:AccountTypes[],id:number) => {

    const findIndex = arr.findIndex((as: AccountTypes) => as.id === id)
    if(findIndex < 0) return "";
    return arr[findIndex].name
}

export const getAccountType = (arr:AccountTypes[],id:number) => {

    const findIndex = arr.findIndex((as: AccountTypes) => as.id == id)

    if(findIndex < 0) return "";
    return arr[findIndex].name
}