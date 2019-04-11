<template>
  <div>

    <div class="row">

      <div class="col-md-5 col-lg-3">
        <router-link
          :to="{name: 'systemAdmin_products'}"
          style="color: inherit"
        >
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="fa fa-list"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">CADASTRO DE PRODUTOS</span>
              <span class="info-box-number">{{ data_panel.total_products }}<small>QT</small></span>
            </div>
          </div>
        </router-link>
      </div>


    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../../../util/dateTime";

export default {
  name: "DashboardSystemAdmin",
  data() {
    return {
      data_panel: {}
    }
  },
  methods: {
    dateFormat,
    getData() {
      http.get("admin/dashboard")
        .then(results => {
          this.data_panel = results.data;
        }).catch(err => {})
    }
  },
  mounted() {    
    this.getData();
  }
}
</script>