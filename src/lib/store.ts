import { writable } from "svelte/store";

export let isUltraMode = writable(false);
export let isMenuOpen = writable(false);
export let headerHeight = writable(0);
