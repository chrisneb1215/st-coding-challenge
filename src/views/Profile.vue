<template>
    <Breadcrumb />

    <h1 class="text-title">Profile Detail</h1>

    <div class="panel">
        <p>This is the personal information you use to access and manage your account. Your email address will be used
            for account securty, recovery, and notifications.</p>
    </div>
    <div class="card">
        <div class="card-header">
            <h2 class="card-title text-title">Details</h2>
            <Icon name="arrow-up" />
        </div>
        <div class="myform">
            <JsonForms ref="jsonFormRef" :data="formData" :renderers="renderers" :schema="schema" :uischema="uischema"
                validationMode="ValidateAndShow" @change="onDataUpdate" />
        </div>
    </div>

    <Teleport to="body">
        <Footer>
            <button class="primary-button" :disabled="!isValid"><span>Next</span>
                <Icon name="arrow-right" />
            </button>
        </Footer>
    </Teleport>

</template>

<script lang="ts" setup>
import { JsonForms, JsonFormsChangeEvent } from "@jsonforms/vue"
import {
    vanillaRenderers,
} from "@jsonforms/vue-vanilla"
import { controlRenderers } from "@/components/renderers"
import dayjs from "dayjs"
import Breadcrumb from '@/components/Breadcrumb.vue'
import Footer from '@/components/layout/Footer.vue'
import { JsonSchema } from "@jsonforms/core"


const formData = ref<Partial<Profile>>({})
const jsonFormRef = ref()

type Profile = {
    forename: string
    surname: string
    dateOfBirth: string
    email: string
}

const emailOptions = [
    { emailAdd: "chris@gmail.com", title: "Chris Neb" },
    { emailAdd: "john@gmail.com", title: "John Smith" },
    { emailAdd: "chen@gmail.com", title: "Chen Zhang" }
]

const renderers = Object.freeze([
    ...vanillaRenderers,
    ...controlRenderers
])

const schema = computed(() => <JsonSchema>({
    type: 'object',
    properties: {
        forename: {
            type: 'string',
            title: 'Forename(s)',
        },
        surname: {
            type: 'string',
            title: 'Surname'
        },
        dateOfBirth: {
            type: 'string',
            format: 'date',
            title: 'Date of Birth'
        },
        email: {
            type: 'string',
            title: 'Email Address',
            format: 'email',
            enum: ['chris@gmail.com', 'john@gmail.com', 'chen@gmail.com']
        }
    },
    required: ['forename', 'surname', 'dateOfBirth', 'email'],
}))

const uischema = ref({
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            scope: '#/properties/forename',
            options: {
                placeholder: 'Type'
            }
        },
        {
            type: 'Control',
            scope: '#/properties/surname',
            options: {
                placeholder: 'Type'
            }
        },
        {
            type: 'Control',
            scope: '#/properties/dateOfBirth',
            options: {
                placeholder: 'DD/MM/YYYY',
                format: 'dd/MM/yyyy'
            }
        },
        {
            type: 'Control',
            scope: '#/properties/email',
            rule: {
                effect: 'SHOW',
                condition: {
                    scope: '#/properties/dateOfBirth',
                    schema: { type: 'string' }
                }
            },
            options: {
                format: 'dropdown',
                valueField: 'emailAdd',
                textField: 'emailAdd',
                dataItemId: 'emailAdd',
                dataItems: emailOptions,
                filterable: true,
                placeholder: 'Type',
                handleChange: ({ value }: { value?: EmailRecord }) => {

                    if (value) {
                        alert(`${value.emailAdd} - ${value.title}`)
                    }
                }
            }
        }
    ]
})

type EmailRecord = {
    emailAdd: string
    title: string
}

const isValid = ref(true)

const onDataUpdate = (event: JsonFormsChangeEvent) => {
    formData.value = event.data

    isValid.value = !!Object.keys(event.data).length && Object.keys(event.errors || {}).length === 0

    if (formData.value && formData.value.dateOfBirth) {
        const emailField = uischema.value.elements.find(
            (element) => element.scope === '#/properties/email'
        )

        if (emailField && emailField.rule) {
            // Show or hide the email field based on age
            const diffAge = dayjs(formData.value.dateOfBirth).diff(dayjs(), 'year')

            if (Math.abs(diffAge) >= 18) {
                emailField.rule.effect = 'SHOW'
                schema.value.required?.push('email')
            } else {
                emailField.rule.effect = 'HIDE'
                const set = new Set(schema.value.required)
                set.delete('email')

                schema.value.required = Array.from(set)
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.myform {
    :deep(.vertical-layout) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0 var(--form-gap);


        .vertical-layout-item {
            flex: auto;
            width: calc((100% - var(--form-gap)) / 2);
            min-width: 200px;
        }
    }
}

.card {
    border: 0.3px solid #97A1AF;
    background-color: #FFFFFF;
    border-radius: var(--border-radius);
    padding: 15px;
    min-width: 200px;

    .card-header {
        display: flex;
        flex-direction: row;
        gap: 15px;

        .card-toggle {}
    }
}

.panel {
    padding: 15px;
    background-color: #E5F2FF;
    border: 0.2px solid #97A1AF;
    margin: 10px 0 20px 0;
    border-radius: var(--border-radius);

    p {
        margin: 0;
        font-weight: 500;
        font-size: 18px;
        line-height: 23.4px;
        color: var(--primary);
    }
}

.text-title {
    flex: 1;
    margin: 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: var(--primary);
}
</style>