import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import AdminTable from "@/pages/AdminTable.vue";
import TableList from "@/pages/TableList.vue";
import StartProject from '@/pages/StartProject';
import StartProject2 from '@/pages/StartProject2';
import StartProject3 from '@/pages/StartProject3';
import StartProject4 from '@/pages/StartProject4';
import signIn from '@/pages/Auth/signIn';
import signUp from '@/pages/Auth/signUp';

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "adminTable",
        name: "Admin-Table",
        component: AdminTable
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "start-project",
        name: "Start-Project 1",
        component: StartProject
      },
      {
        path: "start-project/two",
        name: "Start-Project 2",
        component: StartProject2
      },
      {
        path: "start-project/three",
        name: "Start-Project 3",
        component: StartProject3
      },
      {
        path: "start-project/four",
        name: "Start-Project 4",
        component: StartProject4
      }
    ]
  },
  {
    path: '/signIn',
    name: 'Sign In',
    component: signIn
  },
  {
    path: '/signUp',
    name: 'Sign Up',
    component: signUp
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
