import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

export function useGlobalHandleError(){
  const errors = ref([])

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  const displayErrors = () => {
    errors.value.forEach(error => {
      Toast.fire({
        icon: "error",
        title: error.message,
      })
    })
  }

  const setErrors = receivedErrors => {
    errors.value = receivedErrors
    displayErrors()
  }
    
  return {
    errors,
    setErrors,
  }
}
  