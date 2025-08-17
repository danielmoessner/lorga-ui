import { h } from "vue";
import FormGeneratorUpdateTest from "./app/FormGeneratorUpdateTest.vue";
import FormGenerator from "./app/FormGenerator.vue";
import ModalCreate from "./app/ModalCreate.vue";
import { RouteRecordRaw } from "vue-router";
import FormListTest from "./app/FormListTest.vue";
import TableGenerator from "./app/TableGenerator.vue";

export const routes: RouteRecordRaw[] = [
  { path: "", component: FormGeneratorUpdateTest },
  {
    path: "/modals/create",
    component: ModalCreate,
    meta: { name: "ModalCreate" },
  },
  {
    path: "/forms/generator",
    component: FormGenerator,
    meta: { name: "FormGenerator" },
  },
  {
    path: "/forms/list-input",
    component: FormListTest,
    meta: { name: "FormList" },
  },
  {
    path: "/tables/table",
    component: TableGenerator,
    meta: { name: "Table" },
  },
  { path: "/:pathMatch(.*)*", component: () => h("NotFound") },
];
