import { Primitive } from "./Primitives";
import { Vector3 } from "./Vector3";

export class Physics {
  private static primitives: Primitive[] = [];
  public static linecast(
    origin: Vector3,
    direction: Vector3
  ): Collision | null {
    let closest: Collision | null = null;

    this.primitives.forEach((o) => {
      //TODO Get the closest collision
      const c = o.hitTest(new Ray(origin, direction));
      if (c) {
        closest = c;
      }
    });
    return closest;
  }

  public static raycast(ray: Ray): Collision | null {
    return this.linecast(ray.origin, ray.direction);
  }

  public static nearestPointOnLine(
    origin: Vector3,
    direction: Vector3,
    point: Vector3
  ): Vector3 {
    const v: Vector3 = Vector3.subtract(point, origin);
    const dot: number = Vector3.dot(v, direction);
    return Vector3.multiply(Vector3.add(origin, direction), dot);
  }

  public static register(o: Primitive) {
    this.primitives.push(o);
  }
}

export class Ray {
  public origin: Vector3;
  public direction: Vector3;

  constructor(origin: Vector3, direction: Vector3) {
    this.origin = origin;
    this.direction = direction;
  }
}

export class Collision {
  public point: Vector3;
  public normal: Vector3;
  public entity: Primitive;
  public distance: number = 0;

  constructor(entity:Primitive, point:Vector3, normal:Vector3, distance: number){
    this.point = point;
    this.normal = normal;
    this.entity = entity;
    this.distance = distance;
  }
}
