<template>
  <div>
    <panel :dataEdit="data_edit" @refreshProductsList="refresh = !refresh"/>
    <table-list-products @edit="data => data_edit = { data }" :refreshProductsList="refresh" />
  </div>
</template>

<script>
import Panel from "../components/Panel";
import TableListProducts from "../components/TableListProducts";

export default {
  name: "Products",
  components: { Panel, TableListProducts },
  data() {
    return {
      data_edit: {},
      refresh: false
    }
  }
};
</script>

