export const CONSTANTS = {
  SERVER: {
    DEFAULT: {
      url: '',
      conversation: '/chat/completions',
      feedback: '/feedback'
    }
  },
  MESSAGES: {
    SYSTEM: {
      ERROR: 'Sorry, something went wrong.',
      FEEDBACK: 'Thank you for your feedback.'
    }
  },
  STATUS: {
    MESSAGES: {
      RESPONDING: 'responding',
      ERROR: 'error',
      COMPLETED: 'completed',
      CANCELED: 'canceled'
    },
    FEEDBACK: {
      LIKE: 'like',
      DISLIKE: 'dislike',
      NEUTRAL: 'neutral'
    }
  },
  WINDOW_EVENT: {
    NAMESPACE: 'azionCopilot'
  },
  EVENTS: {
    MESSAGE: 'message',
    ERROR: 'error',
    CLEAR: 'clear',
    CANCEL: 'cancel',
    FEEDBACK: 'feedback',
    AUTH_REQUIRED: 'auth_required'
  }
}

export const getSuggestionsOptions = () => [
  {
    icon: 'pi pi-list',
    title: import.meta.env.VITE_SUGGESTION_1_TITLE || 'List the latest HTTP events for my application.',
    context: import.meta.env.VITE_SUGGESTION_1_CONTEXT || 'List the latest HTTP events for my application.'
  },
  {
    icon: 'pi pi-shield',
    title: import.meta.env.VITE_SUGGESTION_2_TITLE || 'List all my IP CIDR network lists.',
    context: import.meta.env.VITE_SUGGESTION_2_CONTEXT || 'List all my IP CIDR network lists.'
  },
  {
    icon: 'pi pi-plus-circle',
    title: import.meta.env.VITE_SUGGESTION_3_TITLE || 'Create a new network list named \'My IP Blocklist\' of type \'ip_cidr\' with the items \'192.168.1.1/32\' and \'10.0.0.0/8\'.',
    context: import.meta.env.VITE_SUGGESTION_3_CONTEXT || 'Create a new network list named \'My IP Blocklist\' of type \'ip_cidr\' with the items \'192.168.1.1/32\' and \'10.0.0.0/8\'.'
  },
  {
    icon: 'pi pi-search',
    title: import.meta.env.VITE_SUGGESTION_4_TITLE || 'Get network list 48334',
    context: import.meta.env.VITE_SUGGESTION_4_CONTEXT || 'Get network list 48334'
  },
  {
    icon: 'pi pi-check-circle',
    title: import.meta.env.VITE_SUGGESTION_5_TITLE || 'Check if IP 192.168.1.100 exists in network list 48334',
    context: import.meta.env.VITE_SUGGESTION_5_CONTEXT || 'Check if IP 192.168.1.100 exists in network list 48334'
  },
  {
    icon: 'pi pi-pencil',
    title: import.meta.env.VITE_SUGGESTION_6_TITLE || 'Add IP 192.168.1.200 to network list 48334',
    context: import.meta.env.VITE_SUGGESTION_6_CONTEXT || 'Add IP 192.168.1.200 to network list 48334'
  }
]
