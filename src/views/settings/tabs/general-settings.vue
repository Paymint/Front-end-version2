
<template>
  <div class="general-settings">
    <h4 class="text-dark">
      {{ $t('settings.general_settings') }}
    </h4>
    <VForm
      ref="refVForm"
      @submit.prevent="onSaveData"
    >
      <VRow class="mt-5">
        <VCol 
          cols="12" 
          md="6"
        >
          <VTextField
            v-model="appName"
            label="App Name"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-mobile"
            variant="outlined"
            :rules="[requiredValidator]"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="6"
        >
          <VTextField
            v-model="phone"
            class="input-field mobile-field"
            type="text"
            label="Mobile"
            :rules="[requiredValidator]"
            variant="outlined"
          >
            <template #prepend-inner>
              <img 
                :src="EgyptIcon" 
                alt="Custom Icon" 
                style="width: 20px; height: 20px; " 
              >
            </template>
          </VTextField>
        </VCol>
        <VCol 
          cols="12" 
          md="6"
        >
          <VTextField
            v-model="email"
            label="E-mail"
            type="email"
            class="input-field"
            prepend-inner-icon="tabler-mail"
            variant="outlined"
            :rules="[requiredValidator, emailValidator]"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="6"
        >
          <VTextField
            v-model="address"
            label="Address"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-mobile"
            variant="outlined"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="4"
        >
          <VTextField
            v-model="webVersion"
            label="Web version"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-desktop"
            variant="outlined"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="4"
        >
          <VTextField
            v-model="androidVersion"
            label="Android version"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-mobile"
            variant="outlined"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="4"
        >
          <VTextField
            v-model="iosVersion"
            label="Ios version"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-imac"
            variant="outlined"
          />
        </VCol>
        
        <!-- <VCol cols="12">
          <DropZone 
          title="logo"
          logo="https://staging-api.paymint-exp.com/storage/14558/170431623089384.jpg"
          @selected-img="selectedImg"  
          />
          </VCol> 
        -->
      </VRow>
      <VRow>
        <VCol cols="12">
          <VBtn 
            type="submit"
            size="small"
            :loading="loading"
          >
            <template #loader>
              <span class="custom-loader">
                <VIcon icon="tabler-refresh" />
              </span>
            </template>
            {{ $t('general.save') }}
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<script setup>
import EgyptIcon from "@images/egypt.png"
import { useEgyptPhoneNumber } from "@/composable/useEgyptPhoneNumber"
import DropZone from "@/components/dropZone.vue"
import { requiredValidator, emailValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useAppSettings } from "@/composable/settings/useAppSettings"
import { onMounted } from "vue"
import { useToast } from '@/composable/useToast'


const { checkIfEgyptPhoneNumber } = useEgyptPhoneNumber()
const { getGeneralSettings, updateGeneralSettings } = useAppSettings()
const { showToast } = useToast()
const { setErrors } = useGlobalHandleError()


const refVForm = ref()
const appName = ref("")
const phone = ref("")
const email = ref("")
const address = ref("")
const logo = ref("")
const webVersion = ref("")
const androidVersion = ref("")
const iosVersion = ref("")
const loading = ref(false)

const selectedImg = data => {
  data.forEach(element => {
    logo.value = element.file.name
  })
}

const fetchData = async () => {

  try {

    const response = await getGeneralSettings()

    if (response.status == 200) {
      const settingsData = response.data.data

      appName.value = settingsData.app_name
      phone.value = settingsData.phone
      email.value = settingsData.email
      address.value = settingsData.address
      logo.value = settingsData.logo
      webVersion.value = settingsData.versions.web_version
      androidVersion.value = settingsData.versions.android_version
      iosVersion.value = settingsData.versions.ios_version
    }
  } catch (e) {
    setErrors(e.response.data.errors)
  }
}

const onSaveData = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) saveData()
  })
}

const saveData = async () => {
  loading.value = true
  
  if (!checkIfEgyptPhoneNumber(phone.value)) {
    loading.value = false

    return false
  }

  let payload = {
    app_name: appName.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
    web_version: webVersion.value,
    android_version: androidVersion.value,
    ios_version: iosVersion.value,
    type: 'GeneralSettings',

    // logo: logo.value,
  }

  try {

    const response = await updateGeneralSettings(payload)

    if (response.status == 200) { 
      showToast(response.data.message, { icon: 'success' })
    }

    loading.value = false

  } catch (e) { 
    loading.value = false
    setErrors(e.response.data.errors)
  }
}

onMounted(() => {
  fetchData()
})
</script>
