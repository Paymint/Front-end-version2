<script setup>
import { VForm } from 'vuetify/components/VForm'
import axios from '@axios'

const url = process.env.VUE_APP_BASE_URL 

const iconsSteps = [
  {
    title: 'National ID - Front Face',
    icon: 'tabler-id-badge',
  },
  {
    title: 'National ID - Back Face',
    icon: 'tabler-id-badge-off',
  },
  {
    title: 'Selfie',
    icon: 'tabler-camera-selfie',
  },
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
]

const currentStep = ref(0)
const isCurrentStepValid = ref(true)
const refFrontIdForm = ref()
const refBackIdForm = ref()
const refSelfieIdForm = ref()
const frontID = ref(null)
const backID = ref(null)
const selfieID = ref(null)
const loading = ref(false)

const userId = ref(31)

const formData = ref({
  firstName: 'johndoe',
  lastName: 'john.doe@email.com',
})

const uploadImage = (image, type) => {
  loading.value = true

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  }

  let formData = new FormData()

  formData.append('image', image)
  formData.append('type', type)
  formData.append('user_id', userId.value)

  axios.post(url + 'kyc-image-process', formData, config)
    .then(res => {
      console.log(res)
      loading.value = false
    })
    .catch(err => {
      loading.value = false
      console.log(err)
    })
}

const uploadFrontID = () => {
  uploadImage(frontID.value, 'front_national_id')
}

const uploadBackID = () => {
  uploadImage(backID.value, 'back_national_id')
}

const uploadSelfieID = () => {
  uploadImage(selfieID.value, 'selfie_national_id')
}

const onFrontIdChange = e => {
  frontID.value = e.target.files[0]
}

const onBackIdChange = e => {
  backID.value = e.target.files[0]
}

const onSelfieIdChange = e => {
  selfieID.value = e.target.files[0]
}



const backToPrevious = () => {
  currentStep.value--
}

const handleFrontID = () => {
  refFrontIdForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) uploadFrontID()
  })
}

const handleBackID = () => {
  refBackIdForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) uploadBackID()
  })
}

const handleSelfie = () => {
  refSelfieIdForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) uploadSelfieID()
  })
}
</script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VCardText>
      <!-- 👉 stepper content -->

      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
          <VForm
            ref="refFrontIdForm"
            @submit.prevent="handleFrontID"
          >
            <VRow>
              <VCol cols="12">
                <VFileInput
                  placeholder="Upload your documents"
                  label="National ID - Front Face"
                  prepend-icon="tabler-paperclip"
                  @:change="onFrontIdChange"
                >
                  <template #selection="{ fileNames }">
                    <template
                      v-for="fileName in fileNames"
                      :key="fileName"
                    >
                      <VChip
                        label
                        size="small"
                        variant="outlined"
                        color="primary"
                        class="me-2"
                      >
                        {{ fileName }}
                      </VChip>
                    </template>
                  </template>
                </VFileInput>
              </VCol>
              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    disabled
                    @click="backToPrevious"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn 
                    :loading="loading"
                    :disabled="!frontID"
                    type="submit"
                  >
                    Upload & Continue
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                    <template #loader>
                      <span class="custom-loader">
                        <VIcon icon="tabler-refresh" />
                      </span>
                    </template>
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refBackIdForm"
            @submit.prevent="handleBackID"
          >
            <VRow>
              <VCol cols="12">
                <VFileInput
                  placeholder="Upload your documents"
                  label="National ID - Back Face"
                  prepend-icon="tabler-paperclip"
                  @:change="onBackIdChange"
                >
                  <template #selection="{ fileNames }">
                    <template
                      v-for="fileName in fileNames"
                      :key="fileName"
                    >
                      <VChip
                        label
                        size="small"
                        variant="outlined"
                        color="primary"
                        class="me-2"
                      >
                        {{ fileName }}
                      </VChip>
                    </template>
                  </template>
                </VFileInput>
              </VCol>
              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="backToPrevious"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn 
                    :loading="loading"
                    :disabled="!backID"
                    type="submit"
                  >
                    Upload & Continue
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                    <template #loader>
                      <span class="custom-loader">
                        <VIcon icon="tabler-refresh" />
                      </span>
                    </template>
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refSelfieIdForm"
            @submit.prevent="handleSelfie"
          >
            <VRow>
              <VCol cols="12">
                <VFileInput
                  placeholder="Upload your documents"
                  label="Selfie"
                  prepend-icon="tabler-paperclip"
                  @:change="onSelfieIdChange"
                >
                  <template #selection="{ fileNames }">
                    <template
                      v-for="fileName in fileNames"
                      :key="fileName"
                    >
                      <VChip
                        label
                        size="small"
                        variant="outlined"
                        color="primary"
                        class="me-2"
                      >
                        {{ fileName }}
                      </VChip>
                    </template>
                  </template>
                </VFileInput>
              </VCol>
              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="backToPrevious"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn 
                    :loading="loading"
                    :disabled="!selfieID"
                    type="submit"  
                  >
                    Upload & Continue
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                    <template #loader>
                      <span class="custom-loader">
                        <VIcon icon="tabler-refresh" />
                      </span>
                    </template>
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formData.name"
                class="input-field"
                label="Name"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                v-model="formData.birthdate"
                class="input-field"
                label="Birthdate"
                placeholder="Select date"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formData.nationalid"
                class="input-field"
                label="National ID"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formData.mobile"
                class="input-field"
                label="Mobile Number"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formData.address"
                class="input-field"
                label="Address"
              />
            </VCol>
            <VCol cols="12">
              <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="backToPrevious"
                >
                  <VIcon
                    icon="tabler-arrow-left"
                    start
                    class="flip-in-rtl"
                  />
                  Previous
                </VBtn>

                <VBtn type="submit">
                  Continue
                  <VIcon
                    icon="tabler-arrow-right"
                    end
                    class="flip-in-rtl"
                  />
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
