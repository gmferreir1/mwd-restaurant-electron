import Vue from 'vue'
import Router from 'vue-router'
import routesSystem from './routes/routes'
import systemAdmin from "./modules/admin/routes";
import sale from "./modules/sale/routes";

const checkIsLogged = require('./util/checkIsLogged')

Vue.use(Router)


const baseRoutes = []
const routes = baseRoutes.concat(routesSystem, systemAdmin, sale);

const router = new Router({
  routes
})

// protected route
router.beforeEach((to, from, next) => {
  
  

  if (to.name != 'auth' && checkIsLogged.isLogged()) {
    next()
  }
  else if (to.name === 'auth') {
    next()
  } else {
    next({path: '/auth'});
  }

})

router.afterEach((to, from) => {
  if (from.name === "auth") {
    setTimeout(() => window.location.reload());
    //window.location.href = "#/redirect";
  }
})

export default router
