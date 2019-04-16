<template>
  <div>
    <!--
    <div class="row">
      <div class="col-md-12">
        <p class="text-muted well well-sm no-shadow" style="margin-top: 10px;">
          Sistema na versão <code>{{ $systemVersion }}</code>
        </p>
      </div>
    </div>
    -->
    <div class="row">
      <div class="col-md-3">
        <div class="info-box">
          <span class="info-box-icon bg-green">
            <i class="fa fa-cart-plus"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Reltório de Vendas</span>
          </div>
          <!-- /.info-box-content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../util/bus";
export default {
  name: "Dashboard",
  data() {
    return {
      myDataVar: ""
    };
  },
  methods: {
    logout() {
      localStorage.clear();
    }
  },
  mounted() {
    this.$electron.ipcRenderer.on("logout", (event, data) => {
      this.logout();
    });
  }
};
</script>

<style scoped>
</style>