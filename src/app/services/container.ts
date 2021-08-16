export class Container{
    adate:any;
    fdate:any;
    name : string;
    id : string;
    start :string;
    arrive :string;
    temperature: sensor ;
    humidity: sensor ;
    pressure : sensor ;
    tracking:boolean
    infared:boolean
    touch:boolean
    flame:boolean
    description: string;
    owner:string;
    active:boolean
        
}
export class sensor {
        active:boolean
        min:number
        max:number
        cureent:number


        
}