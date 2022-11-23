export class Material {
    public albedo:number = 0xFF0000FF;
    public specularity:number = 0;

    public get rgba(){
        const r = this.albedo >> 24 & 0xFF;
        const g = this.albedo >> 16 & 0xFF;
        const b = this.albedo >> 8 & 0xFF;
        const a = this.albedo & 0xFF;
        return {r, g, b, a};
    }
}