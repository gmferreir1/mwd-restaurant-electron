<template>
  <div>
    <div class="breadcrumb">
      <section class="content-header">
        <span class="text-breadcrumb" v-if="this.array_links.length">{{ this.array_links[this.array_links.length - 1].name }}</span>

        <ol v-if="array_links" class="ol-breadcrumb">
          <li style="float: left; list-style: none; padding-left: 10px; font-size: 11px"
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

      if (routeName === "dashboard") {
        this.array_links = [
          {
            name: "Dashbooard",
            link: "dashboard"
          }
        ];
      }
      
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

      if (routeName === "sale_diary") {
        this.array_links = [
          {
            name: "Venda Diária",
            link: "sale_diary"
          }
        ];
      }
     
      if (routeName === "sale_report") {
        this.array_links = [
          {
            name: "Relatório de Vendas",
            link: "sale_report"
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
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
}

.breadcrumb {
  margin-bottom: 0px;
  background-color: #ffffff;
  height: 35px !important;
  padding-top: 5px;
  -webkit-box-shadow: 0px 0px 0px rgba(50, 50, 50, 0.77);
  -moz-box-shadow: 0px 0px 0px rgba(50, 50, 50, 0.77);
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.77);
}

.content-header {
  position: relative;
  padding: 0px;
}

.ol-breadcrumb {
  position: absolute; right: 10px; top: 5px; height: 25px !important; border:none !important;
}

.ol-breadcrumb > li + li:before {
  content: '>\00a0';
}

</style>
