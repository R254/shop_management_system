import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AddExpense, AddProduct, Dashboard, Expense, Layout, Login, 
  NotFound, Products, Register, Sales, Sell, Selling } from './components'
const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout />,
      errorElement: <NotFound/>,
      children: [
        {
          path:'/dashboard',
          element: <Dashboard />
        },
        {
          path:'/products',
          element: <Products />
        },
        {
          path:'/addproduct',
          element: <AddProduct />
        },
        {
          path:'/selling',
          element: <Selling />
        },
        {
          path:'/expense',
          element: <Expense />
        },
        {
          path:'/addexpense',
          element: <AddExpense />
        },
        {
          path:'/sales',
          element: <Sales />
        },
        {
          path:'/sell',
          element: <Sell />
        },
      ]
    },
    {
      path:'/register',
      element: <Register/>,
      errorElement: <NotFound/>
    },
    {
      path:'/login',
      element: <Login/>,
      errorElement: <NotFound/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App