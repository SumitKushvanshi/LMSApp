import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const AccountScreen = () => {

  const [expenses, setExpenses] = useState([])
  const [bankAccountBalance, setBankAccountBalace] = useState(0);


  useEffect(() => {
    featchData()
  }, [])

  const featchData = async () => {

    try {
      const snapshot = await firestore().collection("expenses").get();
      const expenseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));




      setExpenses(expenseData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  console.log(expenses)

  const totalExpense = expenses?.
    filter(expense => expense.type == "Expense")
    .reduce((total, expense) => total + parseFloat(expense.ammount), 0)


  const totalIncome = expenses?.
    filter(expense => expense.type == "Income")
    .reduce((total, expense) => total + parseFloat(expense.ammount), 0)


  const totalSpentCash = expenses
    .filter(expense => expense.type == 'Expense' && expense.account == 'Cash')
    .reduce((total, expense) => total + parseFloat(expense.ammount), 0)

const calculateTotal=()=>{
  let bankBalnce=0;
  expenses.forEach(expense=>{
    const {ammount,account,type}=expense;
    const numaricAmount=parseFloat(ammount);
    if(account=='Bank Accounts'){
      if(type =='Expense'){
        bankBalnce -=numaricAmount;
      }else if(type== 'Income'){
        bankBalnce +=numaricAmount
      }
    }
  })
  setBankAccountBalace(bankBalnce)
}

  useEffect(() => {
    calculateTotal()
  }, [expenses])

  return (
    <SafeAreaView style={{ padding: 10, }}>
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>Accounts</Text>
      <View style={{ borderColor: '#E0E0E0', borderWidth: 0.5 }} />

      <View style={{
        flexDirection: 'row', paddingTop: 12,
        paddingBottom: 12, justifyContent: 'space-between',
        alignItems: 'center', backgroundColor: 'white'
      }}>
        <View>
          <Text style={{
            fontWeight: '500',
            color: '#004953',
            textAlign: 'center',
            fontSize: 16
          }}>
            Assets</Text>
          <Text style={{
            marginTop: 5,
            color: '#0578eb',
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center'
          }}>
            ₹{totalIncome.toFixed(2)}</Text>
        </View>

        <View>
          <Text style={{
            fontWeight: '500',
            color: '#004953',
            textAlign: 'center',
            fontSize: 16
          }}>
            Liabilities</Text>
          <Text style={{
            marginTop: 5,
            color: '#eb6105',
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center'
          }}>
            ₹{totalExpense.toFixed(2)}</Text>
        </View>

        <View>
          <Text style={{
            fontWeight: '500',
            color: '#004953',
            textAlign: 'center',
            fontSize: 16
          }}>
            Total</Text>
          <Text style={{
            marginTop: 5,

            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center'
          }}>
            ₹{Number(totalIncome - totalExpense).toFixed(2)}</Text>
        </View>
      </View>
      <View style={{ borderColor: '#E0E0E0', borderWidth: 0.5 }} />
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
          <Text>Cash</Text>
          <Text style={{ color: '#eb6105', }}>  ₹{totalSpentCash.toFixed(2)}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'white' }}>
          <Text>Cash</Text>
          <Text style={{ color: '#eb6105', }}>  ₹{totalSpentCash.toFixed(2)}</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
          <Text>Account</Text>
          <Text style={{ color: '#0578eb', }}>  ₹{bankAccountBalance.toFixed(2)}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'white' }}>
          <Text>Bank Accounts</Text>
          <Text style={{ color: '#0578eb', }}>  ₹{bankAccountBalance.toFixed(2)}</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
          <Text>Card</Text>
          <Text >  ₹00.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'white' }}>
          <Text>Card</Text>
          <Text >  ₹00.00</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})