import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { TabBar, TabView } from 'react-native-tab-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore'
import { PieChart } from 'react-native-svg-charts'

const StateScreen = () => {
  const [currentDate, setCurrentDate] = useState(moment())
  const [index, setIndex] = useState(0)
  const [option, setOption] = useState('Stats')
  const [expenses, setExpenses] = useState([])



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

  const handlePrevious = () => {
    setCurrentDate(preDate =>
      moment(preDate.subtract(1, 'month'))
    )
  }

  const handleNext = () => {
    setCurrentDate(preDate =>
      moment(preDate.add(1, 'month'))
    )
  }

  const totalExpense = expenses
    .filter(expense => expense.type == 'Expense')
    .reduce((total, expense) => total + parseFloat(expense.ammount), 0)

    const totalIncome = expenses
    .filter(expense => expense.type == 'Income')
    .reduce((total, expense) => total + parseFloat(expense.ammount), 0)

  const [routes, setRoutes] = useState([
    {
      key: 'edit', title: 'Income'
    },
    { key: 'view', title: 'Expense' }
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'edit':
        return <Income />

      case 'view':
        return <Expense />

    }
  }

  const RenderPieChart =()=>{
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const pieData = expenses.filter(expense => expense.type == 'Income')
      .map((expense, index) => ({
        value: parseFloat(expense.ammount),
        svg: {
          fill: randomColor(),
          onPress: () => console.log("Press", index)
        },
        key: `pic-${index}`,
        category: expense.category,
        price: expense.ammount,
      }))


    return (
      <View style={{marginTop:20}}>
      <PieChart style={{ height: 200 }} data={pieData} />
     
      
        {
      pieData?.map((data, index) => (
        <View style={{padding:12}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <View style={{backgroundColor:data?.svg?.fill,alignSelf:'flex-start',
                paddingVertical:4,paddingHorizontal:8,width:50,
                borderRadius:5
              }}>
                <Text style={{textAlign:'center',fontSize:16,fontWeight:'500',color:'white'}}>{Math.round((data.value / totalIncome) * 100)}%</Text>
              </View>
              <Text>{data?.category}</Text>
            </View>
            <View>
            <Text>{Number(data.price).toFixed(2)}</Text>
          </View>
          </View>
        
        </View>
      ))
    }
    </View>
   
)

  }
  const RenderPicChartExpense = () => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const pieData = expenses.filter(expense => expense.type == 'Expense')
      .map((expense, index) => ({
        value: parseFloat(expense.ammount),
        svg: {
          fill: randomColor(),
          onPress: () => console.log("Press", index)
        },
        key: `pic-${index}`,
        category: expense.category,
        price: expense.ammount,
      }))


    return (
      <View style={{marginTop:20}}>
      <PieChart style={{ height: 200 }} data={pieData} />
     
      
        {
      pieData?.map((data, index) => (
        <View style={{padding:12}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <View style={{backgroundColor:data?.svg?.fill,alignSelf:'flex-start',
                paddingVertical:4,paddingHorizontal:8,width:50,
                borderRadius:5
              }}>
                <Text style={{textAlign:'center',fontSize:16,fontWeight:'500',color:'white'}}>{Math.round((data.value / totalExpense) * 100)}%</Text>
              </View>
              <Text>{data?.category}</Text>
            </View>
            <View>
            <Text>{Number(data.price).toFixed(2)}</Text>
          </View>
          </View>
        
        </View>
      ))
    }
    </View>
   
)
  };






const Income = () => (
  <View style={{ backgroundColor: 'white' }}>
    <View>
      {option == 'Budget' && (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <View>
              <Text style={{ color: 'gray', fontSize: 16 }}>Remaning Monthly</Text>
              <Text style={{ marginTop: 10, fontWeight: '500', fontSize: 16, letterSpacing: 0.4 }}>10000.00</Text>
            </View>
            <View style={{ padding: 10, alignSelf: 'flex-start', borderRadius: 8, backgroundColor: '#E0E0E0' }}>
              <Text>budget Setting</Text>
            </View>
          </View>
          {
            expenses.filter((item) => item.type == 'Income').map((item, index) => (
              <Pressable style={{ backgroundColor: 'white', borderTopColor: '#E0E0E0', borderTopWidth: 0.5, padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '500' }}>{item.category}</Text>
                  <Text>₹{Number(item.ammount).toFixed(2)}</Text>
                </View>
              </Pressable>
            ))
          }
        </View>
      )}
    </View>
    {
      option =='Stats'&&(
        <View style={{marginVertical:10}}>
          <RenderPieChart/>
        </View>
      )
    }
  </View>
)

const Expense = () => (
  <View style={{ backgroundColor: 'white' }}>
    <View>
      {option == 'Budget' && (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <View>
              <Text style={{ color: 'gray', fontSize: 16 }}>Remaning Monthly</Text>
              <Text style={{ marginTop: 10, fontWeight: '500', fontSize: 16, letterSpacing: 0.4 }}>10000.00</Text>
            </View>
            <View style={{ padding: 10, alignSelf: 'flex-start', borderRadius: 8, backgroundColor: '#E0E0E0' }}>
              <Text>budget Setting</Text>
            </View>
          </View>
          {
            expenses.filter((item) => item.type == 'Expense').map((item, index) => (
              <Pressable style={{ backgroundColor: 'white', borderTopColor: '#E0E0E0', borderTopWidth: 0.5, padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '500' }}>{item.category}</Text>
                  <Text>₹{Number(item.ammount).toFixed(2)}</Text>
                </View>
              </Pressable>
            ))
          }
        </View>
      )}
      {
        option == 'Stats' && (
          <View>
            <RenderPicChartExpense />
          </View>
        )
      }
    </View>
  </View>
)


return (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ padding: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 12, backgroundColor: '#E0E0E0' }}>

        <Pressable
          onPress={() => setOption('Stats')}
          style={{
            backgroundColor: option == 'Stats' ? "white" : '#E0E0E0',
            padding: 12, flex: 1, borderRadius: 12
          }}>
          <Text style={{ textAlign: 'center', color: option == 'Stats' ? "orange" : '#606060' }}>Stats</Text>
        </Pressable>

        <Pressable
          onPress={() => setOption('Budget')}
          style={{
            backgroundColor: option == 'Budget' ? "white" : '#E0E0E0',
            padding: 12, flex: 1, borderRadius: 12
          }} >
          <Text style={{ textAlign: 'center', color: option == 'Budget' ? "orange" : '#606060' }}>Budget</Text>
        </Pressable>

        <Pressable
          onPress={() => setOption('Note')}
          style={{
            backgroundColor: option == 'Note' ? "white" : '#E0E0E0',
            padding: 12, flex: 1, borderRadius: 12
          }}>
          <Text style={{ textAlign: 'center', color: option == 'Note' ? "orange" : '#606060' }}>Note</Text>
        </Pressable>
      </View>

      {option == 'Budget' && (
        <View>
          <View style={{
            paddingTop: 15,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <MaterialCommunityIcons onPress={handlePrevious} name='chevron-left' size={30} color='black' />
            <Text style={{ fontSize: 18 }}>{currentDate.format('MMM YYYY')}</Text>
            <MaterialCommunityIcons onPress={handleNext} name='chevron-right' size={30} color='black' />

          </View>
        </View>
      )}

    </View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: '100%' }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'black' }}
          style={{ backgroundColor: 'white' }}
          labelStyle={{ fontWeight: 'bold' }}
          activeColor='black'
          inactiveColor='gray'
        />
      )}
    />
  </SafeAreaView>
)
}

export default StateScreen

const styles = StyleSheet.create({})
