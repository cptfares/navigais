export interface User{
    uid:string;
    email: string;
    adress ?: string;
    city ? : string;
    company ? :string;
    country ? :string;
    fullName ? :string;
    phone ? :number;
    role ? : boolean;
    companyId?:string


}
export interface Item {
    id?:string;
    title?:string;
    description?: string;
  }