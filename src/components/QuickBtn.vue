<script setup>
const { to, from } = defineProps(['to', 'from']);
const emits = defineEmits(['change']);
</script>
<template>
    <button
        class="flex-1 min-w-max flex items-center px-4 py-2 shadow-lg shadow-[#0008] border border-gray-900 rounded-lg"
        @click="emits('change', from, to)"
    >
        <img
            :src="`src/assets/${ to.toLowerCase() }.svg`"
            :alt="`${ from } to ${ to }`"
            width="15"
            height="15"
        >
        <span class="flex-1 text-center ml-2 whitespace-nowrap">
            {{ from }} to {{ to }}
        </span>
    </button>
</template>