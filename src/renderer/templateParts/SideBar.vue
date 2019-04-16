<template>
  <div>
    
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
          <div class="pull-left image">
            <img
              src="../../renderer/assets/images/profile.png"
              class="img-circle"
              alt="User Image"
            >
          </div>
          <div class="pull-left info">
            <p>Alexander Pierce</p>
            <!-- Status -->
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>

        <!-- search form (Optional) -->
        <form
          action="#"
          method="get"
          class="sidebar-form"
        >
          <div class="input-group">
            <input
              type="text"
              name="q"
              class="form-control"
              placeholder="Search..."
            >
            <span class="input-group-btn">
              <button
                type="submit"
                name="search"
                id="search-btn"
                class="btn btn-flat"
              ><i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
        <!-- /.search form -->

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu" data-widget="tree">
          
          <li :class="{active: $route.name === 'dashboard' }">
            <router-link :to="{name: 'dashboard'}">
              <i class="fa fa-home"></i> <span>Dashboard</span>
            </router-link>
          </li>
         
          <li :class="{active: $route.name === 'sale_diary' }">
            <router-link :to="{name: 'sale_diary'}">
              <i class="fa fa-align-left"></i> <span>Venda Diária</span>
            </router-link>
          </li>

          <li>
            <router-link :to="{name: 'sale_report'}">
              <i class="fa fa-area-chart"></i> <span>Relatório de Vendas</span>
            </router-link>
          </li>

        </ul>
        <!-- /.sidebar-menu -->
      </section>
      <!-- /.sidebar -->

      

    </aside>

  </div>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

