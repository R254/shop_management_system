import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const Sell = () => {
    const [message, setMessage] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate()

    const {id} = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
      const fetchProducts = async () => {
        await axios.get('http://localhost:3002/api/display/'+id)
        .then(res => {
          setName(res.data[0].name)
          setDescription(res.data[0].description)
          setQuantity(res.data[0].quantity)
        })
        .catch(err => console.log(err))
      }
      fetchProducts()
    }, [id])   

    const handleSell = async (e) => {
      e.preventDefault();
      await axios.put('http://localhost:3002/api/sell/'+name, {description,quantity})
      .then((res) => {
          if (res.data.Status === 'Sold') {
              setMessage(res.data.message)
              setState('Success')
              navigate('/sales')
            }
            else{
              setMessage(res.data.error)
              setState('error');
            }
      })
    }
  return (
    <>
        <form className="mt-3" onSubmit={handleSell}>
        {message && (<p className={state === 'Success' ? 'text-center text-success' : 'text-center text-danger'}>{message}</p>)}
        <div className="row mb-3">
          <div className="form-group col-md-4">
            <input name="name" type="text" className="form-control" placeholder="Product Name" 
            value={name}  disabled/>
          </div>
          <div className="form-group col-md-4">
            <input name="description" type="text" className="form-control" placeholder="Description" 
            value={description}  disabled/>
          </div>
          <div className="form-group col-md-4">
            <input name="quantity" type="text" className="form-control" value={quantity} onChange={e => setQuantity(e.target.value)} required/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </>
  )
}

export default Sell