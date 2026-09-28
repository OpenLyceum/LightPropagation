/**
 * main.ts
 *
 * Entry point for the simulation. Initializes SceneryStack, creates the
 * screens, and starts the main event loop.
 *
 * !! CRITICAL IMPORT ORDER !!
 * brand.js MUST be the first import. Each module imports the next, so the import nesting is
 *
 *   main → brand → splash → assert → init
 *
 * and therefore the actual EXECUTION order (deepest import runs first) is the reverse:
 *
 *   init → assert → splash → brand → main
 *
 * SceneryStack requires this exact load order. Never reorder these imports.
 */

// brand.js MUST be first; importing it runs the whole chain (init→assert→splash→brand) before main.
import "./brand.js";

import { onReadyToLaunch, PreferencesModel, Sim } from "scenerystack/sim";
import { Tandem } from "scenerystack/tandem";
import { StringManager } from "./i18n/StringManager.js";
import { IntroScreen } from "./intro/IntroScreen.js";
import LightPropagationColors from "./LightPropagationColors.js";
import { LabScreen } from "./lab/LabScreen.js";
import { PolarizationScreen } from "./polarization/PolarizationScreen.js";
// Declares the permalink query parameters (and logs them) at startup.
import "./preferences/lightPropagationQueryParameters.js";
import { LightPropagationPreferencesModel } from "./preferences/LightPropagationPreferencesModel.js";
import { LightPropagationPreferencesNode } from "./preferences/LightPropagationPreferencesNode.js";
import { WavePlatesScreen } from "./wave-plates/WavePlatesScreen.js";

onReadyToLaunch(() => {
  const stringManager = StringManager.getInstance();
  const screenNames = stringManager.getScreenNames();

  // Simulation-specific preferences; initial values come from lightPropagationQueryParameters.
  const simPreferences = new LightPropagationPreferencesModel(Tandem.ROOT.createTandem("preferences"));

  const screens = [
    new IntroScreen({
      // The screen name Property updates automatically when the locale changes
      name: screenNames.introStringProperty,
      tandem: Tandem.ROOT.createTandem("introScreen"),
      backgroundColorProperty: LightPropagationColors.backgroundColorProperty,
    }),
    new PolarizationScreen({
      // The screen name Property updates automatically when the locale changes
      name: screenNames.polarizationStringProperty,
      tandem: Tandem.ROOT.createTandem("polarizationScreen"),
      backgroundColorProperty: LightPropagationColors.backgroundColorProperty,
      preferences: simPreferences,
    }),
    new WavePlatesScreen({
      // The screen name Property updates automatically when the locale changes
      name: screenNames.wavePlatesStringProperty,
      tandem: Tandem.ROOT.createTandem("wavePlatesScreen"),
      backgroundColorProperty: LightPropagationColors.backgroundColorProperty,
    }),
    new LabScreen({
      // The screen name Property updates automatically when the locale changes
      name: screenNames.labStringProperty,
      tandem: Tandem.ROOT.createTandem("labScreen"),
      backgroundColorProperty: LightPropagationColors.backgroundColorProperty,
      preferences: simPreferences,
    }),
  ];

  const sim = new Sim(stringManager.getTitleStringProperty(), screens, {
    preferencesModel: new PreferencesModel({
      visualOptions: {
        // Adds a "Projector Mode" toggle in Preferences → Visual
        supportsProjectorMode: true,
        // Enables keyboard-navigation highlight outlines
        supportsInteractiveHighlights: true,
      },
      simulationOptions: {
        customPreferences: [
          {
            createContent: (tandem: Tandem) => new LightPropagationPreferencesNode(simPreferences, tandem),
          },
        ],
      },
      localizationOptions: {
        // Adds a language picker in Preferences → Language
        supportsDynamicLocale: true,
      },
    }),

    // Optional: fill in credits shown in Help → About
    credits: {
      thanks:
        "Based on EMANIM: Interactive visualization of electromagnetic waves by András Szilágyi " +
        "(emanim.szialab.org), the source of the model equations, control ranges, and preset phenomena. " +
        "Built with SceneryStack as part of the OpenLyceum fleet.",
    },
  });

  sim.start();
});
