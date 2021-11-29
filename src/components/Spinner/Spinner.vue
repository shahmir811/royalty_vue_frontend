<template>
	<!-- <img src="@/assets/spinner.gif" class="style-img" alt="Loading..." /> -->
	<img :src="spinner" class="style-img" alt="Loading..." />
</template>

<script>
import spinner from '@/assets/spinner.gif';

export default {
	name: 'Spinner',
	data() {
		return { spinner };
	},
};
</script>

<style lang="scss">
.style-img {
	height: '200px';
	width: '200px';
	margin: 'auto';
	display: 'block';
}
</style>
