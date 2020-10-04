export class State{
    id: number;
    name: string; 
    country: Country;
}

export interface Country{
    id: number; 
    name: string; 
    short_name: string;
}