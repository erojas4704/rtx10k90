import { Vector3 } from "./math";

export class Entity {
  public position: Vector3 = new Vector3();
  public rotation: Vector3 = new Vector3(0, 0, -1);

  constructor() {}
}
