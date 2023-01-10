import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds: number) {
	setInterval(callback, milliseconds);

	onDestroy(() => {
		// Fix the memory leak here
	});
}