export class Vector3 {
  public x: Number = 0;
  public y: Number = 0;
  public z: Number = 0;

  public Vector3(x: Number, y: Number, z: Number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static dot(from: Vector3, to: Vector3): Number {
    return 0;
  }

  public static cross(from: Vector3, to: Vector3): Vector3 {}
}
