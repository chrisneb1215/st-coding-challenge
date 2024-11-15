<template>
    <control-wrapper v-bind="controlWrapper" :styles="styles" :is-focused="isFocused" :applied-options="appliedOptions">
        <DatePicker :id="control.id + '-datepicker'" :class="styles.control.input" :disabled="!control.enabled"
            :autofocus="appliedOptions.focus" format="d/MM/yyyy" format-placeholder="formatPattern" @change="onChange"
            @focus="isFocused = true" @blur="isFocused = false" toggle-button="toggleIcon" v-bind="appliedOptions">
            <template #toggleIcon="{ props }">
                <Icon name="calendar" @click="(ev: Event) => props.onClick(ev)" />
            </template>
        </DatePicker>
    </control-wrapper>

</template>

<script lang="ts">
import {
    JsonFormsRendererRegistryEntry,
    rankWith,
    ControlElement,
    isDateControl,
} from '@jsonforms/core'
import { default as ControlWrapper } from './ControlWrapper.vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'
import { rendererProps, RendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { DatePicker } from '@progress/kendo-vue-dateinputs'
import dayjs from 'dayjs'

const controlRenderer = defineComponent({
    name: 'KendoDatePickerRenderer',
    components: {
        ControlWrapper,
        DatePicker
    },
    props: {
        ...rendererProps<ControlElement>(),
    },
    setup(props: RendererProps<ControlElement>) {
        return useVanillaControl(
            useJsonFormsControl(props),
            (target) => {
                const formattedDate = dayjs(target.value).format('YYYY-MM-DD')
                return formattedDate || undefined
            }
        )
    },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
    renderer: controlRenderer,
    tester: rankWith(3, isDateControl),
}
</script>