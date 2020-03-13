import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputId from './InputId'
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([])
  const [id, setId] = useState('')
  const [userBal, setUserBal] = useState('')

  const getChain = () => {
    axios.get('http://localhost:5000/chain')
      .then(res => {
        let temp_chain = (res.data.chain)
        console.log('temp_chain', temp_chain)
        let temp_transactions = temp_chain.flatMap((node) => node.transactions)
        console.log(temp_transactions)
        setTransactions(temp_transactions)
        computeBalance(temp_transactions)
      })
  }

  useEffect(() => {
    getChain()
  }, [id])

  function computeBalance(transactions) {
    let userTransactions = transactions.filter((transaction) => {
      return transaction.sender === id || transaction.recipient === id
    })

    let subtracted = 0
    let added = 0

    for (let i = 0; i < userTransactions.length; i++){
      if (userTransactions[i].sender === id) {
        subtracted = subtracted + userTransactions[i].amount
      }
      if (userTransactions[i].recipient === id) {
        added = added + userTransactions[i].amount
      }
    }
    let temp_balance = added - subtracted
    setUserBal(temp_balance)
  }

  return (
    <div className="App">
      <InputId setId={setId} id={id} />
      <h2>Transactions</h2>
      {transactions.map((transaction) => {
        return (
          <div>
            <p>Amount: {transaction.amount}</p>
            <p>To: {transaction.recipient}</p>
            <p>From: {transaction.sender}</p>
            <p>-----------------------</p>
            <br />
          </div>
        )
      })}
      <h2>User Balance:</h2>
      <p>{userBal}</p>
    </div>
  );
}

export default App;
