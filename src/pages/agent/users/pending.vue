<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import axios from "@axios"
import UserDataDialog from "@/views/agent/users/VerifyUser.vue"

const { t } = useI18n()

const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
  {
    title: t('general.users'),
    disabled: true,
  },
  {
    title: t('general.pending'),
    disabled: true,
  },
]

const url = process.env.VUE_APP_BASE_URL 

const headers = [
  { field: 'name_en', title: `${t("general.name_en")}` },
  { field: 'name_ar', title: `${t("general.name_ar")}` },
  { field: 'date_of_birth', title: `${t("user.birth_date")}` },
  { field: 'action', title: `${t("general.action")}` },
]

const title = ref(`${t("general.pending")}`)
const pendingList = ref([])
const itemData = ref([])
const isDialogVisible = ref(false)

const showData = data => {
  isDialogVisible.value = true
  itemData.value = data
}

const getPendingList = async () => {

  await axios.get(url + "list-pending").then(res => {

    if(res.data.status){
      pendingList.value = res.data.data
    }
  })
}

onMounted(() => {
  getPendingList()
})
</script>

<template>
  <div class="pending-users">
    <VRow class="mb-5">
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader 
          :items="items" 
          :title="title" 
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th
                v-for="(head,i) in headers"
                :key="i"
                class="text-uppercase"
              >
                {{ head.title }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item,i) in pendingList"
              :key="i"
            >
              <td>
                {{ item.profile && item.profile.name_en }}
              </td>
              <td>
                {{ item.profile && item.profile.name_ar }}
              </td>
              <td>
                {{ item.profile && item.profile.date_of_birth }}
              </td>
              <td>
                <VBtn 
                  variant="text"
                  @click="showData(item)"  
                >
                  <VIcon icon="tabler-eye" />  
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
        <UserDataDialog 
          v-model:isDialogVisible="isDialogVisible"
          :user-data="itemData" 
          type="verify"
        />
      </VCol>
    </VRow>
  </div>
</template>
