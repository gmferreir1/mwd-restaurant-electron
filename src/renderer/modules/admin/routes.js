import SystemAdmin from "./Index.vue";
import SystemAdmin_Dashboard from "./dashboard/pages/Dashboard";
import SystemAdmin_Products from "./products/pages/Products";


export default [
  {
    path: "/system-admin",
    name: "system_admin",
    component: SystemAdmin,
    children: [
      // dashboard
      {
        path: "dashboard",
        name: "systemAdmin_dashboard",
        component: SystemAdmin_Dashboard
      },
      // produtos
      {
        path: "products",
        name: "systemAdmin_products",
        component: SystemAdmin_Products
      }
    ]
  }
];
