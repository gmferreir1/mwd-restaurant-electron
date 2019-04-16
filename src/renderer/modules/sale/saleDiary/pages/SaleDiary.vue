<template>
  <div>
    <panel-form-sale />
    <table-sale-diary @openModalTerminationSale="data => data_modal_termination_data = data" />
    <modal-termination-sale :dataModal="data_modal_termination_data" />
  </div>
</template>

<script>
import PanelFormSale from "../components/PanelFormSale";
import TableSaleDiary from "../components/TableSaleDiary";
import ModalTerminationSale from "../components/ModalTerminationSale";

export default {
  name: "SaleDiary",
  components: { PanelFormSale, TableSaleDiary, ModalTerminationSale },
  data() {
    return {
      data_modal_termination_data: {}
    }
  },
  methods: {

  }
}
</script>
