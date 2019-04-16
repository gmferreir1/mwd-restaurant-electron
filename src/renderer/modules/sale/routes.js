import Sale from "./Index.vue";
import Sale_Diary from "./saleDiary/pages/SaleDiary";
import Sale_Report from "./report/page/Report";

export default [
  {
    path: "/sale",
    name: "sale",
    component: Sale,
    children: [
      {
        path: "diary",
        name: "sale_diary",
        component: Sale_Diary
      },
      {
        path: "report",
        name: "sale_report",
        component: Sale_Report
      }
    ]
  }
];
