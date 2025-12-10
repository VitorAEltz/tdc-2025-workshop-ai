<template>
  <div class="quick-actions-wrapper">
    <div class="quick-actions-slider" ref="slider">
      <div class="quick-actions-track">
        <button
          v-for="(action, index) in categorizedActions"
          :key="index"
          @click="handleActionClick(action)"
          class="quick-action-card"
          :class="{ 'suggested': action.category === 'suggested' }"
        >
          <span v-if="action.category === 'suggested'" class="sparkle-icon">✨</span>
          <i v-else :class="action.icon" class="action-icon"></i>
          <span class="action-text">{{ action.label }}</span>
        </button>
      </div>
    </div>
    <button 
      v-if="showLeftArrow"
      @click="scrollLeft"
      class="scroll-arrow arrow-left"
      aria-label="Scroll left"
    >
      <i class="pi pi-chevron-left"></i>
    </button>
    <button 
      v-if="showRightArrow"
      @click="scrollRight"
      class="scroll-arrow arrow-right"
      aria-label="Scroll right"
    >
      <i class="pi pi-chevron-right"></i>
    </button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['populateMessage'])

const props = defineProps({
  actions: {
    type: Array,
    default: () => []
  },
  maxVisible: {
    type: Number,
    default: 10
  }
})

const slider = ref(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(true)

const categorizedActions = computed(() => {
  // Create categorized actions based on the suggestions
  const categories = [
    { label: 'Suggested', icon: '✨', category: 'suggested', context: 'List the latest HTTP events' },
    { label: 'Network Lists', icon: 'pi pi-shield', category: 'lists', context: 'List all my IP CIDR network lists' },
    { label: 'HTTP Events', icon: 'pi pi-list', category: 'events', context: 'List the latest HTTP events for my application' },
    { label: 'Create List', icon: 'pi pi-plus-circle', category: 'create', context: 'Create a new network list' },
    { label: 'Check IP', icon: 'pi pi-search', category: 'check', context: 'Check if an IP exists in a network list' },
    { label: 'Update List', icon: 'pi pi-pencil', category: 'update', context: 'Add IP to network list' }
  ]
  
  // If we have custom actions from props, use those; otherwise use defaults
  if (props.actions && props.actions.length > 0) {
    return props.actions.slice(0, props.maxVisible).map((action, index) => ({
      label: getActionLabel(action.title),
      icon: action.icon || 'pi pi-circle',
      category: index === 0 ? 'suggested' : 'action',
      context: action.context || action.title
    }))
  }
  
  return categories.slice(0, props.maxVisible)
})

const getActionLabel = (title) => {
  // Create shorter labels from the full titles
  if (title.includes('HTTP events')) return 'List the latest HTTP Events'
  if (title.includes('network lists')) return 'List all my Network Lists'
  if (title.includes('Create a new')) return 'Create Network List'
  if (title.includes('Get network')) return 'Get a Block Network List'
  if (title.includes('Check if IP')) return 'Check if IP is in a list'
  if (title.includes('Add IP')) return 'Update Network List'
  
  // For other cases, truncate if too long
  const maxLength = 20
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...'
  }
  return title
}

const handleActionClick = (action) => {
  emit('populateMessage', action.context)
}

const checkScrollButtons = () => {
  if (!slider.value) return
  
  const element = slider.value
  showLeftArrow.value = element.scrollLeft > 0
  showRightArrow.value = element.scrollLeft < (element.scrollWidth - element.clientWidth - 10)
}

const scrollLeft = () => {
  if (!slider.value) return
  slider.value.scrollBy({ left: -200, behavior: 'smooth' })
}

const scrollRight = () => {
  if (!slider.value) return
  slider.value.scrollBy({ left: 200, behavior: 'smooth' })
}

onMounted(() => {
  if (slider.value) {
    slider.value.addEventListener('scroll', checkScrollButtons)
    checkScrollButtons()
  }
})

onUnmounted(() => {
  if (slider.value) {
    slider.value.removeEventListener('scroll', checkScrollButtons)
  }
})
</script>

<style scoped>
.quick-actions-wrapper {
  position: relative;
  width: 100%;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.quick-actions-slider {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 0 1rem;
  margin: 0 2rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.quick-actions-slider::-webkit-scrollbar {
  display: none;
}

.quick-actions-track {
  display: flex;
  gap: 0.75rem;
  padding: 0.25rem 0;
  width: max-content;
}

.quick-action-card {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  outline: none;
  min-width: fit-content;
  flex-shrink: 0;
}

.quick-action-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.quick-action-card:active {
  transform: translateY(0);
  background: rgba(255, 255, 255, 0.08);
}

.action-icon {
  font-size: 0.875rem;
  opacity: 0.8;
}

.sparkle-icon {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
}

.action-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
}

.quick-action-card.suggested {
  background: rgba(243, 101, 43, 0.1);
  border-color: rgba(243, 101, 43, 0.3);
}

.quick-action-card.suggested:hover {
  background: rgba(243, 101, 43, 0.15);
  border-color: rgba(243, 101, 43, 0.4);
}

/* Scroll arrows */
.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  outline: none;
}

.scroll-arrow:hover {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.arrow-left {
  left: 0.25rem;
}

.arrow-right {
  right: 0.25rem;
}

.scroll-arrow i {
  font-size: 0.75rem;
}

/* Light theme adjustments */
.azion-light .quick-actions-wrapper {
  border-top-color: var(--surface-200);
}

.azion-light .quick-action-card {
  background: var(--surface-50);
  border-color: var(--surface-200);
  color: var(--text-color);
}

.azion-light .quick-action-card:hover {
  background: var(--surface-100);
  border-color: var(--surface-300);
}

.azion-light .quick-action-card.suggested {
  background: rgba(243, 101, 43, 0.05);
  border-color: rgba(243, 101, 43, 0.2);
}

.azion-light .quick-action-card.suggested:hover {
  background: rgba(243, 101, 43, 0.1);
  border-color: rgba(243, 101, 43, 0.3);
}

.azion-light .scroll-arrow {
  background: white;
  border-color: var(--surface-200);
  color: var(--text-color);
}

.azion-light .scroll-arrow:hover {
  background: var(--surface-100);
  border-color: var(--surface-300);
}
</style>
