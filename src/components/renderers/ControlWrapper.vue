<template>
    <div v-if="visible" :id="id" :class="styles.control.root + (errors ? ' has-error ' : '')">
        <label :for="id + '-input'" :class="[styles.control.label, required ? styles.control.required : '']">
            {{ label }}
            <span v-if="appliedOptions.showAsterisk" :class="styles.control.asterisk">*</span>
        </label>
        <slot></slot>
        <div :class="errors ? styles.control.error : styles.control.description">
            {{ errors ? errors : showDescription ? description : null }}
        </div>
    </div>
</template>

<script lang="ts">
import { isDescriptionHidden } from '@jsonforms/core'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'ControlWrapper',
    props: {
        id: {
            required: true,
            type: String,
        },
        description: {
            required: false as const,
            type: String,
            default: undefined,
        },
        errors: {
            required: false as const,
            type: String,
            default: undefined,
        },
        label: {
            required: false as const,
            type: String,
            default: undefined,
        },
        appliedOptions: {
            required: false as const,
            type: Object as PropType<any>,
            default: undefined,
        },
        visible: {
            required: false as const,
            type: Boolean,
            default: true,
        },
        required: {
            required: false as const,
            type: Boolean,
            default: false,
        },
        isFocused: {
            required: false as const,
            type: Boolean,
            default: false,
        },
        styles: {
            required: true,
            type: Object as PropType<any>,
        },
    },
    computed: {
        showDescription(): boolean {
            return !isDescriptionHidden(
                this.visible,
                this.description,
                this.isFocused,
                !!this.appliedOptions?.showUnfocusedDescription
            )
        },
        showAsterisk(): boolean {
            return this.required && this.appliedOptions?.showAsterisk
        },
    },
})
</script>

<style lang="scss" scoped>
.error {
    color: var(--error-primary);
    font-size: 14px;
    line-height: 17.5px;
    font-weight: 400;
    margin-top: 4px;
}

.label {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.5px;
    color: var(--text-secondary);
    margin-bottom: 6px;
}
</style>