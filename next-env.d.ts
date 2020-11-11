/// <reference types="next" />
/// <reference types="next/types/global" />
export {}
declare global {
  interface Window {
    netlifyIdentity: Record<string, unknown>
  }
}
