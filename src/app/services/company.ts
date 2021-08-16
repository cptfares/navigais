import { Observable } from "rxjs";


export class Company{
    key?:string;
    name:string;
    agents:Array<string>
    admin: string
    containers:Array<string>
    archive:Array<object>
}