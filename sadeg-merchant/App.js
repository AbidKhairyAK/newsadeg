import React from 'react'
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'

import AppNavigator from '@/navigator'
import store from '@/store'
import { colors } from '@/constants'

const App = () => {
  return (
  	<Provider store={store}>
      <SafeAreaView style={styles.savTop} />
      <SafeAreaView style={styles.savBottom}>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' && 'padding'} style={styles.kav}>
    	    <AppNavigator />
        </KeyboardAvoidingView>
      </SafeAreaView>
  	</Provider>
  )
}

export default App

const styles = StyleSheet.create({
  savTop: { flex: 0, backgroundColor: colors.background },
  savBottom: { flex: 1, backgroundColor: colors.white },
  kav: { flex: 1 }
})