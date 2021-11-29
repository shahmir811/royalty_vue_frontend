<template>
	<div>
		<Navbar />
		<router-view></router-view>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import Navbar from './components/Navbar/Navbar.vue';

export default {
	name: 'App',
	components: {
		Navbar,
	},
};
</script>

<style lang="scss">
@import './styles/styles.scss';
</style>
