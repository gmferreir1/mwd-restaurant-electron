<template>
  <div>
    <div id="modalTerminationSale" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="CONCLUSÃO VENDA (FECHAMENTO CAIXA) "/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row" style="font-size: 20px; margin-top: 20px;" v-if="dataModal">
              <div class="col-md-4 text-center">
                <label>TOTAL VENDA</label>
                <p>R$ {{ moneyFormat(total_sale.total_sale_whitout_discount) }}</p>
              </div>
              <div class="col-md-4 text-center">
                <label>TOTAL DESCONTOS</label>
                <p class="total-discount">R$ {{ moneyFormat(total_sale.total_discount) }}</p>
              </div>
              <div class="col-md-4 text-center">
                <label>TOTAL FINAL</label>
                <p class="total-final">R$ {{ moneyFormat(total_sale.total_sale) }}</p>
              </div>
            </div>

            <div class="row" style="padding-left: 20px; margin-top: 30px;">
              <div class="col-md-5">
                <label>INFORME O TIPO DE PAGAMENTO</label>
                <select class="form-control" v-model="form.type_payment">
                  <option value="money">Dinheiro</option>
                  <option value="debit_card">Cartão Débito</option>
                  <option value="credit_card">Cartão Crédito</option>
                  <option value="ticker">Ticket</option>
                </select>
              </div>

              <div class="col-md-2 div-160">
                <label>TOTAL PAGO</label>
                <money type="text" class="form-control" id="total_pay" 
                  v-model="form.total_pay" :disabled="form.type_payment !== 'money'"
                  @keypress.enter.native="terminationSale"/>
              </div>

              <div class="col-md-2 div-160" v-if="form.type_payment === 'money' ">
                <label>TROCO</label>
                <money type="text" class="form-control" v-model="form.money_change" disabled/>
              </div>
            </div>

            <div class="row" style="padding-left: 20px; padding-top: 20px; padding-bottom: 10px;">
              <div class="col-md-12">

                <!-- loader -->
                <div class="loader pull-left" v-if="loading"></div>
                <!-- / loader -->

                <button class="button btn btn-default" @click="terminationSale" v-if="!loading" 
                  :disabled="blockTerminationSale">
                  <span class="fa fa-check"></span>
                  FINALIZAR VENDA
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from "../../../../components/ModalHeader";
import { moneyFormat } from "../../../../util/stringHelpers";
import alert from "../../../../mixins/systemAlert";

export default {
  name: "ModalTerminationSale",
  props: ["dataModal"],
  mixins: [ alert ],
  components: {
    ModalHeader
  },
  data() {
    return {
      loading: false,
      form: {
        type_payment: "money",
        total_pay: 0,
        money_change: 0
      },
      total_sale: {
        total_sale_whitout_discount: 0,
        total_discount: 0,
        total_sale: 0
      }
    };
  },
  methods: {
    moneyFormat,
    openModal() {
      $("#modalTerminationSale").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    calcMoneyChange() {
      const totalSale = this.dataModal.total_sale;
      const totalMoneyChange = this.form.total_pay - totalSale.total_sale;
      if (totalMoneyChange > 0) {
        this.form.money_change = moneyFormat(totalMoneyChange);
      } else {
        this.form.money_change = moneyFormat(0);
      }
    },
    terminationSale() {
      this.loading = true;
      const saleData = {
        products: this.dataModal.products,
        total_sale: this.total_sale,
        payment_data: this.form
      };

      http
        .post("sale/diary", saleData)
        .then(result => {
          this.closeModal();
          _notification.success("Venda finalizada com sucesso !");
          this.showAlert("Deseja imprimir o comprovante de venda ?");
          this.$bus.$emit("Sale/SaleDiary::cleanListSaleDiary");
        })
        .finally(() => setTimeout(() => this.loading = false, 300) );
    },
    closeModal() {
      $("#modalTerminationSale").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.form.total_pay = 0;
      this.total_sale = this.dataModal.total_sale;
      this.openModal();
      setTimeout(() => document.getElementById("total_pay").focus(), 300);
    },
    "form.total_pay"() {
      this.calcMoneyChange();
    },
    "form.type_payment"() {
      if (this.form.type_payment !== "money") {
        this.form.total_pay = this.total_sale.total_sale;
      }
    }
  },
  computed: {
    blockTerminationSale() {
      if (!this.form.total_pay || this.form.total_pay < this.total_sale.total_sale) {
        return true
      }
      return false;
    }
  }
};
</script>

<style scoped>
.total-final {
  color: green;
}

.total-discount {
  color: red;
}
</style>

