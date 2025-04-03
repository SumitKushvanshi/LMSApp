import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'


const ExpenseScreen = () => {
    const [option, setOption] = useState("Income");
    const [currentDate, setCurrentDate] = useState(moment())
    const [note, setNote] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("");
    const [account, setAccount] = useState('')
    const [showCategory, setShowCategrory] = useState(false);
    const [showCalculater, setShowCalculater] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [input, setInput] = useState('');
    const [description, setDescription] = useState('')

    const navigation = useNavigation()


    const item = [
        'Food',
        'Social Life',
        'Pet',
        'Transport',
        'Culture',
        'HouseHold',
        'Appreal',
        'Beauty',
        'Health',
        'Eduction',
        'Gift',
        'Other',
        'Liesure',
        'Bills',
        'Pet',

    ];
    const newItem = [
        'Allounce',
        'Salary',
        'PettyCash',
        'Bonus',
        'Other',
        'Add',
    ];

    const displyedItem = option === 'Income' ? newItem : item;

    const setShowcalculatorSatus = () => {
        setShowCategrory(false);
        setShowAccount(false);
        setShowCalculater(!showCalculater);
    }

    const setShowCategoryStatus = () => {
        setShowAccount(false);
        setShowCalculater(false);
        setShowCategrory(true)
    }
    const setShowAccountStatus = () => {
        setShowCalculater(false);
        setShowCategrory(false);
        setShowAccount(true)
    }

    const formetDate =
        currentDate.format('DD/MM/YY  (ddd)')


    const selectCategory = option => {
        setCategory(option);
        setShowCategrory(false)
    }
    const selectAccount = option => {
        setAccount(option)
        setShowAccount(false)
    }
    const accounts = ['Cash', 'Bank Account', 'Card'];

    const handelPress = value => {
        if (value == 'OK') {
            setShowCalculater(false)
            return;
        }
        if (value == '=') {
            try {
                setInput(eval(input).toString())

            } catch (error) {
                console.log("Error", error)

            }
        } else if (value == 'C') {
            setInput('')
        } else {
            setInput(input + value)
        }
    }

    // const saveBtn= async () => {


    //     // try {
    //     //     const expense = {
    //     //         type: option,
    //     //         description: description,

    //     //         category: category,
    //     //         account: account,
    //     //         ammount: input,
    //     //         date: currentDate.format("YYYY  MMM"),
    //     //         note:note,
    //     //         day: currentDate.format('DD  ddd')
    //     //     }

    //     //     const respose = await axios.post("http//localhost:3000/expenses", expense);

    //     //     setOption('');
    //     //     setDescription('');
    //     //     setAccount('');
    //     //     untsetAmmo('');
    //     //     setCategory('');

    //     //     setInput('');

    //     //     navigation.goBack();
    //     //     console.log("Clicked");


    //     // } catch (error) {
    //     //     console.log("Error", error)

    //     // }
    //     navigation.goBack()
    //     console.log("hii")

    // }

    const createExpense = async () => {
        try {

            await firestore().collection('expenses').add({
                type: option,
                description: description,

                category: category,
                account: account,
                ammount: input,
                date: currentDate.format("YYYY  MMM"),
                note: note,
                day: currentDate.format('DD ddd')

            })
            navigation.goBack()




        } catch (error) {
            console.log(error)

        }





    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{
                    justifyContent: 'space-between', alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 12,
                    marginVertical: 10
                }}>
                    <Ionicons name='search-outline' size={25} color='#505050' />
                    <Text style={{ fontSize: 18 }}>Expense</Text>
                    <Ionicons name='filter-outline' size={25} color='#505050' />
                </View>


                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    marginHorizontal: 18,
                    marginVertical: 20
                }}>
                    <Pressable
                        onPress={() => setOption('Income')}
                        style={{
                            backgroundColor: option == 'Income' ? 'white' : '#F5F5F5',
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: option == 'Income' ? '#007FFF' : '#D0D0D0',
                            borderRadius: 6,
                            paddingVertical: 5
                        }} >
                        <Text style={{ fontSize: 18 }}>Income</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setOption('Expense')}
                        style={{
                            backgroundColor: option == 'Expense' ? 'white' : '#F5F5F5',
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: option == 'Expense' ? 'orange' : '#D0D0D0',
                            borderRadius: 6,
                            paddingVertical: 5
                        }} >
                        <Text style={{ fontSize: 18 }}>Expense</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setOption('Transfer')}
                        style={{
                            backgroundColor: option == 'Transfer' ? 'white' : '#F5F5F5',
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            borderColor: option == 'Transfer' ? 'black' : '#D0D0D0',
                            borderRadius: 6,
                            paddingVertical: 5
                        }} >
                        <Text style={{ fontSize: 18 }}>Transfer</Text>
                    </Pressable>
                </View>


                <View style={{
                    marginVertical: 10, marginHorizontal: 15,
                    backgroundColor: 'white'

                }}>
                    <View style={{
                        flexDirection: 'row', gap: 12,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <Text style={{ fontSize: 18, width: 80 }}>Date</Text>
                        <Pressable style={{ flex: 1 }}>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={{
                                    borderBottomWidth: 0.8,
                                    borderColor: 'black',
                                    borderBottomColor: '#ES8E8E8',
                                    paddingBottom: 10,
                                    borderRadius: 7,
                                    fontSize: 16
                                }}
                                placeholder={formetDate}
                            />
                        </Pressable>
                    </View>
                    <Pressable
                        onPress={setShowcalculatorSatus}
                        style={{
                            flexDirection: 'row', gap: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 8,

                        }}>
                        <Text style={{ fontSize: 18, width: 80 }}>
                            Ammount
                        </Text>
                        <Pressable style={{ flex: 1 }}>
                            <TextInput
                                editable={false}
                                placeholderTextColor={'black'}
                                style={{
                                    borderBottomWidth: 0.8,

                                    borderBottomColor: '#ES8E8E8',
                                    paddingBottom: 10,
                                    borderRadius: 7,
                                    fontSize: 16
                                }}
                                placeholder={input}
                            />
                        </Pressable>



                    </Pressable>

                    <Pressable
                        onPress={setShowCategoryStatus}
                        style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 18, width: 80 }}>
                            Category
                        </Text>
                        <Pressable style={{ flex: 1 }}>
                            <TextInput
                                editable={false}
                                placeholderTextColor={'black'}
                                style={{
                                    borderBottomWidth: 0.8,

                                    borderBottomColor: '#ES8E8E8',
                                    paddingBottom: 10,
                                    borderRadius: 7,
                                    fontSize: 16
                                }}
                                placeholder={category}
                            />
                        </Pressable>
                    </Pressable>


                    <Pressable
                        onPress={setShowAccountStatus}
                        style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 18, width: 80 }}>
                            Account
                        </Text>
                        <Pressable style={{ flex: 1 }}>
                            <TextInput
                                editable={false}
                                placeholderTextColor={'black'}
                                style={{
                                    borderBottomWidth: 0.8,

                                    borderBottomColor: '#ES8E8E8',
                                    paddingBottom: 10,
                                    borderRadius: 7,
                                    fontSize: 16
                                }}
                                placeholder={account}
                            />
                        </Pressable>
                    </Pressable>


                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 18, width: 80 }}>
                            Note
                        </Text>
                        <Pressable style={{ flex: 1 }}>
                            <TextInput
                                value={note}
                                onChangeText={setNote}
                                placeholderTextColor={'black'}
                                style={{
                                    borderBottomWidth: 0.8,

                                    borderBottomColor: '#ES8E8E8',
                                    paddingBottom: 10,
                                    borderRadius: 7,
                                    fontSize: 16
                                }}
                                placeholder={""}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={{ backgroundColor: '#a6acaf', height: 10, borderRadius: 5, marginTop: 5 }} />
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12, backgroundColor: 'white' }}>
                    <Pressable style={{ flex: 1 }}>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder='Desription'
                            placeholderTextColor={'black'}
                            style={{
                                paddingBottom: 10,
                                borderColor: '#E8E8E8',
                                borderWidth: 1,
                                fontSize: 18
                            }}
                        />
                    </Pressable>
                </View>
                <TouchableOpacity
                    onPress={createExpense}
                    style={{

                        backgroundColor: 'orange', padding: 10, marginTop: 15, width: 299, alignItems: 'center',
                        marginLeft: 25,
                        borderRadius: 50
                    }}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
            {
                showCalculater && (
                    <View style={{ justifyContent: 'flex-end', backgroundColor: 'white' }}>
                        <View style={{
                            backgroundColor: 'black', justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Ammount</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <Ionicons name='create-outline' size={25} color='white' />
                                <Ionicons name='crop-outline' size={25} color='white' />
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row', flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                            {[
                                '+',
                                '-',
                                '*',
                                '/',
                                '9',
                                '8',
                                '7',
                                'C',
                                '4',
                                '5',
                                '6',
                                '=',
                                '1',
                                '2',
                                '3',
                                '0',
                                '0',
                                'OK',
                            ].map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => handelPress(item)}
                                    key={index}
                                    style={{
                                        width: item == '0' ? '24.5%' : '24%',
                                        height: 70,
                                        aspectRatio: 1.5,
                                        borderWidth: 0.5,
                                        borderColor: '#E0E0E0',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: -0.3,
                                        backgroundColor: item == '=' ? '#ff4d4d' : '#fff'
                                    }}
                                >
                                    <Text style={{
                                        color: item == '=' ? '#fff' : '#000',
                                        fontSize: 18,
                                        fontWeight: '600'
                                    }}>{item}</Text>
                                </TouchableOpacity>

                            ))
                            }
                        </View>


                    </View>

                )
            }
            {showCategory && (
                <View style={{ height: 400, flex: 1 }}>
                    <View style={{
                        backgroundColor: 'black', justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Categeroy</Text>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <Ionicons name='create-outline' size={25} color='white' />
                            <Ionicons name='crop-outline' size={25} color='white' />
                        </View>

                    </View>
                    <View >
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                            alignContent: 'stretch'
                        }}>
                            {
                                displyedItem?.map((item, index) => (
                                    <Pressable
                                        onPress={() => selectCategory(item)}
                                        style={{
                                            width: '33.33%', aspectRatio: 2,
                                            borderWidth: 0.6,
                                            borderColor: '#E0E0E0',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: -0.3,

                                        }}>
                                        <Text>{item}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                    </View>

                </View>
            )}
            {
                showAccount && (
                    <View style={{ height: 400 }}>
                        <View style={{
                            backgroundColor: 'black', justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Account</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <Ionicons name='create-outline' size={25} color='white' />
                                <Ionicons name='crop-outline' size={25} color='white' />
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                                {accounts.map((item, index) => (
                                    <Pressable
                                        onPress={() => selectAccount(item)}
                                        style={{
                                            width: '33.33%', aspectRatio: 2,
                                            borderWidth: 0.6,
                                            borderColor: '#E0E0E0',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: -0.3,

                                        }}>
                                        <Text style={{ textAlign: 'center' }}>{item}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    )
}

export default ExpenseScreen