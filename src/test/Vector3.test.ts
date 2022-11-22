import { expect } from "chai";
import { Vector3 } from "../Vector3";

describe("Vector3 math is accurate", () => {
  it("calculates the magnitude of a vector", () => {
    expect(new Vector3(6, 8, 0).magnitude).equal(10);
    expect(new Vector3(5, 12, 0).magnitude).equal(13);
  });

  it("identical vectors should have a dot product of 1", () => {
    const actual = Vector3.dot(new Vector3(0, 1, 0), new Vector3(0, 1, 0));
    expect(actual).equal(1);
  });

  it("perpendicular vectors should have a dot product of 0", () => {
    const actual = Vector3.dot(new Vector3(0, 1, 0), new Vector3(1, 0, 0));
    expect(actual).equal(0);
  });

  it("should accurately calculate dot product", () => {
    expect(Vector3.dot(new Vector3(-6, 8, 0), new Vector3(5, 12, 0))).equal(66);
    expect(Vector3.dot(new Vector3(4, 0.5, 0), new Vector3(-3, 7, 0))).equal(
      -8.5
    );
  });   

  it("should accurately get a cross vector", () => {
    expect(Vector3.cross(new Vector3(1, 0, 0), new Vector3(0, 1, 0))).equal(
      new Vector3(0, 0, 1)
    );
  });
});
