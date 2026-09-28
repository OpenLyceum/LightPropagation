/**
 * LightPropagationPreferencesModel.ts
 *
 * Model for the simulation-specific preferences shown in Preferences →
 * Simulation. Each preference Property takes its initial value from the
 * corresponding query parameter in lightPropagationQueryParameters.
 *
 * One instance is built in main.ts and passed into the screens whose models
 * read the absorption law.
 */

import { BooleanProperty } from "scenerystack/axon";
import type { Tandem } from "scenerystack/tandem";
import LightPropagationNamespace from "../LightPropagationNamespace.js";
import lightPropagationQueryParameters from "./lightPropagationQueryParameters.js";

export class LightPropagationPreferencesModel {
  /**
   * When true, the material's absorption follows the physical Beer–Lambert
   * law D = exp(−κ·Δx/ƛ), so shorter wavelengths are absorbed more strongly.
   * When false (default), it follows EMANIM's wavelength-independent law
   * D = exp(−κ·Δx/π) for exact parity with the original app. See doc/model.md.
   */
  public readonly wavelengthDependentAbsorptionProperty: BooleanProperty;

  public constructor(tandem?: Tandem) {
    this.wavelengthDependentAbsorptionProperty = new BooleanProperty(
      lightPropagationQueryParameters.wavelengthDependentAbsorption,
      tandem ? { tandem: tandem.createTandem("wavelengthDependentAbsorptionProperty") } : undefined,
    );
  }

  public reset(): void {
    this.wavelengthDependentAbsorptionProperty.reset();
  }
}

LightPropagationNamespace.register("LightPropagationPreferencesModel", LightPropagationPreferencesModel);
