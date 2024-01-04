<script setup>
import axios from '@axios'
import { userDataStore } from '@/store/useGetUserData'
import { useUserProfileStore } from '@/views/profile/useUserProfileStore'
import EgyptIcon from "@images/egypt.png"
import { useEgyptPhoneNumber } from "@/composable/useEgyptPhoneNumber"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useToast } from '@/composable/useToast'
import { requiredValidator, emailValidator } from "@validators"

const userStore = userDataStore()
const userProfileStore = useUserProfileStore()
const { checkIfEgyptPhoneNumber } = useEgyptPhoneNumber()
const { setErrors } = useGlobalHandleError()
const { showToast } = useToast()

const url = process.env.VUE_APP_BASE_URL 

const accountData = {
  personal_image: "",
  email: "",
  user_name: "",
  phone: "",
  role: "",
}

const refInputEl = ref()
const refVForm = ref()
const loading = ref(false)
const baseImgSrc = ref()
const accountDataLocal = ref(structuredClone(accountData))
const avatarSrc = ref()

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.personal_image = baseImgSrc.value
}

const changeAvatar = file => {
  
  if (file.target.files[0]) {
    const fileSizeBytes = file.target.files[0].size
    const fileSizeKB = fileSizeBytes / 1024
    
    if(fileSizeKB.toFixed(2) > 2048) {
      
      return showToast('File size should be 2MB or less', { icon: 'error' })
    }
  }

  avatarSrc.value = file.target.files[0]
  
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.personal_image = fileReader.result
    }
  }
}

const getUserData = async () => {
  try {
    const response = await userProfileStore.fetchUserProfile()
    
    console.log(response.data.role.id)
    if(response.status){
      baseImgSrc.value = response.data.personal_image
      accountDataLocal.value = {
        personal_image: response.data.personal_image,
        email: response.data.email,
        user_name: response.data.user_name,
        phone: response.data.phone_number,
        role: response.data.role.id,
      }
    }

  } catch (e) { 
    handleErrors(e)
  }
}

const handleErrors = err => {
  loading.value = false
  if(err.response) {
    const { status, data } = err.response

    if (status === 422) {
      setErrors(data.errors)
    } else {
      showToast(data.message, { icon: 'error' })
    }
  }
}

const saveData = async () => {

  loading.value = true
  if (!checkIfEgyptPhoneNumber(accountDataLocal.value.phone)) {
    loading.value = false

    return false
  }

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  }

  let formData = new FormData()

  avatarSrc.value != undefined ? formData.append('profile_image', avatarSrc.value) : "" 
  
  formData.append('email', accountDataLocal.value.email)
  formData.append('user_name', accountDataLocal.value.user_name)
  formData.append('phone', accountDataLocal.value.phone)
  formData.append('role', accountDataLocal.value.role)

  await axios.post(url + 'update-mini-profile', formData, config)
    .then(res => {
      if(res.data.status){
        loading.value = false
        showToast(res.data.message, { icon: 'success' })
      }
    })
    .catch(err => {
      loading.value = false
      handleErrors(err)
    })
}


const onSubmitSaveData = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) saveData()
  })
}

onMounted(() => {
  getUserData()
  userStore.getData()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Profile Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            size="100"
            class="me-6"
            :image="accountDataLocal && accountDataLocal.personal_image"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                size="small"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="tabler-cloud-upload"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="secondary"
                size="small"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="tabler-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-2 mb-0">
              Allowed JPG, JPEG or PNG. Max size of 2MB
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm 
            ref="refVForm"
            class="mt-6"
            @submit.prevent="onSubmitSaveData"   
          >
            <VRow>
              <!-- 👉 phone -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.phone"
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

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  type="email"
                  class="input-field"
                  prepend-inner-icon="tabler-mail"
                  variant="outlined"
                  :rules="[requiredValidator, emailValidator]"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.user_name"
                  label="User Name"
                  prepend-inner-icon="tabler-id-badge"
                  class="input-field"
                  variant="outlined"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  :loading="loading"
                  type="submit"
                  size="small"
                >
                  Save changes
                  <template #loader>
                    <span class="custom-loader">
                      <VIcon icon="tabler-refresh" />
                    </span>
                  </template>  
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

