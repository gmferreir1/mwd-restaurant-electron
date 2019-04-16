<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-default">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-list-alt"></span>
              <span>FORMULÁRIO DE PRODUTOS</span>
            </h3>
          </div>
          <!-- /.box-header -->

          <div class="box-body" style="padding-top: 0px;">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-140">
                <label>Código</label>
                <input type="text" class="form-control input-sm has-warning" v-model="form.code" 
                  @keypress.enter="setFocus('quantity')"
                  ref="code" :disabled="form.id">
                 <div class="error">{{ validation.firstError('form.code') }}</div>
              </div>
             
              <div class="col-md-2 div-140">
                <label>Quantidade</label>
                <input type="text" class="form-control input-sm has-warning" 
                  v-model="form.quantity"
                  @keypress.enter="setFocus('description')"
                  ref="quantity">
                 <div class="error">{{ validation.firstError('form.quantity') }}</div>
              </div>

              <div class="col-md-5">
                <label>Descrição</label>
                <input type="text" class="form-control input-sm has-warning" 
                  v-model="form.description"
                  @keypress.enter="setFocus('value')"
                  ref="description">
                <div class="error">{{ validation.firstError('form.description') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Valor Unitário</label>
                <money class="form-control input-sm has-warning" 
                  v-model="form.value"
                  @keypress.enter.native="submitForm"
                  id="value"/>
                <div class="error">{{ validation.firstError('form.value') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button class="button btn btn-default btn-sm" @click="cleanForm">Limpar Dados</button>
                <button class="button btn btn-primary btn-sm" @click="submitForm">Salvar Dados</button>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <required />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Required from "../../../../components/Required";
import validate from "../mixins/rules-validator";

export default {
  name: "Panel",
  props: ["dataEdit"],
  mixins: [ validate ],
  components: { Required },
  data() {
    return {
      form: {
        code: "",
        quantity: null,
        description: "",
        value: 0
      }
    };
  },
  methods: {
    setFocus(field) {
      if (field === "value") {
        document.getElementById("value").focus();
      } else {
        this.$refs[field].focus();
      }
    },
    create() {
      this.$bus.$emit("openLoading");
      http.post("product", this.form)
        .then(result => {
          _notification.success();
          this.$emit("refreshProductsList");
          this.cleanForm();
        })
        .catch(err => {})
        .finally(() => setTimeout(() => this.$bus.$emit("closeLoading"), 300))
    },
    edit(data) {
      const dataForEdit = Object.assign({}, data);
      dataForEdit.description = dataForEdit.description.toUpperCase();
      this.form = dataForEdit;
    },
    update() {
      this.$bus.$emit("openLoading");
      http.put(`product/${this.form.id}`, this.form)
        .then(result => {
          _notification.success();
          this.$emit("refreshProductsList");
          this.cleanForm();
        })
        .catch(err => {})
        .finally(() => setTimeout(() => this.$bus.$emit("closeLoading"), 300))
    },
    cleanForm() {
      this.form = {
        code: "",
        quantity: null,
        description: "",
        value: 0
      };

      this.validation.reset();
    }
  },
  watch: {
    dataEdit() {
      this.edit(this.dataEdit.data);
    }
  }
};
</script>




