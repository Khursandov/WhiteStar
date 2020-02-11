import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import AdminTable from "@/pages/AdminTable.vue";
import Icons from "@/pages/Icons.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import StartProject from '@/pages/StartProject';
import signIn from '../pages/Auth/signIn';
import signUp from '../pages/Auth/signUp';

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
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "adminTable",
        name: "Admin-Table",
        component: AdminTable
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "start-project",
        name: "Start-Project",
        component: StartProject
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
