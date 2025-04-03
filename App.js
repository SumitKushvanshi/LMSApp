import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import "./global.css"
import Navigation from './src/navigation/Navigation'
import { ModalPortal } from 'react-native-modals';


const App = () => {

 
  return (
    
<>
<Navigation/>
<ModalPortal />

</>
  )
}

export default App

const styles = StyleSheet.create({})