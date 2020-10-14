
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'chat', component: () => import('pages/chat.vue') },
      { path: 'geo', component: () => import('pages/geo.vue') },
      { path: 'funciones', component: () => import('pages/funciones.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
