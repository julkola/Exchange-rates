import { inject } from 'vue';
import { Currencies } from '../types';

export const currencies = inject("currencies") as Ref<Currencies>;
