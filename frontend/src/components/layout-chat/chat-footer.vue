<template>
  <div
    class="bottom-0 chat-input flex sticky flex-col gap-2 text-center mx-auto md:max-w-3xl w-full surface-card"
  >
    <QuickActions 
      v-if="showQuickActions && chatWidget.suggestionsOptions"
      :actions="chatWidget.suggestionsOptions"
      @populateMessage="populateMessage"
    />
    <div class="flex w-full">
      <Textarea
        v-model="userMessage"
        autoResize
        rows="1"
        maxlength="16000"
        @keyup.enter.exact="sendChatMessage"
        :class="[
          'input-textarea align-content-center border-noround border-round-left  border-round-left-lg',
          isOverflowTextArea
        ]"
        @input="checkOverflow"
      />
      <div
        class="flex align-items-end pb-1 border-noround border-round-right p-inputnumber-button pr-3 border-none border-round-right-lg"
      >
        <PrimeButton
          v-if="!props.loading"
          severity="Primary"
          outlined
          icon="pi pi-fw pi-send"
          aria-label="send"
          @click="sendChatMessage"
        />
        <PrimeButton
          v-else
          severity="Primary"
          outlined
          icon="pi pi-stop"
          aria-label="send"
          @click="cancelMessage"
        />
      </div>
    </div>
    <div>
      <small class="text-xs text-color-secondary font-normal leading-5 text-center mb-2 mx-2">
        {{ chatWidget.footerDisclaimer || chatDisclaimerText }}
      </small>
    </div>
  </div>
</template>

<script setup>
  import Textarea from 'primevue/textarea'
  import PrimeButton from 'primevue/button'
  import QuickActions from '../quick-actions.vue'
  import { ref, inject, computed } from 'vue'

  const props = defineProps({
    sendMessage: {
      type: Function,
      required: true
    },
    cancelMessage: {
      type: Function,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasMessages: {
      type: Boolean,
      default: false
    }
  })

  const chatWidget = inject('chatWidget')

  const chatDisclaimerText = ref(
    `${chatWidget.title || 'Copilot'} may make mistakes. Consider verifying important information.`
  )

  const isOverflowTextArea = ref('')
  
  // Show quick actions when there are messages in the conversation
  const showQuickActions = computed(() => props.hasMessages)

  const checkOverflow = (event) => {
    const textareaElement = event?.target
    if (!textareaElement) return

    const lineHeight = parseInt(window.getComputedStyle(textareaElement).lineHeight)
    const scrollHeight = textareaElement.scrollHeight

    isOverflowTextArea.value = Math.floor(scrollHeight / lineHeight) > 5 ? 'overflow-auto' : ''
  }

  const userMessage = ref('')

  const sendChatMessage = async () => {
    const message = userMessage.value.trim()
    if (message && !props.loading) {
      userMessage.value = ''
      await props.sendMessage(message)
    }
  }

  const populateMessage = (actionText) => {
    if (actionText) {
      userMessage.value = actionText
    }
  }
</script>

<style scoped lang="css">
  .custom-scroll::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scroll::-webkit-scrollbar-thumb {
    background-color: var(--surface-500);
    border-radius: 4px;
  }

  .input-textarea {
    width: 100%;
    min-height: 2.75rem;
    max-height: 12.5rem;
    padding: 0.5rem 0 0.5rem 1rem;
    border: none;
    box-shadow: none;
  }
</style>
