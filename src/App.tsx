import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Camera } from "./camera";
import { Vector3 } from "./Vector3";
import { Circle, Sphere } from "./Primitives";

const sphere = new Sphere();
const circle = new Circle();

function App() {
  const canvas = useRef(null);
  const [camera, setCamera] = useState<Camera | null>();
  const [circleStats, setCircleStats] = useState({
    x: 2.3,
    y: -4.5,
    z: 5,
    radius: 0.1,
  });

  useEffect(() => {
    if (!camera) return;
    camera.rotation = new Vector3(0, 0, 1);
    camera.hFov = 60;
    camera.vFov = 60;

    render();
  }, [camera]);

  const render = () => {
    if (!camera) return;

    circle.position.x = circleStats.x;
    circle.position.y = circleStats.y;
    circle.position.z = circleStats.z;
    circle.radius = circleStats.radius;
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
      <label htmlFor="x_pos">X:</label>
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
      <label htmlFor="y_pos">Y:</label>
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
      <label htmlFor="z_pos">Z:</label>
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
      <label htmlFor="radius">Radius:</label>
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
      <canvas ref={canvas} width={1440} height={1080}></canvas>
    </div>
  );
}

export default App;
