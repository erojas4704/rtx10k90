import { Entity } from "./entity";
import { Collision, Physics, Ray } from "./Physics";
import { Vector3 } from "./Vector3";

export class Camera extends Entity {
  private _resolution = {
    x: 5,
    y: 2,
  };
  private _hFov: number;
  private _vFov: number;
  private _frustumDistance: number;
  private renderTarget: HTMLCanvasElement;

  constructor(renderTarget: HTMLCanvasElement) {
    super();
    this.renderTarget = renderTarget;
    this._resolution.x = renderTarget.width;
    this._resolution.y = renderTarget.height;
    this._hFov = 90;
    this._vFov = 60;
    this._frustumDistance = 1;
  }

  public set hFov(value: number) {
    this._hFov = value;
  }
  public set vFov(value: number) {
    this._vFov = value;
  }

  render() {
    const frustumCenter: Vector3 = Vector3.add(
      this.position,
      Vector3.multiply(this.rotation, this._frustumDistance)
    );

    const frustumWidth = this.calculateFrustumLength(
      this._hFov,
      this._frustumDistance
    );
    const frustumHeight = this.calculateFrustumLength(
      this._vFov,
      this._frustumDistance
    );

    const viewNormal: Vector3 = Vector3.cross(this.rotation, Vector3.up).neg;
    const topLeft: Vector3 = Vector3.add(
      frustumCenter,
      Vector3.add(viewNormal, Vector3.up).normalized
    );

    const bottomRight: Vector3 = Vector3.add(
      frustumCenter,
      Vector3.add(viewNormal, Vector3.up.neg).normalized
    );

    const drawContext = this.renderTarget.getContext("2d");
    if (!drawContext) throw new Error("Invalid rendering context!");

    const imageData = new ImageData(this._resolution.x, this._resolution.y);

    for (let y = 0; y < this._resolution.y; y++) {
      for (let x = 0; x < this._resolution.x; x++) {
        const xScaled = (x * frustumWidth) / this._resolution.x;
        const yScaled = (y * frustumHeight) / this._resolution.y;


        const offset: Vector3 = new Vector3(
          viewNormal.x * xScaled * frustumWidth,
          frustumHeight * yScaled,
          viewNormal.z * xScaled * frustumWidth
        );
        if(x == this._resolution.x / 2 && y == this._resolution.y / 2){
          console.log("WHAT", {offset});
          debugger;
        }
        const pixelWorldPosition: Vector3 = Vector3.add(topLeft, offset);
        const ray: Ray = new Ray(
          this.position,
          Vector3.subtract(pixelWorldPosition, this.position).normalized
        );

        const index = (y * this._resolution.x + x) * 4;
        const collision = Physics.raycast(ray);
        if (!collision) {
          imageData.data[index] = 0x00;
          imageData.data[index + 1] = 0x00;
          imageData.data[index + 2] = 0x00;
          imageData.data[index + 3] = 0xff;
        } else {
          imageData.data[index] = 0xff;
          imageData.data[index + 1] = 0x00;
          imageData.data[index + 2] = 0x00;
          imageData.data[index + 3] = 0xff;
        }
      }
    }

    drawContext.putImageData(imageData, 0, 0);

    console.log("rendering");
  }

  private calculateFrustumLength(fov: number, distance: number): number {
    const fovRads = (fov * Math.PI) / 180;
    const h: number = distance / Math.cos(fovRads * 0.5);
    return (h ** 2 - distance ** 2) * 2;
  }
}
