<template>
  <div>
    <section class="content-header">
      <span
        class="text-breadcrumb"
        v-if="this.array_links.length"
      >{{ this.array_links[this.array_links.length - 1].name }}</span>

      <ol class="breadcrumb" v-if="array_links">
        <li
          v-for="(list, index) in this.array_links"
          :key="index"
          :class="{active: index === (array_links.length - 1)}"
        >
          <router-link
            class="active"
            v-if="index !== (array_links.length - 1)"
            :to="{name: list.link}"
          >
            <i class="fa fa-list-alt"></i>
            {{list.name}}
          </router-link>
          <span v-if="index === (array_links.length - 1)">{{list.name}}</span>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      array_links: []
    };
  },
  methods: {
    mountBreadcrumb() {
      const routeName = this.$route.name;

     
      if (routeName === "systemAdmin_dashboard") {
        this.array_links = [
          {
            name: "Painel de Administração",
            link: "systemAdmin_dashboard"
          }
        ];
      }

      if (routeName === "systemAdmin_products") {
        this.array_links = [
          {
            name: "Painel de Administração",
            link: "systemAdmin_dashboard"
          },
          {
            name: "Administração de Produtos",
            link: "systemAdmin_products"
          }
        ];
      }
    }
  },
  watch: {
    "$route.name"() {
      this.mountBreadcrumb();
    }
  },
  mounted() {
    this.mountBreadcrumb();
  }
};
</script>

<style scoped>
.text-breadcrumb {
  font-size: 13px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
