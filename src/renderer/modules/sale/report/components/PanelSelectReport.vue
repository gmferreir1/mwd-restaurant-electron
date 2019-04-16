<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-default">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-line-chart"></span>
              <span>RELATÓRIO DE VENDAS</span>
            </h3>
          </div>
          <!-- /.box-header -->

          <div class="box-body" style="padding-top: 0px;">
            <div class="row">
              <div class="col-md-4">
                <label>Informe o Relatório</label>
                <select class="form-control">
                  <option value="report_sale">Relatório de Vendas</option>
                  <option value="report_products">Relatório de Produtos</option>
                </select>
              </div>
              <div class="col-md-2 div-160">
                <label>Data Inicial</label>
                <date-picker class="form-control" />
              </div>
              <div class="col-md-2 div-160">
                <label>Data Inicial</label>
                <date-picker class="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "../../../../components/DatePicker";

export default {
  name: "PanelSelectReport",
  components: { DatePicker }
};
</script>

