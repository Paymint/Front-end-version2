<script setup>
import { useI18n } from 'vue-i18n'
import { avatarText } from '@core/utils/formatters'
import AgentDialog from '../selectAgent/new-dialog.vue'

/* composables */
import { useStatusVariant } from "@/composable/useStatusVariant"


/*** props ***/
const props = defineProps({
  companiesData: {
    type: Array,
  },
})

/* translation */
const { t } = useI18n()

/* StatusVariant */
const { resolveTransactionStatusVariant } = useStatusVariant()


/* const data */
const headers = [
  { field: 'name', title: `${t("reports.company_name")}` },
  { field: 'payee_count', title: `${t("general.payee_count")}` },
  { field: 'status', title: `${t("general.status")}` },
  { field: 'joined', title: `${t("general.joined_date")}` },
  { field: 'action', title: `${t("general.action")}` },

]


/* methods */
const EmitAgents = (data, i) => {
  props.companiesData.forEach((el, index) => {
    if(i === index) {
      el.sales = data
    }
  })
}
</script>

<template>
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
        v-for="(item,i) in props.companiesData"
        :key="i"
      >
        <td :style="{borderLeft: item.status == 1 ? '2px solid #28c76f': '2px solid #f00'}">
          <div class="d-flex align-center">
            <VAvatar
              size="34"
              :variant="!item.logo ? 'tonal' : undefined"
              class="me-3"
            >
              <VImg
                v-if="item.logo"
                :src="item.lgog"
              />
              <span v-else>{{ avatarText(item.logo) }}</span>
            </VAvatar>
            <div class="d-flex flex-column">
              <h6 class="text-base">
                <RouterLink
                  :to="{ name: 'admin-notification'}"
                  class="font-weight-medium user-list-name"
                  :style="{color: i % 2 === 0 ? '#28c76f': '#f00'}"
                >
                  {{ item.name }}
                </RouterLink>
              </h6>
            </div>
          </div>
        </td>
        <td>
          <IconBtn>
            <VIcon
              icon="tabler-eye"
              color="primary"
            />
            <VTooltip
              location="top"
              transition="scale-transition"
              activator="parent"
            >
              {{ item.sales }}
            </VTooltip>
          </IconBtn>
          <AgentDialog
            :row-id="i"
            @emit-agents="EmitAgents"
          />
        </td>
        <td>
          <VChip
            size="small"
            :color="resolveTransactionStatusVariant(item.transaction_status)"
            label
            class="text-capitalize"
          >
            <span v-if="item.transaction_status == 1">{{ $t("companies.active") }}</span>
            <span v-if="item.transaction_status == 2">{{ $t("general.Inactive") }}</span>
            <span v-if="item.transaction_status == 3">{{ $t("general.Dorment") }}</span>
            <span v-if="item.transaction_status == 4">{{ $t("companies.never_used") }}</span>
          </VChip>
        </td>
        <td>
          {{ item.joined }}
        </td>
        <td>
          <VBtn
            variant="tonal"
            size="small"
          >
            <span>{{ $t('general.Choose_Client') }}</span>
          </VBtn>
          <VBtn
            icon
            variant="text"
            size="small"
            class="ms-2"

            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="tabler-dots-vertical"
            />

            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'admin-notification'}">
                  <template #prepend>
                    <VIcon icon="tabler-eye" />
                  </template>

                  <VListItemTitle>View</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteUser(item.raw.id)">
                  <template #prepend>
                    <VIcon icon="tabler-trash" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
