<script setup lang="ts">
const { time, size } = defineProps<{
  time?: number,
  size?: number
}>();

const styles = {
  ...(time && {'--animation-time': `${time}ms`}),
  ...(size && {
      '--dot-size': `${size}rem`,
      '--margin': `${size*5/3}rem`
    }
  ),
}
</script>
<template>
  <Transition name="loader" appear >
      <div
        :style="{ ...styles }"
        class="dot-container absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group"
      >
          <div class="-ml-10 dot first-dot rounded-full bg-gradient-to-br from-teal-500 to-lime-500 m-2 shadow-lg scale-0"></div>
          <div class="dot rounded-full bg-gradient-to-br from-teal-500 to-lime-500 m-2 shadow-lg "></div>
          <div class="dot rounded-full bg-gradient-to-br from-teal-500 to-lime-500 m-2 shadow-lg  "></div>
          <div class="dot last-dot rounded-full bg-gradient-to-br from-teal-500 to-lime-500 m-2 shadow-lg"></div>
      </div>
  </Transition>
</template>
<style>
.dot-container {
  --animation-time: 1500ms;
  --dot-size: 1.5rem;
  --margin: calc(var(--dot-size) + 1rem);
}
.dot {
  width: var(--dot-size);
  height: var(--dot-size);
  animation: var(--animation-time) 0ms infinite forwards dots;
}
.first-dot {
  margin-left: calc(0 - var(--margin));
  animation: var(--animation-time) 0ms infinite forwards firstdot;
}
.last-dot {
  animation: var(--animation-time) 0ms infinite forwards lastdot;
}
@keyframes dots {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(var(--margin));
  }
}
@keyframes firstdot {
  0% {
    transform:translateX(0) scale(0) ;
  }
  100% {
    transform: translateX(var(--margin)) scale(100%);
  }
}
@keyframes lastdot {
  0% {
    transform: translateX(0) scale(100%);
  }
  100% {
    transform: translateX(var(--margin)) scale(0);
  }
}

</style>