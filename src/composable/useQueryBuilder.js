import { computed } from 'vue'

export function builderQuery(params) {
  return computed(() => {
    const queryString = new URLSearchParams()
    for (const key in params) {
      if (params[key]) {
        queryString.append(key, params[key])
      }
    }

    return queryString.toString()
  })
}
