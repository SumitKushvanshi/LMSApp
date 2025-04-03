import { Pressable, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import moment, { months } from 'moment'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';

const HomeScreen = () => {

  const navigation = useNavigation()
  const [currentDate, setCurrentDate] = useState(moment())
  const [option, setOption] = useState('Daily')
  const [expenses, setExpenses] = useState([])
  const date = currentDate.format("MMMM YYYY");

  const [selectedMonth, setSelectedMonth] = useState(moment())
  const [modelVisble, setModelVisble] = useState(false)
  const [currentData, setCurrentdata] = useState(null)

  const day = moment(currentData?.item?.date).format('DD')
  const montYear = moment(currentData?.item?.date).format('MM YYYY')
  const dayName = moment(currentData?.item.date).format('ddd')


 


  useEffect(() => {
    featchData()
  }, [currentDate])


  useFocusEffect(
    useCallback(() => {
      featchData();
    }, [navigation])
  )

  const featchData = async () => {

    // try {
    //   const data = await firestore().collection('expenses').get();
    //   // const data=await firestore().collection('expenses').doc("7UdHxWRf9X4OkrCYccyW").get();
    //  console.log(data.docs)


    //  setExpense(featchData)

    // } catch (error) {
    //   console.log(error)
    // }

    try {
      const snapshot = await firestore().collection("expenses").get();
      const expenseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // console.log(groupedExpenses)



      setExpenses(expenseData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const generateDaysforMonth = month => {
    const startOfMonth = month.clone().startOf('month')
    const endOfMonth = month.clone().endOf('month')

    const satrtDate = startOfMonth.clone().startOf('week')
    const endDate = endOfMonth.clone().endOf('week')


    const days = [];
    const date = satrtDate.clone()

    while (date.isBefore(endDate, 'day')) {
      days.push({
        date: date.clone(),
        iscurrentMonth: date.month() === selectedMonth.month()
      })
      date.add(1, 'day')
    }
    return days
  }

  const renderDay = ({ item }) => {
    const isSunday = item?.date.day() === 0;
    const isSaturday = item.date.day() === 6;
    const isToday = item.date.isSame(moment(), 'day');


    const dayKey = item.date.format("DD ddd").trim()


    const dayExpenses = groupedExpenses[dayKey] || [];

    const totalIncome = dayExpenses
      .filter(expense => expense.type == 'Income')
      .reduce((total, expense) => total + parseFloat(expense.ammount), 0)


    const totalExpense = dayExpenses
      .filter(expense => expense.type == 'Expense')
      .reduce((total, expense) => total + parseFloat(expense.ammount), 0)

    const totalSavings = totalIncome - totalExpense;
    const setOpenModel = (item, dayExpenses, totalIncome,totalExpense) => {
      setCurrentdata({ item, dayExpenses, totalIncome,totalExpense })
  
      setModelVisble(!modelVisble)
  
    }

    return (
      <Pressable
        onPress={() => setOpenModel(item, dayExpenses, totalIncome,totalExpense)}
        style={[{
          width: boxWidth,
          height: 90,
          margin: 4,
          borderRadius: 4, backgroundColor: 'white',
        },
        isToday && { backgroundColor: '#b6f0b8' },
        isSunday && { backgroundColor: '#ffe5e5' },
        isSaturday && { backgroundColor: '#e5f1ff' },
        ]}>
        <Text style={{
          fontWeight: '500', fontSize: 12, textAlign: 'center',
          color: isSunday ? '#db784b' : isSaturday ? '#4e91de' : 'black',
          marginLeft: 2
        }}>{item?.date.date()}</Text>
        <View style={{ marginTop: 'auto', marginBottom: 5 }}>
          {totalIncome > 0 && (
            <Text style={{ fontSize: 15, textAlign: 'left', color: '#0578eb', marginLeft: 2, fontWeight: '500' }}>{totalIncome.toFixed(2)}</Text>
          )}

          {totalExpense > 0 && (
            <Text style={{ fontSize: 15, textAlign: 'left', color: '#eb6105', marginLeft: 2, fontWeight: '500' }}>{totalExpense.toFixed(2)}</Text>
          )}

          {totalSavings > 0 && (
            <Text style={{ fontSize: 15, textAlign: 'left', color: 'black', marginLeft: 2, fontWeight: '500' }}>{totalSavings.toFixed(2)}</Text>
          )}
        </View>
      </Pressable>
    )
  }



  const days = generateDaysforMonth(currentDate)


  const totalExpense = expenses?.
    filter(expense => expense.type == "Expense")
    .reduce((total, expense) => total + parseFloat(expense.ammount), 0)


  const totalIncome = expenses?.
    filter(expense => expense.type == "Income")
    .reduce((total, expense) => total + parseFloat(expense.ammount), 0)

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const day = expense.day;
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(expense);
    return acc;
  }, {})



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

  const ScreenWidth = Dimensions.get('window').width;
  const boxWidth = ScreenWidth / 7 - 8;
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginHorizontal: 10, marginVertical: 5 }}>
          <Ionicons style={{ paddingTop: 3 }} name='search-outline' size={29} color='black' />
          <Text style={{ fontSize: 20, }}>Money Manager</Text>
          <Ionicons style={{ paddingTop: 3 }} name='filter-outline' size={29} color='black' />

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, alignItems: 'center', backgroundColor: 'white' }}>
          <MaterialCommunityIcons onPress={handlePrevious} name='chevron-left' size={30} color='black' />
          <Text style={{ fontSize: 18 }}>{currentDate.format('MMM YYYY')}</Text>
          <MaterialCommunityIcons onPress={handleNext} name='chevron-right' size={30} color='black' />
        </View>

        <View>

        </View>

        <View style={{
          marginTop: 5, flexDirection: 'row', gap: 12, padding: 15,
          justifyContent: 'space-between'
        }}>
          <Pressable onPress={() => setOption('Daily')}>
            <Text style={{ color: option == 'Daily' ? "black" : 'gray' }}>Daily</Text>
          </Pressable>

          <Pressable onPress={() => setOption('Calender')}>
            <Text style={{ color: option == 'Calender' ? "black" : 'gray' }}>Calender</Text>
          </Pressable>

          <Pressable onPress={() => setOption('Monthly')}>
            <Text style={{ color: option == 'Monthly' ? "black" : 'gray' }}>Monthly</Text>
          </Pressable>

          <Pressable onPress={() => setOption('Summary<')}>
            <Text style={{ color: option == 'Summary' ? '#00000' : 'gray' }}>Summary</Text>
          </Pressable>

          <Pressable onPress={() => setOption('Decriptiopn')}>
            <Text style={{ color: option == 'Decriptiopn' ? "black" : 'gray' }}>Decriptiopn</Text>
          </Pressable>
        </View>

        <View>
          {/* <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.type}</Text>
        </View>
      )}
    /> */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 12,
            paddingBottom: 12,
            justifyContent: 'space-around',
            backgroundColor: 'white'
          }}>
            <View>
              <Text style={{
                fontWeight: "500",
                color: '#004953',
                textAlign: 'center'
              }}>Expenses</Text>
              <Text style={{
                marginTop: 5,
                textAlign: 'center',
                color: '#eb6105',
              }}>₹{totalExpense.toFixed(2)}</Text>
              fontSize:18,
              fontWeight:'500'
            </View>
            <View>
              <Text style={{
                fontWeight: "500",
                color: '#004953',
                textAlign: 'center'
              }}>Income</Text>
              <Text style={{
                marginTop: 5,
                textAlign: 'center',
                color: '#0578eb',
                fontSize: 18,
                fontWeight: '500'
              }}> ₹{totalIncome.toFixed(2)}</Text>
            </View>

            <View>
              <Text style={{
                fontWeight: "500",
                color: '#004953',
                textAlign: 'center'
              }}>Total</Text>
              <Text style={{
                marginTop: 5,
                textAlign: 'center',
                color: '#0578eb',
                fontSize: 18,
                fontWeight: '500'
              }}> ₹{(totalIncome - totalExpense).toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ borderColor: '#E0E0E0', borderWidth: 0.6 }} />
          {
            option == 'Daily' && (
              <ScrollView>
                <View>
                  {
                    Object.keys(groupedExpenses).map((item, index) => {
                      const totalExpense = groupedExpenses[item].filter(expense => expense.type == "Expense")
                        .reduce((sum, expense) => sum + parseFloat(expense.ammount), 0)

                      const totalIncome = groupedExpenses[item].filter(expense => expense.type == "Income")
                        .reduce((sum, expense) => sum + parseFloat(expense.ammount), 0)

                      return (
                        <Pressable style={{ padding: 12, marginBottom: 10, backgroundColor: 'white', }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              <Text style={{ fontSize: 18, fontWeight: '500' }}>{item.split(' ')[0]}</Text>
                              <Text style={{
                                backgroundColor: '#404040', borderRadius: 4,
                                paddingHorizontal: 4,
                                paddingVertical: 2,
                                color: 'white',
                                fontSize: 15,
                              }}>{item.split(' ')[1]}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 50 }}>
                              <Text style={{
                                color: '#0578eb',
                                fontWeight: '400',
                                fontSize: 16
                              }}>₹{totalIncome.toFixed(2)}</Text>
                              <Text style={{
                                color: '#eb6105',
                                fontWeight: '400',
                                fontSize: 16
                              }}>₹{totalExpense.toFixed(2)}</Text>
                            </View>
                          </View>
                          <View style={{
                            borderColor: '#E0E0E0',
                            borderWidth: 0.4,
                            marginTop: 7
                          }} />

                          {
                            groupedExpenses[item].map((item, index) => (
                              <Pressable style={{ marginTop: 18 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}>
                                  <Text style={{ fontSize: 15, color: 'gray', minWidth: 70 }}>
                                    {item?.category}
                                  </Text>
                                  <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15, color: 'gray' }}>{item?.account}</Text>
                                    {item?.note && (
                                      <Text style={{ fontSize: 15, color: 'gray', marginTop: 2 }}>{item?.note}</Text>
                                    )}
                                  </View>
                                  <Text style={{ color: item?.type == 'Expense' ? "#eb6105" : '#0578eb' }}>₹{Number(item.ammount).toFixed(2)}</Text>
                                </View>
                              </Pressable>
                            ))
                          }
                        </Pressable>
                      )
                    })
                  }
                </View>
              </ScrollView>
            )
          }
          {
            option == 'Calender' && (
              <ScrollView>
                <View style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#E0E0E0', flexDirection: 'row',
                  paddingVertical: 5
                }}>
                  {
                    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat'].map((day, index) => (
                      <Text style={[{ fontWeight: '500', textAlign: 'center', fontSize: 16, width: boxWidth, paddingBlock: 3 },
                      day == "Sun" && { color: 'orange' },
                      day == "Sat" && { color: 'blue' }
                      ]}>{day}</Text>
                    ))
                  }
                </View>
                <FlatList
                  data={days}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderDay}
                  numColumns={7}
                  scrollEnabled={false}
                />
              </ScrollView>
            )
          }
        </View>

      </SafeAreaView>
      <View style={{
        backgroundColor: '#FF7F50', height: 46, width: 46,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 23,
        position: 'absolute',
        right: 20,
        bottom: 30
      }}>
        <Pressable onPress={() => navigation.navigate('create')}>
          <Ionicons name='add-outline' color='white' size={30} />
        </Pressable>
      </View>
      <BottomModal

        visible={modelVisble}
        swipeDirection={['up', 'down']} // can be string or an array
        swipeThreshold={200} // default 100
        modalAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        onTouchOutside={() => setModelVisble(!modelVisble)}

        onHardwareBackPress={() => setModelVisble(!modelVisble)}

      >
        <ModalContent style={{ width: '100%', height: 450 }}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
             
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{day}</Text>
              <Text style={{backgroundColor:'#404040',borderRadius:4,
                paddingHorizontal:4,paddingVertical:1,color:'white',fontSize:10,
                  alignSelf:'flex-start',marginTop:3
                }}>{dayName}</Text>
              
              </View>
              <View>
               
              <Text style={{fontSize:10,color:'gray'}}>{montYear}</Text>
                
              
              </View>
             
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
              <Text style={{color:'#0578eb',fontSize:15,fontWeight:'500'}}>₹{currentData?.totalIncome.toFixed(2)}</Text>
              <Text style={{color:'orange',fontSize:15,fontWeight:'500'}}>{currentData?.totalExpanse}</Text>
              {/* <Text>{currentData?.totalExpense.toFixed(2)}</Text> */}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>

  )
}

export default HomeScreen

const styles = StyleSheet.create({})