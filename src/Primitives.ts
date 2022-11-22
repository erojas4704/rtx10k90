import { Entity } from "./entity";
import { Physics, Ray } from "./Physics";
import { Vector3 } from "./Vector3";

export abstract class Primitive extends Entity {
  abstract hitTest(ray: Ray): boolean;
  public color: number = 0xff0000;

  constructor() {
    super();
    Physics.register(this);
  }
}

export class Sphere extends Primitive {
  public radius: number = 3;
  hitTest(ray: Ray): boolean {
    return false;
  }
}

export class Circle extends Primitive {
  public radius: number = 2;
  hitTest(ray: Ray): boolean {
    //The rotation of the circle isn't even taken into account
    // console.log(
    //   Vector3.distance(
    //     this.position,
    //     Physics.nearestPointOnLine(ray.origin, ray.direction, this.position)
    //   )
    // );
    const dist = Vector3.distance(
      this.position,
      Physics.nearestPointOnLine(ray.origin, ray.direction, this.position)
    );

    return (
      Vector3.distance(
        this.position,
        Physics.nearestPointOnLine(ray.origin, ray.direction, this.position)
      ) < this.radius
    );
  }
}
