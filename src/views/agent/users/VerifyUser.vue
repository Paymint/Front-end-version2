<script setup>
import PinCode from "@/components/Pin.vue"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/store/agent/useUserStore"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

const props = defineProps({
  userData: {
    type: Array,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'setNewStep'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const { t } = useI18n()
const userStore = useUserStore()
const isPinDialogVisible = ref(false)
const token = JSON.parse(localStorage.getItem("userData")).verification_token


// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 2000,
//   timerProgressBar: true,
// })


const verifyData = async data => {

  let credentials = {
    mobile_number: mobile_number.value,
    code: data,
    token: token,
  }

  try {

    const response = await userStore.verifyUser(credentials)

    if(response.status){
      Swal.fire({
        title: response.data.message,
        icon: "success",
      })
    }
    
  } catch(e) { 
    Swal.fire({
      title: e.response.message,
      icon: "error",
    })
  }

}

const verifyUserData = () => {
  isPinDialogVisible.value = true
}
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    persistent
    scroll-strategy="none"
    max-width="600"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <!-- Dialog Content -->
    <VCard class="pt-5 user-data">
      <VCardTitle>
        <h3 class="card-data-header">
          Personal Details
        </h3>
      </VCardTitle>
      <VCardText class="card-body">
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('general.name_en') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile.name_en }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('general.name_ar') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile.name_ar }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.birth_date') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile.date_of_birth }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.address') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile.address }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.gender') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile.gender }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.religion') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile.religion }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.marital_status') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile.marital_status }}</p>
          </VCol>  
        </VRow>
      </VCardText>

      <VCardTitle>
        <h3 class="card-data-header">
          Natioanl ID:  
        </h3>
      </VCardTitle>
      <VCardText class="card-body">
        <VRow>
          <VCol cols="3">
            <h5>ID Type:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.user_identity.id_type }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>ID Number:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.user_identity.id_number }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>Expiry Date::</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.user_identity.expiration_date }}</p>
          </VCol>  
        </VRow>
        <!-- Natioanl id images -->
        <VRow>
          <VCol cols="3">
            <h5>National ID Images</h5>
          </VCol>
          <VCol cols="9">
            <div class="national-images">
              <img :src="props.userData.profile.front_id_image">  
              <img :src="props.userData.profile.back_id_image">  
              <img :src="props.userData.profile.selfie_image">  
            </div>
          </VCol>  
        </VRow>
      </VCardText>

      <VCardActions class="d-flex justify-center my-5">
        <VBtn 
          variant="flat" 
          @click="verifyUserData"
        >
          Verify User  
        </VBtn>
        <VBtn 
          variant="flat" 
          color="error"
        >
          Reject  
        </VBtn>
      </VCardActions>
    </VCard>
    <PinCode 
      v-model:isDialogVisible="isPinDialogVisible" 
      @is-verified="verifyData"
    />
  </VDialog>
</template>
