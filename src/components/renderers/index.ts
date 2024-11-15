export { default as ControlWrapper } from './ControlWrapper.vue'
export { default as KendoRenderer } from './KendoInput.vue'
export { default as KendoDatePicker } from './KendoDatePicker.vue'
export { default as KendoDropDownList } from './KendoDropDownList.vue'

import { entry as kendoControlRendererEntry } from './KendoInput.vue'
import { entry as kendoDatePickerRendererEntry } from './KendoDatePicker.vue'
import { entry as kendoDropDownListRendererEntry } from './KendoDropDownList.vue'

export const controlRenderers = [
    kendoControlRendererEntry,
    kendoDatePickerRendererEntry,
    kendoDropDownListRendererEntry
];