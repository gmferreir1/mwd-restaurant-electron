<template>
  <div>
    <nav class="navbar navbar-static-top" role="navigation" style="height: 35px">
      <div style="float: left; color: #ffffff; font-size: 15px; font-weight: bold; margin-top: 8px; margin-left: 10px;">
        <span class="logo-mini">
          <span>MYWEBDAY</span> 
          <span style="font-weight: normal; font-size: 10px;">{{ $systemVersion }}</span>
        </span>
      </div>

      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
         
          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-gears"></i>
            </a>
            <ul class="dropdown-menu">
              <li class="user-footer">
                <div class="text-center">
                  
                  <router-link :to="{name: 'systemAdmin_dashboard'}" class="button btn btn-sm btn-danger">
                    Configuração do sistema
                  </router-link>
                  <a href="#" class="btn btn-primary pull-right btn-sm">Sair do sistema</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>