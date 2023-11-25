import React, {useState, useEffect} from 'react'
import api from './api'

const App = () => {
    const [transactons, setTransactions] = useState([])
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        is_income: '',
        date: '',
    })
}

const fetchTransactions = async () => {
    const response = await api.get('/transactions/')
    setTransactions(response.data)
}

useEffect(() => {
    fetchTransactions()
}, [])

export default App;
