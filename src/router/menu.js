/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const menu = [
  {
    path: '/permission',
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/permission/menu'),
        name: 'menuPermission',
        meta: {
          title: 'menuPermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'rolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'userPermission',
        meta: {
          title: 'userPermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
      // {
      //   path: 'page',
      //   component: () => import('@/views/permission/page'),
      //   name: 'PagePermission',
      //   meta: {
      //     title: 'pagePermission',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },
      // {
      //   path: 'directive',
      //   component: () => import('@/views/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: 'directivePermission'
      //     // if do not set roles, means: this page does not require permission
      //   }
      // }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
