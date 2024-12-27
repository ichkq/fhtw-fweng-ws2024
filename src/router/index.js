import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import HomeView from '../views/HomeView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import ImprintView from '../views/ImprintView.vue';
import HelpView from '../views/HelpView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import EditUserProfileView from '../views/EditUserProfileView.vue';
import AdminDashboardView from '../views/AdminDashboardView.vue';
import NotFound from '@/components/organism/NotFound.vue';
import ProductsView from '@/views/ProductsView.vue';
import CartView from '@/views/CartView.vue';
import OrdersView from '@/views/OrdersView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationView,
  },
  {
    path: '/products/:categoryName',
    name: 'products',
    component: ProductsView,
  },
  {
    path: '/imprint',
    name: 'imprint',
    component: ImprintView,
  },
  {
    path: '/help',
    name: 'help',
    component: HelpView,
  },
  {
    path: '/profile', 
    name: 'profile',
    component: UserProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-profile/:id",
    name: "editUserProfile",
    component: EditUserProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardView,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView, // Added route for CartView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView,
    meta: { requiresAuth: true }, // Requires user authentication
  },
  {
      path: '/404', name: 'NotFound', component: NotFound
  },
  {
      path: '/:catchAll(.*)', redirect:'404'
  }  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    } 
  } else {
      next();
  }
});

export default router;
