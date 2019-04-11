<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-default">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-list-ul"></span>
              CONTROLE DE PRODUTOS CADASTRADOS NO SISTEMA ( <span style="font-weight: bold">{{ data_list.data.length }}</span> )
            </h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="padding-top: 0px;">

            <!-- loader -->
            <div class="loader" v-if="loading"></div>
            <!-- / loader -->

            <!-- not found component -->
            <div class="row" style="margin-top: 10px;" v-if="!loading && !data_list.data.length">
              <div class="col-md-6 col-md-offset-5">
                <not-found />
              </div>
            </div>
            <!-- / not found component -->

            <!-- table -->
            <div class="table-responsive tableFixHead" v-if="!loading && data_list.data.length">
              <table class="table table-condensed table-hover" style="margin-top: 5px;">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th class="text-center">Quantidade</th>
                    <th>Descrição</th>
                    <th>Valor Unitário</th>
                    <th> - </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, index) in data_list.data" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ list.code }}</td>
                    <td class="text-center">{{ list.quantity }}</td>
                    <td>{{ list.description }}</td>
                    <td> R$ {{ moneyFormat(list.value) }}</td>
                    <td>
                      <a href="#" @click.prevent="edit(list)" class="link-primary">
                        <span class="fa fa-pencil" style="font-size: 16px"></span>
                      </a>
                      <!--
                      <a href="#" @click.prevent="edit(list)" style="margin-left: 10px">
                        <span class="fa fa-trash" style="font-size: 16px; color: red"></span>
                      </a>
                      -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- / end table -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { moneyFormat } from "../../../../util/stringHelpers";
import NotFound from "../../../../components/NotFound";

export default {
  name: "TableListProducts",
  props: ["refreshProductsList"],
  components: { NotFound },
  data() {
    return {
      loading: true,
      data_list: {
        data: []
      }
    };
  },
  methods: {
    moneyFormat,
    getData() {
      http.get("product")
        .then(results => {
          this.data_list.data = results.data;
        }).catch(err => {})
        .finally(() => setTimeout(() => this.loading = false, 300))
    },
    edit(list) {
      this.$emit("edit", list);
    }
  },
  watch: {
    refreshProductsList() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>


