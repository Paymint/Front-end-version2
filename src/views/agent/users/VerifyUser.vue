<script setup>
import PinCode from "@/components/Pin.vue"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/store/agent/useUserStore"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { onMounted } from "vue"

const props = defineProps({
  userData: {
    type: Array,
  },
  cardData: {
    type: Array,
  },
  branch: {
    type: Array,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'setNewStep'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const { t } = useI18n()
const userStore = useUserStore()

const branches = ref([])
const isPinDialogVisible = ref(false)
const token = JSON.parse(localStorage.getItem("userData")).verification_token




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

const getBranches = async () => {

  try {

    const response = await userStore.getBranches()

    if (response.errors.length < 1) {
      branches.value = response.data
    }
  } catch(e) {
    console.log(e.response)
  }
}

const verifyUserData = () => {
  isPinDialogVisible.value = true
}

const activateCard = () => {
  isPinDialogVisible.value = true
}

const deActivateCard = () => {
  isPinDialogVisible.value = true
}

const closeCard = () => {
  isPinDialogVisible.value = true
}

const changeBranch = () => {
  isPinDialogVisible.value = true
}

onMounted(() => {
  if(props.type === "change-branch"){
    getBranches()
  }
})
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
            <p>{{ props.userData.profile && props.userData.profile.name_en }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('general.name_ar') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile && props.userData.profile.name_ar }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.birth_date') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile && props.userData.profile.date_of_birth }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.address') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile && props.userData.profile.address }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.gender') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile && props.userData.profile.gender }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.religion') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile && props.userData.profile.religion }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>{{ $t('user.marital_status') }}:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.profile && props.userData.profile.marital_status }}</p>
          </VCol>  
        </VRow>
      </VCardText>

      <VCardTitle v-if="props.type == 'change-branch'">
        <h3 class="card-data-header">
          Branch Details:  
        </h3>
      </VCardTitle>
      <VCardText 
        v-if="props.type == 'change-branch'"
        class="card-body"
      >
        <VRow>
          <VCol cols="3">
            <h5>Branch:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.branch && props.branch.name_en }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>Join Date:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.branch && props.branch.created_at }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="12">
            <VSelect
              :items="branches"
              label="Choose Branch"
              item-title="name_en"
              item-value="id"
            />
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
            <p>{{ props.userData.user_identity && props.userData.user_identity.id_type }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>ID Number:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.user_identity && props.userData.user_identity.id_number }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>Expiry Date:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.userData.user_identity && props.userData.user_identity.expiration_date }}</p>
          </VCol>  
        </VRow>
        <!-- Natioanl id images -->
        <VRow>
          <VCol cols="3">
            <h5>National ID Images</h5>
          </VCol>
          <VCol cols="9">
            <div class="national-images">
              <img :src="props.userData.profile && props.userData.profile.front_id_image">  
              <img :src="props.userData.profile && props.userData.profile.back_id_image">  
              <img :src="props.userData.profile && props.userData.profile.selfie_image">  
            </div>
          </VCol>  
        </VRow>
      </VCardText>

      <VCardTitle v-if="props.type !== 'verify'">
        <h3 class="card-data-header">
          Card Details:  
        </h3>
      </VCardTitle>
      <VCardText 
        v-if="props.type !== 'verify'"
        class="card-body"
      >
        <VRow>
          <VCol cols="3">
            <h5>Card ID:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.cardData && props.cardData.card_id }}</p>
          </VCol>  
        </VRow>
        <VRow>
          <VCol cols="3">
            <h5>Card Status:</h5>
          </VCol>
          <VCol cols="9">
            <p>{{ props.cardData && props.cardData.card_status }}</p>
          </VCol>  
        </VRow>
      </VCardText>

      <VCardActions 
        v-if="props.type === 'verify'"  
        class="d-flex justify-center my-5" 
      >
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
      <VCardActions 
        v-if="props.type === 'activate'" 
        class="d-flex justify-center my-5"
      >
        <VBtn  
          variant="flat" 
          @click="activateCard"
        >
          Activate Card  
        </VBtn>
        <VBtn 
          variant="flat" 
          color="error"
        >
          Cancel  
        </VBtn>
      </VCardActions>
      <VCardActions 
        v-if="props.type === 'deactivate'" 
        class="d-flex justify-center my-5"
      >
        <VBtn 
          variant="flat" 
          @click="deActivateCard"
        >
          Deactivate Card 
        </VBtn>
        <VBtn 
          variant="flat" 
          color="error"
        >
          Cancel  
        </VBtn>
      </VCardActions>
      <VCardActions 
        v-if="props.type === 'close-card'" 
        class="d-flex justify-center my-5"
      >
        <VBtn 
          variant="flat" 
          @click="closeCard"
        >
          Close Card 
        </VBtn>
        <VBtn 
          variant="flat" 
          color="error"
        >
          Cancel  
        </VBtn>
      </VCardActions>
      <VCardActions 
        v-if="props.type === 'change-branch'" 
        class="d-flex justify-center my-5"
      >
        <VBtn 
          variant="flat" 
          @click="changeBranch"
        >
          {{ $t('change_branch') }} 
        </VBtn>
        <VBtn 
          variant="flat" 
          color="error"
        >
          Cancel  
        </VBtn>
      </VCardActions>
    </VCard>
    <PinCode 
      v-model:isDialogVisible="isPinDialogVisible" 
      pin-type="check"
      @is-verified="verifyData"
    />
  </VDialog>
</template>
