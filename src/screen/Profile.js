import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Profile = () => {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS == 'android' ? '30' : '0', backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ padding: 12, flexDirection: 'column', gap: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name='calculator-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Calc Box</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name='laptop-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Pc Manager</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name='help-circle-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Help</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name='document-text-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Feedback</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name='heart-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Rate it</Text>
          </View>
        </View>
        <View style={{ padding: 12, backgroundColor: '#E0E0E0', marginVertical: 10 }}>
          <Text style={{ color: '#282828', fontSize: 15 }}>Catagory/Account</Text>
        </View>



        <View style={{ padding: 12, flexDirection: 'column', gap: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='cash-multiple' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Income cataegory Setting</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='cash-multiple' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Expense category Setting</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='cog-refresh-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Account Setting</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='note-multiple-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Budget Setting</Text>
          </View>
        </View>
        <View style={{ padding: 12, backgroundColor: '#E0E0E0', marginVertical: 10 }}>
          <Text style={{ color: '#282828', fontSize: 15 }}>Settings</Text>
        </View>
        <View style={{ padding: 12, flexDirection: 'column', gap: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='reload' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Backup</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='lock-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Passcode</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='bell-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Alarm setting</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name='palette-outline' color='#282828' size={26} />
            <Text style={{ fontSize: 18 }}>Style</Text>
          </View>
        </View>






      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})