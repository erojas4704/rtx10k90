/**
 * Reference: https://tmcw.github.io/literate-raytracer/
 */
import { Entity } from "./entity";
import { Material } from "./Material";
import { Physics, Ray } from "./Physics";
import { Vector3 } from "./Vector3";

export class Camera extends Entity {
  private _resolution = {
    x: 5,
    y: 2,
  };
  private _fov: number;
  private _frustumDistance: number;
  private renderTarget: HTMLCanvasElement;

  private delaySamples:number = 0;
  private totalDelayMS:number = 0;
  public averageDelayMS:number = 0;

  constructor(renderTarget: HTMLCanvasElement) {
    super();
    this.renderTarget = renderTarget;
    this._resolution.x = renderTarget.width;
    this._resolution.y = renderTarget.height;
    this._fov = 90;
    this._frustumDistance = 1;
  }

  public set fov(value: number) {
    this._fov = value;
  }

  render() {
    const fovRads = (this._fov * Math.PI) / 180;
    const aspectRatio = this._resolution.y / this._resolution.x;

    const frustumWidthHalf = Math.tan(fovRads) * this._frustumDistance;
    const frustumHeightHalf = frustumWidthHalf * aspectRatio;

    const pixelWidth = frustumWidthHalf * 2 / (this._resolution.x - 1);
    const pixelHeight = frustumHeightHalf * 2 / (this._resolution.y - 1);

    const renderStartTime = performance.now();

    const drawContext = this.renderTarget.getContext("2d");
    if (!drawContext) throw new Error("Invalid rendering context!");

    const imageData = new ImageData(this._resolution.x, this._resolution.y);

    for (let y = 0; y < this._resolution.y; y++) {
      for (let x = 0; x < this._resolution.x; x++) {
        const cameraRight:Vector3 = Vector3.cross(this.rotation, Vector3.right);
        const cameraUp:Vector3 = Vector3.cross(this.rotation, Vector3.up);

        const xScale = Vector3.multiply(cameraRight, x * pixelWidth - frustumWidthHalf);
        const yScale = Vector3.multiply(cameraUp, y * pixelHeight - frustumHeightHalf);

        const ray: Ray = new Ray(
          this.position,
          Vector3.add(this.rotation, xScale, yScale).normal
        );

        const index = (y * this._resolution.x + x) * 4;
        const collision = Physics.raycast(ray);
        if (!collision) {
          imageData.data[index] = 0x00;
          imageData.data[index + 1] = 0x00;
          imageData.data[index + 2] = 0x00;
          imageData.data[index + 3] = 0xff;
        } else {
          const material:Material = collision.entity.material;
          const {r, g, b, a} = material.rgba;
          let [pR, pG, pB] = [0, 0, 0];

          //Get the nearest light source for this test

          Physics.lights.forEach(light => {
            const normalToLight = Vector3.subtract(collision.point, light.position).normal;
            const dot = Vector3.dot(normalToLight, collision.normal);
            const distanceToLight = Vector3.distance(collision.point, light.position);
            pR += r * dot;
            pG += g * dot;
            pB += b * dot;
          });
          
          

          
          imageData.data[index] = this.clamp(pR, 0, 255);       
          imageData.data[index + 1] = this.clamp(pG, 0, 255);  
          imageData.data[index + 2] = this.clamp(pB, 0, 255);   
          imageData.data[index + 3] = a;
        }
      }
    }
    drawContext.putImageData(imageData, 0, 0);

    this.totalDelayMS += performance.now() - renderStartTime;
    this.delaySamples ++;
    this.averageDelayMS = this.totalDelayMS / this.delaySamples;
  }

  private clamp(value:number, min:number, max:number):number{
    return Math.min(Math.max(value, min), max);
  }
}
