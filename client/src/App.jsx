import { RouterProvider, createHashRouter } from 'react-router-dom';
import { AddExpense, AddProduct, AddUtilities, Dashboard, Edit, Expense, Layout, Login, 
  NotFound, Products, Register, Restock, Sales, Sell, Selling, Utilities } from './components'
const App = () => {
  const router = createHashRouter([
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
          path:'/restock/:id',
          element: <Restock />
        },
        {
          path:'/edit/:id',
          element: <Edit />
        },
        {
          path:'/sell/:id',
          element: <Sell />
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
          path:'/addexpense/:id',
          element: <AddExpense />
        },
        {
          path:'/sales',
          element: <Sales />
        },
        {
          path:'/utilities',
          element: <Utilities />
        },
        {
          path:'/addutilities',
          element: <AddUtilities />
        }
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