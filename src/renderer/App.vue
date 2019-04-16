<template>
  <div id="app" class="wrapper">
    <!-- modal spinner -->
    <modal-spinner/>
    <!-- / modal spinner -->

    <!-- Main Header -->
    <header class="main-header">
      <!-- Logo 
      <a v-show="!hide_components" href="#" @click.prevent class="logo">
       
        <span class="logo-mini">
          <b>M</b>WD
        </span>
        
        <span class="logo-lg">
          <b>Admin</b>LTE
        </span>
      </a>

       Header Navbar -->

      <!-- navBar -->
      <nav-bar v-show="!hide_components" />
      <!-- navBar-->
    </header>

    <!-- sideBar -->
    <side-bar v-show="!hide_components"/>
    <!-- / sideBar -->

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" :style="styleObject">
     
      <!-- Content Header (Page header) -->
      <breadcrumb v-show="!hide_components"/>
      <!-- Content Header (Page header) -->

      <!-- Main content -->
      <section class="content container-fluid">
        <router-view/>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- footer 
    <template-footer v-show="!hide_components"/>
     / footer -->

    <!-- Control Sidebar 
    <control-side-bar v-if="$route.name != 'auth'" />
    

    <div class="control-sidebar-bg"></div>
    -->
  </div>
  <!-- ./wrapper -->
</template>

<script>
import NavBar from "./templateParts/NavBar";
import SideBar from "./templateParts/SideBar";
import ControlSideBar from "./templateParts/ControlSideBar";
import TemplateFooter from "./templateParts/TemplateFooter";
import ModalSpinner from "./components/ModalSpinner";
import Breadcrumb from "./templateParts/Breadcrumb";

export default {
  components: { NavBar, SideBar, ControlSideBar, TemplateFooter, ModalSpinner, Breadcrumb },
  data() {
    return {
      styleObject: {
        "margin-left": "0px !important"
      },
      hide_components: true
    };
  },
  watch: {
    "$route.name"() {
      if (this.$route.name != 'auth') {
        
        this.hide_components = false;
        this.styleObject = {
          "margin-left": "50px !important",
          //"min-height": "950px !important"
        };

      } else {
        this.styleObject = {
          "margin-left": "0px !important"
        };
        this.hide_components = true;
      }
    }
  },
  mounted() {
    setTimeout(() => this.$electron.ipcRenderer.send('init'), 5000);

    if (this.$route.name !== "auth") {

      this.styleObject = {
        "margin-left": "50px !important"
      };

      this.hide_components = false;
    } else {
      this.hide_components = true;
    }

  this.$electron.ipcRenderer.on('clearLocalStorage', (event, data) => {
    window.localStorage.clear();
  })

    process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;
  }
};
</script>

<style>
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../../node_modules/font-awesome/css/font-awesome.css";
@import "../renderer/assets/css/adminLTE/AdminLTE.css";
@import "../renderer/assets/css/adminLTE/skins/skin-blue.css";
@import "../renderer/assets/css/style.css";
@import "../renderer/assets/css/spinner.css";
</style>

