import axios from "axios"
import { useEffect, useState } from "react"

const Expense = () => {
  const [expense, setExpense] = useState([])


  useEffect(() => {
    const fetchExpense = async () => {
      await axios.get('http://localhost:3002/api/expense')
      .then(response => {
        setExpense(response.data)
      })
      .catch()
    }
    fetchExpense()
  }, [])

  let cost_p_item = 0
  let total_expense = 0
  
  return (
    <>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">Purpose</th>
            <th scope="col">Qty/Units</th>
            <th scope="col">Cost per Unit</th>
            <th scope="col">Cost per Item</th>
          </tr>
        </thead>
        <tbody>
          {
            expense.map((item) => {
              cost_p_item = item.buying * item.quantity
              total_expense += cost_p_item
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.category}</td>
                  <td>{ item.name }</td>
                  <td>{ item.description }</td>
                  <td>{ item.purpose }</td>
                  <td>{ item.quantity}</td>
                  <td>{ item.buying }</td>
                  <td>{ cost_p_item }</td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={7}>Total Expense</th>
            <th>{total_expense}</th>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default Expense