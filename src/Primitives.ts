import { Entity } from "./entity";
import { Material } from "./Material";
import { Collision, Physics, Ray } from "./Physics";
import { Vector3 } from "./Vector3";

export abstract class Primitive extends Entity {
  abstract hitTest(ray: Ray): Collision | null;
  abstract material: Material;

  constructor() {
    super();
    Physics.register(this);
  }
}

export class Sphere extends Primitive {
  public radius: number = 2;
  public material:Material;

  constructor(){
    super();
    this.material = new Material();
  }

  hitTest(ray: Ray): Collision | null {

    const eyeToCenter: Vector3 = Vector3.subtract(this.position, ray.origin);
    const v: number = Vector3.dot(eyeToCenter, ray.direction);
    const eoDot = Vector3.dot(eyeToCenter, eyeToCenter);
      
    const nearestPoint =  Vector3.multiply(Vector3.add(ray.origin, ray.direction), v);
    const discriminant = this.radius ** 2 - eoDot + v ** 2;
    const distance = v - Math.sqrt(discriminant);

    const hitPosition = Vector3.add(ray.origin, Vector3.multiply(ray.direction, distance));
    const hitNormal = Vector3.subtract(this.position, hitPosition).normal;
    
    const dist = Vector3.distance(
      this.position,
      nearestPoint
    );

    if(dist < this.radius){
      return new Collision(this, hitPosition, hitNormal, distance);
    }

   return null;
  }
}

export class Plane extends Primitive {
  public material: Material;
  public rotation: Vector3 = new Vector3(0, 0, 1);

  constructor(){
    super();
    this.material = new Material();
    this.material.albedo = 0xFFFFFFFF;
  }

  hitTest(ray: Ray): Collision | null {
    const epsilon = 1e-6;
    const ndotu = Vector3.dot(this.rotation, ray.direction);

    
    if(Math.abs(ndotu) < epsilon){
      return null;
    }
    const w = Vector3.subtract(this.position, ray.origin);
    const si = Vector3.dot(this.rotation, w) / ndotu;
    const psi = Vector3.add(w, Vector3.multiply(ray.direction, si), this.position);
    const distance = Vector3.distance(ray.origin, psi);

    return new Collision(this, psi, this.rotation, distance);
  }
}