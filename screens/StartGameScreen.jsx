import { StyleSheet, TextInput, View } from "react-native"
import { PrimaryButton } from "../components/PrimaryButton"

export const StartGameScreen = () => {

  return (
    <View style={ styles.inputContainer }>
        <TextInput
            style={ styles.numberInput }
            maxLength={ 2 }
            keyboardType="number-pad"
        />
        <PrimaryButton>
            Reset
        </PrimaryButton>
        <PrimaryButton>
            Confirm
        </PrimaryButton>
    
    </View>
  )
}

  

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#72063c',
    borderRadius: 8,
    //ANDROID
    elevation: 8,
    // IOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center'
  }
})

