<template>
  <div>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import AdminLayout from "./layouts/AdminLayout.vue";
import DispatcherLayout from "./layouts/DispatcherLayout.vue";
import OperatorLayout from './layouts/OperatorLayout.vue';
import EmptyLayout from "./layouts/EmptyLayout.vue";

export default {
  components: {
    AdminLayout,
    EmptyLayout,
    DispatcherLayout,
		OperatorLayout
  },
  computed: {
    layout() {
			if (this.$route.meta.layout === 'empty') {
				return this.$route.meta.layout + '-layout';
			}
			if (this.$route.meta.layout === 'admin') {
				return this.$route.meta.layout + '-layout';
			}
			if (this.$route.meta.layout === 'operator') {
				return this.$route.meta.layout + '-layout';
			}
			if (this.$route.meta.layout === 'dispatcher') {
				return this.$route.meta.layout + '-layout';
			}
    },
  },
};
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
