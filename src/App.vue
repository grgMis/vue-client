<template>
  <div>
		<component :is="layout">
				<router-view></router-view>
		</component>
	</div>	
</template>

<script>
import AdminLayout from './layouts/AdminLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

export default {
	components: {
		AdminLayout,
		EmptyLayout
	},
	computed: {
		layout() {
			return (this.$route.meta.layout || 'admin') + '-layout'
		}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menubar {
	background: red;
}

</style>
