<script setup lang="ts">
import { useRouter } from 'vue-router';
import QuickBtn from './QuickBtn.vue';

const popularExchanges = [
  {
    from: 'USD',
    to: 'CAD'
  },
  {
    from: 'USD',
    to: 'GBP'
  },
  {
    from: 'USD',
    to: 'AUD'
  },
  {
    from: 'USD',
    to: 'EUR'
  }
]

const router = useRouter();
function onChange (send: string, get: string) {
  const query = {
    send: send,
    get: get,
    send_amount: null,
    get_amount: 100
  };

  router.push({
    path: '/',
    query: query
  })
}
</script>
<template>
  <header class="md:flex flex-wrap">
    <span class="flex-1 md:min-w-[675px] py-8 font-semibold text-2xl text-indigo-50">
      Complete Global Coverage
    </span>
    <nav class="flex-1 max-w-full py-8 overflow-x-auto scroll-x md:min-w-[675px] flex gap-4 text-xs">
      <QuickBtn
        v-for="exchange in popularExchanges"
        :to="exchange.to"
        :from="exchange.from"
        @change="onChange"
      />
    </nav>
  </header>
</template>