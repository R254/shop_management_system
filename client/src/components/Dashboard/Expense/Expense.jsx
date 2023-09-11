import { Link } from "react-router-dom"

const Expense = () => {
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
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>0.0</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>0.0</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>0.0</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>Total Expense</th>
            <th>0.0</th>
          </tr>
        </tfoot>
      </table>
      <Link to='/addexpense' className="btn btn-primary">Add Expense</Link>
    </>
  )
}

export default Expense