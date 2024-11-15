<template>
    <control-wrapper v-bind="controlWrapper" :styles="styles" :is-focused="isFocused" :applied-options="appliedOptions">
        <ComboBox :id="control.id + '-drop-down-list'" v-bind="appliedOptions" :class="styles.control.input"
            :data-items="items" :disabled="!control.enabled" :autofocus="appliedOptions.focus"
            :placeholder="appliedOptions.placeholder" @change="onChange" @focus="isFocused = true"
            @blur="isFocused = false" @filterchange="filterChange">
        </ComboBox>
    </control-wrapper>

</template>

<script lang="ts">
import {
    JsonFormsRendererRegistryEntry,
    rankWith,
    ControlElement,
    isEnumControl,
} from '@jsonforms/core'
import { default as ControlWrapper } from './ControlWrapper.vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'
import { rendererProps, RendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { ComboBox, ComboBoxFilterChangeEvent } from '@progress/kendo-vue-dropdowns'
import { filterBy } from '@progress/kendo-data-query'


const dropDownRenderer = defineComponent({
    name: 'KendoDropDownListRenderer',
    components: {
        ControlWrapper,
        ComboBox
    },
    props: {
        ...rendererProps<ControlElement>(),
    },
    data: function () {
        return {
            items: []
        }
    },
    setup(props: RendererProps<ControlElement>) {
        return useVanillaControl(
            useJsonFormsControl(props),
            (target) => {
                props.uischema.options?.handleChange(target)

                if (props.uischema.options?.valueField && target.value) {
                    return target.value[props.uischema.options.valueField]
                }

                return target.value || undefined
            }
        )
    },
    mounted() {
        this.items = this.appliedOptions.dataItems
    },
    methods: {
        filterChange(event: ComboBoxFilterChangeEvent) {
            const newData = event.filter.value.length > 3 ?
                this.filterData(event.filter) : this.appliedOptions.dataItems.slice()

            this.items = newData
        },
        filterData(filter: ComboBoxFilterChangeEvent['filter']) {
            const data = this.appliedOptions.dataItems.slice()
            return filterBy(data, filter)
        }
    }
})



export default dropDownRenderer

export const entry: JsonFormsRendererRegistryEntry = {
    renderer: dropDownRenderer,
    tester: rankWith(3, isEnumControl),
}
</script>