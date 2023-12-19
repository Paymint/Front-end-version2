<script setup>
import { VForm } from "vuetify/components/VForm"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/store/agent/useUserStore"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import EgyptIcon from "@images/egypt.png"
import { useToast } from '@/composable/useToast'
import { useIdValidator } from "@/composable/useIdValidator"
import { useEgyptPhoneNumber } from "@/composable/useEgyptPhoneNumber"


/********* emit ***********/
const emit = defineEmits(['userFound'])


/***** composables ******/
const { t } = useI18n()
const UserStore = useUserStore()
const { setErrors } = useGlobalHandleError()
const { checkIfEgyptPhoneNumber } = useEgyptPhoneNumber()
const { showToast } = useToast()
const { isValidNationalID, isValidPassportID, isValidBirthdate } = useIdValidator()

/******** reactive data ***********/
const nationalId = ref(null)
const passportID = ref(null)
const birthDate = ref(null)
const mobile = ref(null)
const loading = ref(false)
const selectedType = ref(null)

const types = ref([
  {
    value: 'nationalId',
    title: t('general.national_id'),
  },
  {
    value: 'passport',
    title: t('general.Passport'),
  },
])


/******* methods **********/
const checkUser = async () => {
  loading.value = true

  console.log(isValidNationalID(nationalId.value))

  if (!checkIfEgyptPhoneNumber(mobile.value)) {
    loading.value = false

    return false
  }

  if (selectedType.value === 'nationalId' && !isValidNationalID(nationalId.value)) {
    return showToast(t('error.national_invalid'), { icon: 'error' })
  }

  if (selectedType.value === 'passport') {
    if (!isValidPassportID(passportID.value)) {
      return showToast(t('error.passport_invalid'), { icon: 'error' })
    }

    if (!isValidBirthdate(birthDate.value)) {
      return showToast(t('error.birth_date_invalid'), { icon: 'error' })
    }
  }

  try {

    let payload = {
      national_id: nationalId.value,
      mobile_number: mobile.value,
      source: 'agent',
    }

    const response = await UserStore.registerUser(payload)

    if (response.status) { 
      loading.value = false
      emit('userFound')
    }

  } catch (err) { 
    if(err.response.status == 422){
      loading.value = false
      setErrors(err.response.data.errors)
    }
  }
}

/********* computed **********/
const isBtnDisabled = computed(() => {
  if (selectedType.value === 'passport') {
    return !birthDate.value || !passportID.value || mobile.value === null
  } else if (selectedType.value === 'nationalId') {
    return !nationalId.value || mobile.value === null
  }
  
  return true
})
</script>

<template>
  <div class="check-user-component">
    <VForm
      ref="refDataVForm"
      class="form-horizontal"
      @submit.prevent="checkUser"
    >
      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
          <AppSelect
            v-model="selectedType"
            :items="types"
            class="input-field"
            :label="$t('general.type')"
            item-value="value"
            item-title="title"
          />
        </VCol>
        <VCol 
          v-if="selectedType === 'nationalId'"
          cols="12"
          sm="6" 
        >
          <AppTextField
            v-model="nationalId"
            prepend-inner-icon="tabler-id-badge"
            class="input-field"
            :label="$t('general.national_id')"
            type="text"
          />
        </VCol>

        <VCol 
          v-if="selectedType === 'passport'"
          cols="12"
          sm="6"
        >
          <AppTextField
            v-model="passportID"
            prepend-inner-icon="tabler-id-badge"
            class="input-field"
            :label="$t('general.Passport')"
            type="text"
          />
        </VCol>

        <VCol 
          v-if="selectedType === 'passport'"
          cols="12"
          sm="6"
        >
          <AppDateTimePicker
            v-model="birthDate"
            class="input-field"
            :label="$t('user.birth_date')"
            variant="outlined"
          />
        </VCol>
        
        <VCol 
          cols="12"
          sm="6"
        >
          <AppTextField
            v-model="mobile"
            class="input-field mobile-field"
            type="text"
            label="Mobile"
          >
            <template #prepend-inner>
              <img 
                :src="EgyptIcon" 
                alt="Custom Icon" 
                style="width: 20px; height: 20px; " 
              >
            </template>
          </AppTextField>
        </VCol>

        <VCol 
          class="d-flex flex-end"
          cols="12"
        >
          <VBtn
            :loading="loading"
            :disabled="isBtnDisabled"
            type="submit"
            size="small"
          >
            {{ $t("general.check_user") }}
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
