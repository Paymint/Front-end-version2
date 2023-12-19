import { useToast } from '@/composable/useToast'

export function useGlobalHandleError(){
  const errors = ref([])

  const { showToast } = useToast()

  const displayErrors = () => {
    errors.value.forEach(error => {
      showToast(error.message, { icon: 'error' })
    })
  }

  const setErrors = receivedErrors => {
    errors.value = receivedErrors
    displayErrors()
  }
    
  return {
    setErrors,
  }
}
  