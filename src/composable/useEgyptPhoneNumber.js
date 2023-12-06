// import { useI18n } from "vue-i18n"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

// const { t } = useI18n()
export function useEgyptPhoneNumber() {
  const isEgyptPhoneNumber = ref(false)

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  const  checkIfEgyptPhoneNumber = phoneNumber => {
    const egyptPattern = /^(\+201|01)[0125][0-9]{8}$/gm

    isEgyptPhoneNumber.value = egyptPattern.test(phoneNumber)

    if(!isEgyptPhoneNumber.value){
      Toast.fire({
        icon: "error",
        title: 'Phone is not correct',
      })
    }

    return isEgyptPhoneNumber.value
  }

  return { checkIfEgyptPhoneNumber }
}
