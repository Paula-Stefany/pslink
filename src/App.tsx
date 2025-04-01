import { createBrowserRouter } from 'react-router'

import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Login } from  './pages/login';
import { Networks } from './pages/networks'
import { NotFoundPage } from './pages/notfound'

import { Private } from './router/Private'
// Aqui que preciso ter a proteção da rota

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: "/admin",
    element: <Private> <Admin/> </Private>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin/social",
    element: <Private> <Networks/> </Private>
  },
  {
    path: "*",
    element: <NotFoundPage/>
  }
])

export { router }
