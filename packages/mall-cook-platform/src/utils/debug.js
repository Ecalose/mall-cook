const isDevelopment = process.env.NODE_ENV !== 'production'

export function debugLog(...args) {
  if (isDevelopment && typeof console !== 'undefined') {
    console.log(...args)
  }
}

export default debugLog
