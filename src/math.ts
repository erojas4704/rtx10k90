export class Vector3 {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public get magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
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

}
