/**
 * Fleet-standard memory-leak regression suite (SceneryStackTemplate / QubitSketch pattern).
 */

import { describe, expect, it } from "vitest";
import { WaveSceneModel } from "../src/common/model/WaveSceneModel.js";
import { TimeModel } from "../src/common/TimeModel.js";
import { describeDisposalLeaks, forceGC } from "./helpers/memoryLeak.js";

function createAndDisposeTimeModel(): WeakRef<object> {
  const model = new TimeModel();
  const ref = new WeakRef<object>(model);
  model.dispose();
  return ref;
}

describe("Memory leak regression", () => {
  it("TimeModel is collected after dispose", async () => {
    const ref = createAndDisposeTimeModel();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("double dispose() does not throw", () => {
    const model = new TimeModel();
    model.dispose();
    expect(() => model.dispose()).not.toThrow();
  });

  it("repeated create/dispose cycles leave no survivors", async () => {
    const refs: WeakRef<object>[] = [];
    for (let i = 0; i < 10; i++) {
      refs.push(createAndDisposeTimeModel());
    }
    await forceGC(refs);
    const survivors = refs.filter((r) => r.deref() !== undefined).length;
    expect(survivors).toBe(0);
  });

  // WaveSceneModel has no dispose (screen models live for the sim's
  // lifetime); this guards against accidentally registering it with any
  // global that would retain it if one were ever created transiently.
  it("a dropped WaveSceneModel (no dispose) is collected", async () => {
    const ref = (() => {
      const model = new WaveSceneModel({ wave2: { enabled: true }, sumEnabled: true });
      model.step(1 / 60);
      return new WeakRef<object>(model);
    })();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });
});

describeDisposalLeaks([{ name: "TimeModel", create: () => new TimeModel(), idempotentDispose: true }]);
