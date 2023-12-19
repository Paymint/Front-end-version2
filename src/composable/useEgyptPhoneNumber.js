// import { useI18n } from "vue-i18n"
import { useToast } from '@/composable/useToast'


// const { t } = useI18n()
export function useEgyptPhoneNumber() {
  const isEgyptPhoneNumber = ref(false)
  const { showToast } = useToast()

  const  checkIfEgyptPhoneNumber = phoneNumber => {
    const egyptPattern = /^(\+201|01)[0125][0-9]{8}$/gm

    isEgyptPhoneNumber.value = egyptPattern.test(phoneNumber)

    if(!isEgyptPhoneNumber.value){
      showToast('Phone is not correct', { icon: 'error' })
    }

    return isEgyptPhoneNumber.value
  }

  return { checkIfEgyptPhoneNumber }
}
