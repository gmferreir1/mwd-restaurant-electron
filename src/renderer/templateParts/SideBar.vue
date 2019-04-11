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
          <li class="header">HEADER</li>
          <li class="active">
            <a href="#"><i class="fa fa-align-left"></i> <span>Venda Diária</span></a>
          </li>
        </ul>
        <!-- /.sidebar-menu -->
      </section>
      <!-- /.sidebar -->

      <router-link :to="{name: 'systemAdmin_dashboard'}" class="setting" title="Administração do sistema">
        <i class="fa fa-cog" style="font-size: 20px;"></i>
      </router-link>

    </aside>

  </div>
</template>

<script>
export default {
  name: "SideBar"
}
</script>


<style scoped>
.setting {
  position: absolute;
  top: 93%;
  color: #ffffff;
  left: 15px;
}
</style>
