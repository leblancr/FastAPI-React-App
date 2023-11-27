import React, {useState, useEffect} from 'react'
import api from './api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const App = () => {
    const [transactions, setTransactions] = useState([])
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
    })

    // get all transactions from backend
    const fetchTransactions = async () => {
        const response = await api.get('/transactions/')  // axios, endpoint
        setTransactions(response.data) // useState
    }

    // get one transaction from backend
    const fetchTransaction = async (id) => {
        const response = await api.get('/transactions/{id}')  // axios, endpoint
        setTransactions(response.data) // useState
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setFormData({
            ...formData, [event.target.name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        await api.post('/transactions/', formData)
        fetchTransactions()
        setFormData({
            amount: '',
            category: '',
            description: '',
            is_income: false,
            date: ''
        })
    }

    const deleteTransaction = async (transaction_id) => {
        try {
            const response = await api.delete(`/transactions/${transaction_id}`);
            console.log('Data deleted successfully:', response.data);
            const response_get = await api.get('/transactions/')  // axios, endpoint
            setTransactions(response_get.data) // useState
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    return (
        <div>
            <nav className='navbar navbar-dark bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'>
                        Finance App
                    </a>
                </div>
            </nav>
            <div className='container'>
                <form onSubmit={handleFormSubmit}>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='amount' className='form-label'>
                            Amount
                        </label>
                        <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='category' className='form-label'>
                            Category
                        </label>
                        <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>
                            Description
                        </label>
                        <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='is_income' className='form-label' style={{ marginRight: '7px' }}>
                            Income?
                        </label>
                        <input type='checkbox' id='is_income' name='is_income' onChange={handleInputChange} value={formData.is_income}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='date' className='form-label' style={{ marginRight: '7px' }}>
                            Date
                        </label>
                        <input type='date' id='date' name='date' onChange={handleInputChange} value={formData.date}/>
                    </div>

                    <button type='submit' className='btn btn-primary'>
                        Submit
                    </button>
                </form>
                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Income?</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                                <td>{transaction.date}</td>
                                <td>
                                    <button onClick={() => deleteTransaction(transaction.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default App;
