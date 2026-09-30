/**
 * WaveViewHotkeyData.ts
 *
 * Zoom shortcuts for the 3D wave view. Orbit is a keyboard drag on the same
 * node (arrow / WASD via RichDragListener) and is documented with
 * MoveDraggableItemsKeyboardHelpSection rather than a second key list.
 *
 * The zoom listener and the help row both read `ZOOM`.
 */

import { HotkeyData } from "scenerystack/scenery";
import { StringManager } from "../../i18n/StringManager.js";

const keyboardHelp = StringManager.getInstance().getKeyboardHelpStrings();

export const WaveViewHotkeyData = {
  zoom: new HotkeyData({
    keys: ["plus", "equals", "minus"],
    repoName: "light-propagation",
    keyboardHelpDialogLabelStringProperty: keyboardHelp.zoomViewStringProperty,
    keyboardHelpDialogPDOMLabelStringProperty: keyboardHelp.zoomViewStringProperty,
  }),
} as const;
