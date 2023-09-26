const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const salt = 10
require('dotenv').config()

const port = 3002

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST","GET","PUT"],
    credentials: true
}))

// Connection to mysql database
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB_NAME
})

// Checking connection to the database
conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to MYSQL!')
})

// Creating port to listen to
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

// Creating Users in the database
app.post('/register', (req, res) => {
    const sql = "SELECT * FROM users WHERE email=?"
    conn.query(sql,[req.body.email], (err, results) => {
        if (err) {
            console.log(err)
            return res.json({error: "Error handling registration"})
        }
        if (results.length > 0) {
            return res.json({error: 'The email used already exists! Please sign in!'})
        } else {
            const query = 'INSERT INTO users (`firstname`,`lastname`,`email`,`role`,`password`) VALUES(?)';
            bcryptjs.hash(req.body.password.toString(), salt, (err, hash) => {
                if (err) return res.json({error: "Error hashing the password"})
                const values = [ req.body.firstname, req.body.lastname, req.body.email, req.body.role, hash]

                conn.query(query, [values], (err, results) => {
                    if (err) return res.json({error: "Error inserting user details to the database"})
                    return res.json({Status: "Success"})
                })
            })
        }
    })
})

// Fuction for verifying user authentication
const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({error: "You are not authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.json({error: "Invalid token"});
        } else {
            req.name = decoded.name;
            next();
        }
        })
    }
}

// Checking is a user has an active session
app.get('/', verifyUser, (req,res) => {
    return res.json({Status: "Success",  name: req.name});
})

// Logging into the database
app.post('/login',(req, res) => {
    const query = 'SELECT * FROM users WHERE email=?';
    conn.query(query, [req.body.email], (err, results) => {
        if (err) {
            console.log(err)
            return res.json({error: "Error handling login"})
        }
        if (results.length > 0) {
            bcryptjs.compare(req.body.password.toString(), results[0].password, (err, response) => {
                if (response) {
                    const name = results[0].firstname + " "+ results[0].lastname;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: "1d"});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.json({error: "Invalid Username or Password"});
                }
            })
        } else {
            return res.json({error: 'User does not exists in the database! Kindly sign Up'})
        }
    })
})

// Logout of the dashboard
app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: 'Success'})
})

// Add products to the database
app.post('/api/addproduct', (req, res) => {
    const sql = "SELECT * FROM products WHERE name=? AND description =?";
    conn.query(sql, [req.body.name,req.body.description], (err, results) => {
        if (err) return res.json({error: 'Error Fetching product in the database'})
        if (results.length > 0) {
            return res.json({error: "The product already exists! You can edit the details !"})
        }else{
            const sql = 'INSERT INTO products (`category`,`name`,`description`,`quantity`,`buying`,`selling`) VALUES(?)';
            const values = [req.body.category, req.body.name, req.body.description, req.body.quantity, req.body.buying, req.body.selling];
            conn.query(sql, [values], (err, results) => {
                if (err) return res.json({error: "Error inserting product details to the database"})
                return res.json({Status: "Success", message: 'You have successfully added the product to the database!'})
            })
        }
    })
})

// Fetch products from database
app.get('/api/products', (req, res) => {
    const { q } = req.query
    const keys = ['category','name','description']

    const handleSearch = (data) => {
        return data.filter(product => 
          keys.some((key) => product[key].toLowerCase().includes(q))
          )
      }

    const query = 'SELECT * FROM products';
    conn.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Products: ', err);
            res.status(500).json({ error: 'Error fetching products' });
          } else {
            res.status(200).json(handleSearch(results).splice(0,25));
          }
    })
})

// Fetching Sales Data from database
app.get('/api/sales', (req, res) => {
    const query = 'SELECT * FROM sales';
    conn.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Products: ', err);
            res.status(500).json({ error: 'Error fetching products' });
          } else {
            res.status(200).json(results);
          }
    })
})

// Sell products
app.put('/api/sell/:id', (req, res) => {
    const sql = "SELECT * FROM sales WHERE id=?";
    const id = req.params.id
    conn.query(sql, [id], (err, results) => {
        if (err) return res.json({error: 'Error Fetching product in the database'})
        if (results.length > 0) {
            const amount = results[0].quantity
            const qty = amount + parseInt(req.body.quantity);
            const query = `UPDATE sales SET quantity = ? WHERE id =?`;
            conn.query(query, [qty,id],(err, results) => {
                if (err) return res.json({error: "Error inserting product details to the database"})
                // return res.json({Status: "Sold", message: 'You have successfully updated the quantity of Products!'})
                if (results) {
                    const sql = 'SELECT * FROM products WHERE id=?';
                    conn.query(sql, [id], (err, result) => {
                        if (err) return res.json({error: "Error updating product quantity after sell!"})
                        if (result) {
                            const query_products = 'UPDATE products SET quantity=? WHERE id =?'
                            const quantity = results[0].quantity - parseInt(req.body.quantity)
                            conn.query(query_products, [quantity,id], (err, result) => {
                                if (err) return res.json({error: "Error inserting product details to the database"})
                                return res.json({Status: "Sold", message: 'You have successfully updated the quantity of Products!'})
                            })
                        }
                    })
                }
            })            
        }else{
            const query = 'SELECT * FROM products WHERE id=?';
            conn.query(query, [id], (err, result) => {
                if (err) return res.json({error: 'Error Fetching product in the database'})
                if (result.length > 0) {
                    const sql = 'INSERT INTO sales (`category`,`name`,`description`,`quantity`,`buying`,`selling`) VALUES(?)';
                    const values = [result[0].category, result[0].name, result[0].description, req.body.quantity, result[0].buying, result[0].selling]
                    conn.query(sql, [values], (err, results) => {
                        if (err) return res.json({error: "Error inserting sales details to the database"})
                        // return res.json({Status: "Sold", message: 'You have successfully updated the quantity of Products!'})
                        if (results) {
                            const sql = 'SELECT * FROM products WHERE id=?';
                            conn.query(sql, [id], (err, result) => {
                                if (err) return res.json({error: "Error updating product quantity after sell!"})
                                if (result) {
                                    const query_products = 'UPDATE products SET quantity=? WHERE id =?'
                                    const quantity = results[0].quantity - parseInt(req.body.quantity)
                                    conn.query(query_products, [quantity,id], (err, result) => {
                                        if (err) return res.json({error: "Error inserting product details to the database"})
                                        return res.json({Status: "Sold", message: 'You have successfully updated the quantity of Products!'})
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

// Adding stocks
app.put('/api/restock/:id', (req, res) => {
    const query = 'SELECT * FROM products WHERE id=?'
    const id = req.params.id
    conn.query(query, [id] , (err, results) => {
        if (err) return res.json({error: 'Error fetching products from the database'})
        if (results) {
            const sql = 'UPDATE products SET quantity = ? WHERE id =?'
            const updatedQuantity = results[0].quantity + parseInt(req.body.quantity)
            conn.query(sql, [updatedQuantity, id], (err, result) => {
                if (err) return res.json({error: 'Error updating products quantity in the database'})
                return res.json({Status: "Updated", message: 'You have successfully updated the quantity of product!'})
            })
        }
    })
})

// Edit Products
app.put('/api/edit/:id', (req, res) => {
    const query = 'UPDATE products SET quantity=?, buying=?, selling=? WHERE id =?';
    const id = req.params.id
    const quantity = req.body.quantity
    const buying = req.body.buying
    const selling = req.body.selling
    conn.query(query, [quantity, buying, selling, id], (err, result) => {
        if (err) return res.json({error: "Error inserting product details to the database"})
        return res.json({Status: "Updated", message: 'You have successfully updated the quantity of sells!'})
    })
})

// Select product
app.get('/api/display/:id', (req, res) => {
    const query = 'SELECT * FROM products WHERE id=?';
    const id = req.params.id
    conn.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching Products: ', err);
            res.status(500).json({ error: 'Error fetching products' });
          } else {
            res.status(200).json(results);
          }
    })
})