<script lang="ts">
	import { onMount } from 'svelte';

	// Start values
	export let config: any;

	export let width: number = 500;
	export let hight: number = 500;

	export let minFrame: number = config.minFrame;
	export let maxFrame: number = config.maxFrame;

	export let columnsNumbers: number = config.columnsNumbers;
	export let rowsNumbers: number = config.rowsNumbers;

	export let fps: number = 5;

	export let src: string = config.src;

	export let startAnimation: string = config.start;

	// Current values
	let currentFrame: number = 0;

	let currentX: number = 0;
	let currentY: number = 0;

	let currentAnimationData: {
		minFrame: number;
		maxFrame: number;
		isAnimationLoop: boolean;
		nextAnimation: string;
	} = {
		minFrame: 0,
		maxFrame: 0,
		isAnimationLoop: true,
		nextAnimation: ''
	};

	// Functions
	const setCurrentAnimationData = (animationName: string) => {
		let animationData = config.animationList[animationName];

		currentAnimationData.minFrame = animationData.startFrame;
		currentAnimationData.maxFrame = animationData.endFrame;

		currentAnimationData.isAnimationLoop = animationData.loop;

		currentAnimationData.nextAnimation = animationData.nextAnimation;
	};

	const setNextAnimation = (name?: string) => {
		currentAnimationData.isAnimationLoop = false;
		if (name) {
			setCurrentAnimationData(name);
		} else {
			setCurrentAnimationData(currentAnimationData.nextAnimation);
		}
	};

	// start
	onMount(() => {
		setCurrentAnimationData(startAnimation);
	});

	// update
	$: setTimeout(() => {
		if (!currentAnimationData.isAnimationLoop) {
			setCurrentAnimationData(currentAnimationData.nextAnimation);
		}

		currentFrame++;

		console.log(currentFrame);
		console.log(1000 / fps);

		currentX = currentFrame % columnsNumbers;
		currentY = Math.floor(currentFrame / columnsNumbers);

		if (currentFrame >= currentAnimationData.maxFrame) {
			currentFrame = currentAnimationData.minFrame;
		}
	}, 1000 / fps);

	$: currentY = Math.floor(currentFrame / columnsNumbers);
	// $: console.log(currentY);

	$: console.log(currentAnimationData);
</script>

<main>
	<!-- <img src="/idle.png" alt="" /> -->
	<div style="width: {width}px; height: {hight}px;">
		<img
			src="/idle.png"
			alt=""
			style="top: calc(-{hight}px * {currentY}); left: calc(-{width}px * {currentX});"
		/>
	</div>

	<button on:click={() => setNextAnimation()}>Next Animation</button>
</main>

<style>
	main {
		/* aspect-ratio: 1 / 1; */
		/* width: 500px; */

		/* background: #ddd; */
	}

	div {
		image-rendering: pixelated;
		position: relative;
		/* aspect-ratio: 1/1; */
		overflow: hidden;
		border: solid;

		/* transform: translateX(500px); */
	}

	img {
		position: absolute;
		width: calc(500px * 8);
	}
</style>
