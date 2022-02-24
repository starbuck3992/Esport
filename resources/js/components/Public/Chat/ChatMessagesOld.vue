<template>
  <div class="min-h-0 flex-1 overflow-y-auto max-h-screen">
    <ul role="list" class="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
      <li
        v-for="item in messages"
        :key="item.id"
        :class="[item.self ? 'bg-green-900' : 'bg-blue-900', '']"
      >
        <time :datetime="item.timestamp">
          {{ localizeDateTime(item.timestamp) }}
        </time>
        <div
          class="mt-4 space-y-6 text-sm text-gray-800"
          v-html="item.message"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: false,
    },
  },
  setup() {
    function localizeDateTime(time) {
      let newTime = new Date(time);
      return newTime.toLocaleString();
    }
    return {
      localizeDateTime,
    };
  },
};
</script>
