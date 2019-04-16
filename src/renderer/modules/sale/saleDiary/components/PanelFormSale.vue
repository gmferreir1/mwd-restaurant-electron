<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-default">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-calendar-check-o"></span>
              <span>VENDA DIÁRIA DE PRODUTOS</span>
            </h3>
          </div>
          <!-- /.box-header -->

          <div class="row" style="padding: 10px" v-if="block_sale">
            <div class="col-md-12">
              <div class="alert alert-danger">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4>
                  <i class="icon fa fa-warning"></i> Alerta!
                </h4>Nenhum produto cadastrado na base do sistema. Para iniciar a venda, primeiro cadastre os produtos para a venda.
              </div>
            </div>
          </div>

          <div class="box-body" style="padding-top: 0px;">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-160">
                <label>Código Produto</label>
                <input type="text" class="form-control has-warning" v-model="form.product_code" ref="product_code"
                  @keypress.enter="getProduct">
              </div>

              <div class="col-md-4">
                <label>Descrição do Produto</label>
                <input
                  type="text"
                  class="form-control inpur-sm"
                  disabled
                  v-model="form.product_description"
                >
              </div>

              <div class="col-md-2 div-140">
                <label>Valor Unitário</label>
                <money class="form-control" v-model="form.unit_value" disabled/>
              </div>

              <div class="col-md-2 div-140">
                <label>Quantidade</label>
                <input type="text" class="form-control" v-model="form.quantity" 
                  ref="quantity" @keypress.enter="setFocus('discount')">
              </div>
              <div class="col-md-2 div-140">
                <label>Desconto</label>
                <money class="form-control" v-model="form.discount" id="discount" @keypress.enter.native="insertProduct"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button class="button btn btn-danger" :disabled="block_sale" @click="insertProduct">
                  <span class="fa fa-check"></span>
                  Inserir Produto
                </button>

                <button class="button btn btn-default" @click="cleanForm" :disabled="block_sale">
                  <span class="fa fa-exclamation-circle"></span>
                  Abrir Caixa / Nova Venda
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
import { mapActions } from "vuex";
export default {
  name: "PanelFormSale",
  data() {
    return {
      form: {
        product_code: "",
        product_description: "",
        unit_value: 0,
        quantity: "",
        discount: 0
      },
      block_sale: false,
      products: []
    };
  },
  methods: {
    ...mapActions("saleDiary", ["registerProduct"]),
    getAllProducts() {
      http
        .get("sale/diary/query/get-all-products")
        .then(results => {
          if (!results.data.length) {
            _notification.error("Nenhum produto cadastrado no sistema, venda não sera permitida");
            this.block_sale = true;
          } else {
            this.products = results.data;
            this.block_sale = false;
          }
        })
        .catch(err => {})
        .finally(() => setTimeout(() => this.$bus.$emit("closeLoading"), 300));
    },
    getProduct() {
      if (!this.form.product_code) return;
      const productCode = this.form.product_code;
      const product = _.find(this.products, value => value.code === this.form.product_code);
      if (!product) {
        _notification.warning(`Produto não localizado com o código ${this.form.product_code.toUpperCase()}`, 350);
        return;
      }

      this.form.product_code = product.code.toUpperCase();
      this.form.product_description = product.description.toUpperCase();
      this.form.unit_value = product.value;
      this.setFocus("quantity");
    },
    setFocus(field) {
      if (field === "discount") {
        setTimeout(() => document.getElementById("discount").focus(), 100);
        return;
      }
      setTimeout(() => this.$refs[field].focus(), 100);
    },
    insertProduct() {
      if (!this.form.quantity) {
        _notification.error("Informe a quantidade de venda do produto", 350);
        this.setFocus("quantity");
        return;
      }
      const checkQuantity = Number.isInteger(Number(this.form.quantity));
      if (!checkQuantity) {
        _notification.error("Quantidade informada não é válida");
        this.setFocus("quantity");
        return;
      }
      this.registerProduct(this.form)
        .then(() => {
          setTimeout(() =>  this.cleanForm(), 100);
          this.setFocus("product_code");
        }).catch(err => _notification.error(err))
    },
    cleanForm() {
      this.form = {
        product_code: "",
        product_description: "",
        unit_value: 0,
        quantity: "",
        discount: 0
      };
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getAllProducts();
  }
};
</script>

