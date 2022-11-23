export class Vector3 {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public get negative(): Vector3 {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  public get magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  public get normalized(): Vector3 {
    const mag = this.magnitude;
    return new Vector3(this.x / mag, this.y / mag, this.z / mag);
  }

  public static add(...vectors:Vector3[]): Vector3 {
    return vectors.reduce((prev:Vector3, curr:Vector3) => {
      if(!prev) return curr;
      return new Vector3(prev.x + curr.x, prev.y + curr.y, prev.z + curr.z);
    });
    
    //return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  public static multiply(vector: Vector3, value: number): Vector3 {
    return new Vector3(vector.x * value, vector.y * value, vector.z * value);
  }

  public static scale(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
  }

  public static subtract(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  public static dot(a: Vector3, b: Vector3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  public static cross(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }

  public static distance(a: Vector3, b: Vector3): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
  }

  public static get up() {
    return new Vector3(0, 1, 0);
  }

  public static get right() {
    return new Vector3(1, 0, 0);
  }

  public get mag(): number {
    return this.magnitude;
  }

  public get neg(): Vector3 {
    return this.negative;
  }

  public get normal(): Vector3 {
    return this.normalized;
  }
}
