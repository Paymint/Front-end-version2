// useToastification.js
import { inject } from 'vue'
import { useToast as useToastification } from 'vue-toastification'

export function useToast() {
  const toast = useToastification()

  function showToast(message, options = {}) {
    const { icon, pauseOnHover, closeOnClick, ...toastOptions } = options

    const finalOptions = {
      pauseOnHover: pauseOnHover !== undefined ? pauseOnHover : false, // Set default value if not provided
      closeOnClick: pauseOnHover !== undefined ? pauseOnHover : false, // Set default value if not provided
      ...toastOptions,
    }

    if (icon) {
      const type = getIconType(icon)

      toast(message, {
        ...finalOptions,
        type,
      })
    } else {
      toast(message, finalOptions)
    }
  }

  function getIconType(icon) {
    switch (icon) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'default'
    default:
      return 'default'
    }
  }

  return {
    showToast,
  }
}

export function provideToast() {
  return {
    toast: useToast(),
  }
}

export function useInjectedToast() {
  return inject('toast')
}
