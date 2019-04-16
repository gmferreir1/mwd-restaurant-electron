<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-default">
          <div class="box-header with-border" style="padding-top: 3px">
            
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-list-ul"></span>
              CONTROLE DE PRODUTOS DA VENDA ATUAL ( <span style="font-weight: bold">{{ data_list.data.length }}</span> )
              <div style="float: right; margin-left: 50px; with: 500px">
                <div style="float: left">
                  <span style="font-size: 11px">VENDA</span>
                  R$ {{ moneyFormat(total_data.total_sale_whitout_discount) }} 
                </div>
                
                <div style="float: left; margin-left: 20px; color: red">
                  <span style="font-size: 11px">DESCONTO(S)</span>
                  R$ {{ moneyFormat(total_data.total_discount) }} 
                </div>
               
                <div style="float: left; margin-left: 20px;">
                  <span> = </span>
                </div>

                 <div style="float: left; margin-left: 20px;">
                  <span style="font-size: 15px">VENDA TOTAL</span>
                  R$ {{ moneyFormat(total_data.total_sale) }} 
                </div>
              </div>
            </h3>
            
            <div class="pull-right">
              <button class="button btn btn-default"
              @click="$emit('openModalTerminationSale', {products: data_list.data, total_sale: total_data})"
              :disabled="!total_data.total_sale">
                <span class="fa fa-check"></span>
                Finalizar Venda
              </button>
              
              <button class="button btn btn-danger" :disabled="!total_data.total_sale" @click="cancelSale">
                <span class="fa fa-trash"></span>
                Cancelar Venda
              </button>
            </div>

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
                    <th>Descrição</th>
                    <th>Valor Unitário</th>
                    <th class="text-center">Quantidade</th>
                    <th>Desconto</th>
                    <th>Total</th>
                    <th>  </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, index) in data_list.data" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ list.product_code }}</td>
                    <td>{{ list.product_description }}</td>
                    <td> R$ {{ moneyFormat(list.unit_value) }}</td>
                    <td class="text-center">{{ list.quantity }}</td>
                    <td :class="{ discount: list.discount > 0 }"> R$ {{ moneyFormat(list.discount) }}</td>
                    <td> R$ {{ moneyFormat(getTotal(list.quantity, list.unit_value, list.discount)) }}</td>
                    <td>
                      <a href="#" @click.prevent="remove(index)" style="margin-left: 10px">
                        <span class="fa fa-trash" style="font-size: 16px; color: red"></span>
                      </a>
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

import { mapState, mapActions } from "vuex";
import { moneyFormat } from "../../../../util/stringHelpers";
import NotFound from "../../../../components/NotFound";
import alert from "../../../../mixins/systemAlert";

export default {
  name: "TableListProducts",
  props: ["refreshProductsList"],
  mixins: [ alert ],
  components: { NotFound },
  data() {
    return {
      loading: false,
      data_list: {
        data: []
      },
      total_data: {
        total_sale_whitout_discount: 0,
        total_sale: 0,
        total_discount: 0
      }
    };
  },
  methods: {
    ...mapActions("saleDiary", ["addNewProducts", "cleanProducts"]),
    moneyFormat,
    getTotal(quantity, value, discount) {
      let total = 0;
      if (discount) {
        total = parseFloat(( (quantity * value) - discount ).toFixed(2));
      } else {
        total = parseFloat(( (quantity * value) ).toFixed(2));
      }
      return total;
    },
    calculateTotalSale() {
      this.total_data.total_sale = 0;
      this.total_data.total_sale_whitout_discount = 0;
      this.total_data.total_discount = 0;
      this.data_list.data.forEach(element => {
        this.total_data.total_sale_whitout_discount += this.getTotal(element.quantity, element.unit_value, null);
        this.total_data.total_sale += this.getTotal(element.quantity, element.unit_value, element.discount);
        this.total_data.total_discount += element.discount;
      });
    },
    remove(index) {
      const productsArray = this.data_list.data;
      productsArray.splice(index, 1);
      this.addNewProducts(productsArray);
    },
    /**
     * Chama a confirmação de cancelamento da venda
     */
    cancelSale() {
      this.showAlert("Tem certeza que deseja cancelar a venda ?");
    },
    /**
     * Cancela a venda
     */
    confirmAlert() {
      this.cleanSale();
    },
    cleanSale() {
      this.data_list.data = [];
      this.total_data = {
        total_sale_whitout_discount: 0,
        total_sale: 0,
        total_discount: 0
      }

      this.cleanProducts();
    }
  },
  computed: {
    ...mapState("saleDiary", ["products_sale"])
  },
  watch: {
    products_sale() {
      this.data_list.data = this.products_sale;
      this.calculateTotalSale();
    }
  },
  mounted() {
    this.$bus.$on("Sale/SaleDiary::cleanListSaleDiary", () => {
      this.cleanSale();
    })
  }
};
</script>

<style scoped>
  .discount {
    color: red
  }
</style>



