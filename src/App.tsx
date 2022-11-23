import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Camera } from "./camera";
import { Vector3 } from "./Vector3";
import { Plane, Sphere } from "./Primitives";
import { Light } from "./Light";

const sphere = new Sphere();

const light = new Light();
const light2 = new Light();

const plane = new Plane();
plane.position.z = 10;

const plane2 = new Plane();
plane2.position.y = 10;
plane2.position.z = 10;

const plane3 = new Plane();
plane3.position.y = -10;
plane3.position.z = 10;



light2.position.y = -4
light2.position.z = 3;

light.position.z = 1;
light.position.x = 3;

function App() {
  const canvas = useRef(null);
  const [camera, setCamera] = useState<Camera | null>();
  const [circleStats, setCircleStats] = useState({
    x: 0,
    y: 0,
    z: 5,
    radius: 3,
    color: 0x0000FFFF
    //color: Math.random() * 0xFFFFFF | 0x000000FF
  });

  // useEffect(() => {
    // if (!camera) return;
    // setInterval(() => {
      // plane.normal.z += 0.05;
      // if(plane.normal.z > 1){
        // plane.normal.z = -1;
      // }
      // 
      // console.log(plane.normal.z);
      // camera.render();
    // }, 200);
  // }, [camera])

  useEffect(() => {
    if (!camera) return;
    camera.rotation = new Vector3(0, 0, 1);
    camera.fov = 60;

    render();
  }, [camera]);

  const render = () => {
    if (!camera) return;

    sphere.position.x = circleStats.x;
    sphere.position.y = circleStats.y;
    sphere.position.z = circleStats.z;
    sphere.radius = circleStats.radius;
    sphere.material.albedo = circleStats.color;
    camera.render();
  };

  useEffect(() => {
    render();
  }, [circleStats]);

  useEffect(() => {
    setCamera(new Camera((canvas.current as unknown) as HTMLCanvasElement));
  }, [canvas]);

  return (
    <div className="App">
      {/* <input type="range" min={1} max={10} onChange={} /> */}
      <div>Rendering took {String(camera? Math.floor(camera.averageDelayMS): "error")} MS</div>
      <form>
      <label>X:
      <input
        id="x_pos"
        type="number"
        value={circleStats.x}
        step={0.1}
        onChange={(e) =>
          setCircleStats({
            ...circleStats,
            x: (e.target.value as unknown) as number,
          })
        }
      />
      </label>
      <label>Y:
      <input
        id="y_pos"
        type="number"
        value={circleStats.y}
        step={0.1}
        onChange={(e) =>
          setCircleStats({
            ...circleStats,
            y: (e.target.value as unknown) as number,
          })
        }
      />
      </label>
      <label>Z:
      <input
        id="z_pos"
        type="number"
        value={circleStats.z}
        step={0.1}
        onChange={(e) =>
          setCircleStats({
            ...circleStats,
            z: (e.target.value as unknown) as number,
          })
        }
      />
      </label>
      <label>Radius:
      <input
        id="radius"
        type="number"
        value={circleStats.radius}
        min={0}
        max={10}
        step={0.1}
        onChange={(e) =>
          setCircleStats({
            ...circleStats,
            radius: (e.target.value as unknown) as number,
          })
        }
      />
      </label>
      </form>
      <canvas ref={canvas} width={550} height={400}></canvas>
    </div>
  );
}

export default App;
