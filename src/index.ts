import { Camera } from "./camera";
import { Vector3 } from "./math";

const camera = new Camera();
camera.rotation = new Vector3(0, 0, 1);

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ready");
  document.append(`<P> why won't you work </P>`)
});

const ass = 5;
export default ass;