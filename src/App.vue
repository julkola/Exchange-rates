<script setup lang="ts">
import { Ref, onMounted, provide, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Data, Currencies } from './types';

import Input from './components/Input.vue';
import Pros from './components/Pros.vue';
import NavHeader from './components/NavHeader.vue';
import Loader from './components/Loader.vue'

import fetchCurrencies from './composables/fetchCurrencies';
import fetchRate from './composables/fetchRate';

const rate: Ref<number | null> = ref(null);
const fee = ref(0);
const currencies: Ref<Currencies> = ref(null);
const pending: Ref< 'send' | 'get' | '' > = ref('');

const data: Data = reactive({
  send: 'USD',
  get: 'EUR',
  send_amount: 100,
  get_amount: null,
})

provide("currencies", currencies);
provide("data", data);
provide("pending", pending);

const route = useRoute();

function calculate(value: number) {
  return Math.floor(value * 100) / 100;
}

watch(
  () => route.query,
  async ({ send, get, send_amount, get_amount }) => {
    pending.value = send_amount ? 'get' : get_amount ? 'send' : "";

    data.send = send?.toString() ?? "EUR";
    data.get = get?.toString() ?? "USD";

    rate.value = await fetchRate(data.send,  data.get);
    
    if (!send_amount && !get_amount) {
      data.send_amount = 100;
    } else {
      data.send_amount = +(send_amount ?? calculate(+get_amount! / rate.value));
    }
    
    data.get_amount = +(get_amount ?? calculate(+data.send_amount * rate.value));

    pending.value = '';
  },
  { immediate: false }
)
watch(() => pending, ()=>console.log('p: ', pending.value))

onMounted(async () => {
  currencies.value = await fetchCurrencies();
})

</script>
<template>
  <NavHeader class=" max-w-[1350px] mx-auto"/>
  <main v-if="currencies" class="md:flex flex-wrap max-w-[1350px] mx-auto mt-10">
    <div class="flex-1 ">
      <Pros/>
    </div>
    <div class="flex-1">
      <form method="get" class="p-6 flex flex-col bg-transparent shadow-xl shadow-[#0008] border border-gray-900 rounded-lg">
        <h2 class="text-center mb-6">
          Save up to 50% on foreign exchange rates
        </h2>
        <Input
          :name="'get'"
        >
          Recipient gets:
        </Input>
        <span>
          <b class="mr-2">
            x
          </b>
          {{ rate }} guaranteed rate for 5 min
        </span>
        <span>
          <b class="mr-2">
            +
          </b>
          {{ fee.toFixed(2) }} fee
        </span>
        <Input
          :name="'send'"
        >
          You send:
        </Input>
      </form>
    </div>
  </main>
  <Loader v-else />
</template>