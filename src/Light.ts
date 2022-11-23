import { Entity } from "./entity";
import { Physics } from "./Physics";

export class Light extends Entity{
    public color:number = 0xFFFFFF;
    public intensity:number = 1;
    public range:number = 10;

    constructor(){
        super();
        Physics.register(this);
    }

    public get r(){
        return this.color >> 16 & 0xFF;
    }
    public get g(){
        return this.color >> 8 & 0xFF;
    }
    public get b(){
        return this.color & 0xFF;
    }
}