<template>
  <q-page class="q-pa-xl bg-grey-2 flex flex-center">
    <q-card class="form-card" flat bordered>
      <q-card-section class="text-center q-gutter-xs">
        <div class="text-h5 text-primary">Form</div>
        <div class="text-subtitle2 text-grey-7">
          Provide your basic information and confirm before submitting.
        </div>
      </q-card-section>

      <q-separator spaced inset />

      <q-form
        class="q-gutter-md"
        @submit.prevent="handleSubmit"
        @reset.prevent="handleReset"
      >
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="form.studentId"
            outlined
            label="Student ID"
            :rules="[rules.required('Student ID')]"
            hint="Use your university student ID"
          />

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.firstName"
                outlined
                label="First Name"
                :rules="[rules.required('First name')]"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.lastName"
                outlined
                label="Last Name"
                :rules="[rules.required('Last name')]"
              />
            </div>
          </div>

          <q-input
            v-model="form.email"
            outlined
            type="email"
            label="Email"
            :rules="[rules.required('Email'), rules.email]"
          />

          <q-input
            v-model="form.phone"
            outlined
            label="Phone"
            mask="###-###-####"
            hint="Format: 012-345-6789"
          />

          <q-select
            v-model="form.program"
            outlined
            label="Program"
            :options="programOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            :rules="[rules.required('Program')]"
          />

          <q-input
            v-model="form.notes"
            outlined
            type="textarea"
            label="Additional Notes"
            autogrow
            counter="500"
            maxlength="500"
          />

          <q-toggle
            v-model="form.acceptTerms"
            label="I confirm that the provided information is correct"
          />
        </q-card-section>

        <q-card-actions align="right" class="bg-grey-1">
          <q-btn type="reset" flat label="Reset" color="secondary" />
          <q-btn type="submit" unelevated label="Submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const buildInitialForm = () => ({
  studentId: '6704101320',
  firstName: 'narongpol',
  lastName: 'chunu',
  email: 'xoasitz@gmail.com',
  phone: '088-888-8888',
  program: 'se',
  notes: '-',
  acceptTerms: false
})

const form = reactive(buildInitialForm())

const programOptions = [
  { label: 'Software Engineering', value: 'se' },
  { label: 'Computer Science', value: 'cs' },
  { label: 'Information Technology', value: 'it' }
]

const rules = {
  required: (label) => (val) => !!val || `${label} is required`,
  email: (val) => (!val || /.+@.+\..+/.test(val)) || 'Enter a valid email address'
}

const handleSubmit = () => {
  if (!form.acceptTerms) {
    $q.notify({
      type: 'negative',
      message: 'Please confirm the information before submitting.'
    })
    return
  }

  $q.notify({
    type: 'positive',
    message: `Thank you, ${form.firstName}! Your response has been recorded.`
  })
}

const handleReset = () => {
  Object.assign(form, buildInitialForm())
  $q.notify({
    type: 'info',
    message: 'Form cleared.'
  })
}
</script>

<style scoped>
.form-card {
  width: 100%;
  max-width: 560px;
}
</style>
