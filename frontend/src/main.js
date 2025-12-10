/**
 * ==== styles block ====
 */
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/main.css'
import 'azion-theme'
import './assets/icons/azionicons.scss'
import './assets/markdown.css'

/** ====================== */

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import { AuthService } from './services/auth'
import { getSuggestionsOptions } from './core/constants'

const getConfigDefaults = () => ({
  theme: import.meta.env.VITE_THEME || 'dark',
  serverUrl: {
    url: import.meta.env.VITE_BACKEND_COPILOT_ENDPOINT_TESTAGENTV3
  },
  suggestionsOptions: getSuggestionsOptions(),
  title: import.meta.env.VITE_TITLE || 'Security Agent + MCP Server',
  subTitle: import.meta.env.VITE_SUBTITLE || 'Make your Agent with MCP Server',
  isOpenByDefault: true,
  isMaximizedByDefault: true,
  previewText: import.meta.env.VITE_PREVIEW_TEXT || 'Hello',
  footerDisclaimer: import.meta.env.VITE_FOOTER_DISCLAIMER || '',
  clerkPublicKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  authMode: import.meta.env.undefined
})

const CONFIG_DEFAULT = getConfigDefaults()

document.documentElement.className = `azion azion-${CONFIG_DEFAULT.theme}`
document.title = CONFIG_DEFAULT.title || 'Copilot'

async function init() {
  const authService = new AuthService({
    authMode: CONFIG_DEFAULT.authMode,
    copilotBackend: CONFIG_DEFAULT.serverUrl.url,
    clerkPublicKey: CONFIG_DEFAULT.clerkPublicKey
  })

  try {
    const user = await authService.signIn()
    if (user) {
      mountMainApp()
    }
  } catch (error) {
    console.error('Authentication error:', error)
  }
}

function mountMainApp() {
  const app = createApp(App, CONFIG_DEFAULT)
  app.use(PrimeVue)
  app.directive('tooltip', Tooltip)
  app.use(ToastService)
  app.mount('#app')
}

// Add this to handle the redirect
if (window.location.hash.includes('__clerk_status=active')) {
  console.log('Detected Clerk redirect, reloading...')
  window.location.hash = ''
  window.location.reload()
} else {
  init()
}


