<template>
    <control-wrapper v-bind="controlWrapper" :styles="styles" :is-focused="isFocused" :applied-options="appliedOptions">
        <TextBox :id="control.id + '-input'" :class="styles.control.input" :disabled="!control.enabled"
            :autofocus="appliedOptions.focus" :placeholder="appliedOptions.placeholder" @change="onChange"
            @focus="isFocused = true" @blur="isFocused = false" />
    </control-wrapper>
</template>

<script lang="ts">
import {
    JsonFormsRendererRegistryEntry,
    rankWith,
    isStringControl,
    ControlElement
} from '@jsonforms/core'
import { default as ControlWrapper } from './ControlWrapper.vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'
import { rendererProps, RendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { TextBox } from '@progress/kendo-vue-inputs'

const controlRenderer = defineComponent({
    name: 'KendoControlRenderer',
    components: {
        ControlWrapper,
        TextBox
    },
    props: {
        ...rendererProps<ControlElement>(),
    },
    setup(props: RendererProps<ControlElement>) {
        return useVanillaControl(
            useJsonFormsControl(props),
            (target) => target.value || undefined
        )
    },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
    renderer: controlRenderer,
    tester: rankWith(2, isStringControl),
}
</script>