<script setup lang="ts">
import { Ref, computed, inject, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import { Currencies, Data } from '../types';
import Loader from './Loader.vue';

const { name } = defineProps<{
    name: string,
}>();

const data = inject("data") as Data;
const amount = ref(data[`${name}_amount`]);
const currentCurrency = ref(data[name]);

const currencies = inject("currencies") as Ref<Currencies>;
const currentCurrencySymbol = computed(() => currencies?.value?.get(currentCurrency.value)?.symbol ?? "");

watch(() => data[`${name}_amount`], ()=> {
    amount.value = data[`${name}_amount`];
})
watch(() => data[name], ()=> {
    currentCurrency.value = data[name];
})

const isDropdownOpen = ref(false);

const router = useRouter();

function onCurrencyChange (value) {
    currentCurrency.value = value;
    onChange(name);
}

function onChange (name: string) {
    const query = { 
        send_amount: null,
        get_amount: null
    };
    query[name] = currentCurrency.value,
    query[`${name}_amount`] = amount.value,

    router.push({
        path: '/',
        query: query
    })
}

const currentlyPending = inject("pending") as Ref<'send' | 'get' | ''>;
const loading = computed(() => name === currentlyPending.value);

</script>
<template>
    <label :for="`${name}-value`">
        <slot></slot>
    </label>
    <div class="relative flex items-center shadow-inner shadow-[#0008] border border-gray-900 rounded-lg">
        <span class="left-4 absolute">
            {{ currentCurrencySymbol }}
        </span>
        <div class="relative flex-1 overflow-hidden rounded-lg">
            <input
                class="w-full min-w-0 p-4 pl-14 bg-transparent border-none outline-none"
                type="text"
                :id="`${name}-value`"
                inputmode="decimal"
                v-model.lazy="amount"
                @change="onChange(name)"
            >
            <Loader v-show="loading" :size="0.75"/>
        </div>
        <div class="relative">
            <button
                type="button"
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center p-4 after:rounded-lg after:absolute after:bg-indigo-500 after:opacity-0 hover:after:opacity-10 after:inset-2 after:-z-10 after:duration-200 after:transition-opacity"
            >
                <img
                    :src="`src/assets/${ currentCurrency.toLowerCase() }.svg`"
                    width="15"
                    height="15"
                    aria-hidden="true"
                >
                <span class="flex-1 mx-2">
                    {{ currentCurrency }}
                </span>
                <img
                    src="src/assets/down.svg"
                    class="transition-transform duration-100"
                    :class=" isDropdownOpen ? 'rotate-180' : ''"
                    width="15"
                    height="15"
                    aria-hidden="true"
                >
            </button>
            <div
                class="absolute top-full right-0 max-h-48 w-max overflow-y-auto z-50 flex flex-col p-4 bg-dark shadow-lg shadow-[#0008] border border-gray-900 rounded-lg"
                :class="isDropdownOpen ? '' : 'hidden' "
                @change="isDropdownOpen = !isDropdownOpen"
            >
                <div
                    class="relative mb-2 last:mb-0"
                    v-for="[symbol, _] in currencies"
                >
                    <input
                        type="radio"
                        class="peer opacity-0 absolute"
                        :name="name"
                        :id="`${name}-${symbol}`"
                        :value="currentCurrency"
                        @change="onCurrencyChange(symbol)"
                    >
                    <label
                        :for="`${name}-${symbol}`"
                        class="relative peer-checked:after:opacity-20 flex cursor-pointer px-3 py-2 after:rounded-lg after:absolute after:inset-0 after:-z-10 after:bg-indigo-500 after:opacity-0 hover:after:opacity-10 after:duration-200 after:transition-opacity"
                    >
                        <img
                            :src="`src/assets/${ symbol.toLowerCase() }.svg`"
                            width="15"
                            height="15"
                            aria-hidden="true"
                        >
                        <span class="ml-2">
                            {{ symbol }}
                        </span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>