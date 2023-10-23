import { useEffect, useState } from "react"
import axios from 'axios'

const Dashboard = () => {
  const [stocks, setStocks] = useState([])
  const [sales, setSales] = useState([])
  const [expense, setExpense] = useState([])
  const [mpesa, setMpesa] = useState([])
  const [funds, setFunds] = useState([])
  const [utilities, setUtilities] = useState([])

  useEffect(() => {
    const fetchStocks = async () => {
      await axios.get('http://localhost:3002/api/products?q')
      .then(response => {
        setStocks(response.data)
      })
      .catch()
    }
    fetchStocks()

    const fetchSales = async () => {
      await axios.get('http://localhost:3002/api/grandsales')
      .then(response => {
        setSales(response.data)
      })
      .catch()
    }
    fetchSales()

    const fetchExpense = async () => {
      await axios.get('http://localhost:3002/api/expense?q')
      .then(response => {
        setExpense(response.data)
      })
      .catch()
    }
    fetchExpense()

    const fetchMpesa = async () => {
      await axios.get('http://localhost:3002/api/mpesa')
      .then(response => {
        setMpesa(response.data)
      })
    }
    fetchMpesa()

    const fetchFunds = async () => {
      await axios.get('http://localhost:3002/api/funds')
      .then(response => {
        setFunds(response.data)
      })
    }
    fetchFunds()

    const fetchUtilities = async () => {
      await axios.get(`http://localhost:3002/api/utilities?q`)
      .then(response => {
        setUtilities(response.data)
      })
    }
    fetchUtilities()

  }, [])

  let stocks_total = 0
  let sales_total = 0
  let stock_sold = 0
  let expense_total = 0
  let float = 0
  let commission = 0
  let cash = 0
  let till = 0
  let total_funds = 0
  let total_utilities = 0

  stocks.map((stock) => {
    const buying = stock.buying * stock.quantity;
    stocks_total += buying
  })

  sales.map((item) => {
    const volume_sold = item.selling * item.quantity
    const volume_stock_sold = item.buying * item.quantity
    stock_sold += volume_stock_sold
    sales_total += volume_sold
  })

  expense.map((item) => {
    const buying = item.buying * item.quantity
    expense_total += buying;
  })

  mpesa.map((item) => {
    commission = item.commission
    float = item.mpesa_float
  })

  funds.map((item) => {
    cash = item.cash
    till = item.till
    total_funds = cash + till
  })

  utilities.map((item) => {
    total_utilities += item.amount
  })

  total_utilities = Math.round(total_utilities * 100) / 100
  expense_total = Math.round(expense_total * 100) / 100
  stocks_total = Math.round(stocks_total * 100) / 100
  const gross_profit = Math.round((sales_total - stock_sold) * 100) / 100
  let net_profit = (gross_profit + commission) - (expense_total + total_utilities)
  net_profit = Math.round(net_profit * 100) / 100
  const shop_value = Math.round((net_profit + stocks_total + total_funds + float) * 100) / 100
  const mpesandshop = total_funds + commission + float

  return (
    <>
      <div className="row p-3">
        <div className="col-4">
          <div className="card border-light">
            <div className="card-header">Stocks</div>
            <div className="card-body">
              <h5 className="card-title">Ksh { stocks_total }</h5>
              <p className="card-text">This is the total stocks at the end of September.</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-light">
            <div className="card-header">Sales</div>
            <div className="card-body">
              <h5 className="card-title">Ksh {sales_total }</h5>
              <p className="card-text">This is the total sales with profit during the month of September.</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-light">
            <div className="card-header">Expense</div>
            <div className="card-body">
              <h5 className="card-title">Ksh { expense_total }</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-4">
          <div className="card border-light">
            <div className="card-header">Profit</div>
            <div className="card-body">
              <h5 className="card-title">Ksh { net_profit }</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-light">
            <div className="card-header">Value of the Shop</div>
            <div className="card-body">
              <h5 className="card-title">Ksh { shop_value }</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-light">
            <div className="card-header">Mpesa & Shop Funds</div>
            <div className="card-body">
              <h5 className="card-title">Ksh { mpesandshop }</h5>
              <p>Mpesa Float: {float}</p>
              <p>Mpesa Commission: { commission }</p>
              <p>Cash At Hand: { cash }</p>
              <p>Cash On Till: { till }</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-4">
          <div className="card border-light">
            <div className="card-header">Utilities</div>
            <div className="card-body">
              <h5 className="card-title">Ksh { total_utilities }</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard