/**
 * WaveKeyboardHelpContent.ts
 *
 * Keyboard-help dialog content shared by all four screens: slider controls,
 * rotating the 3D view, zooming it, time controls, an optional combo-box
 * section (Lab's presets menu), and basic actions.
 *
 * Orbit is a keyboard drag (RichDragListener on WaveDisplayNode), so that row
 * is MoveDraggableItemsKeyboardHelpSection. Zoom is WaveViewHotkeyData.zoom,
 * the same HotkeyData the listener uses. Plus and minus are not in
 * KeyboardHelpIconFactory's key map, so the zoom row supplies an icon; the
 * keys themselves still come from the HotkeyData.
 */

import {
  BasicActionsKeyboardHelpSection,
  ComboBoxKeyboardHelpSection,
  KeyboardHelpIconFactory,
  KeyboardHelpSection,
  KeyboardHelpSectionRow,
  MoveDraggableItemsKeyboardHelpSection,
  SliderControlsKeyboardHelpSection,
  TextKeyNode,
  TimeControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import { WaveViewHotkeyData } from "./WaveViewHotkeyData.js";

export type WaveKeyboardHelpContentOptions = {
  /** Adds the combo-box section (the Lab screen's presets menu). */
  includeComboBox?: boolean;
};

export class WaveKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor(options?: WaveKeyboardHelpContentOptions) {
    const keyboardHelp = StringManager.getInstance().getKeyboardHelpStrings();

    const rotateViewSection = new MoveDraggableItemsKeyboardHelpSection({
      headingStringProperty: keyboardHelp.rotateViewTitleStringProperty,
    });

    const zoomSection = new KeyboardHelpSection(keyboardHelp.zoomViewTitleStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(WaveViewHotkeyData.zoom, {
        icon: KeyboardHelpIconFactory.iconOrIcon(new TextKeyNode("+"), new TextKeyNode("-")),
      }),
    ]);

    const leftSections = [new SliderControlsKeyboardHelpSection(), rotateViewSection, zoomSection];
    const rightSections = [
      new TimeControlsKeyboardHelpSection(),
      ...(options?.includeComboBox ? [new ComboBoxKeyboardHelpSection()] : []),
      new BasicActionsKeyboardHelpSection(),
    ];
    super(leftSections, rightSections);
  }
}
