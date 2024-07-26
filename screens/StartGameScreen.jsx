import {
  StyleSheet, 
  TextInput, 
  View, 
  Alert, 
  useWindowDimensions, 
  KeyboardAvoidingView, 
  ScrollView 
} from "react-native"
import { PrimaryButton } from "../components/ui/PrimaryButton"
import { useState } from "react"
import { Colors } from "../constants/colors"
import { Title } from "../components/ui/Title"
import { Card } from "../components/ui/Card"
import { InstructionText } from "../components/ui/InstructionText"

export const StartGameScreen = ({ onPickNumber }) => {

  const [enteredNumber, setEnteredNumber] = useState('');

  const { width, height } = useWindowDimensions();

  const numberInputHandler = (enteredText) => {
    setEnteredNumber( enteredText );
  };

  const resetInputHandler = () => {
    setEnteredNumber('');
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt( enteredNumber );

    if ( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      )
      return;
    }
    onPickNumber( chosenNumber );
  }

  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={ styles.screen }>
    <KeyboardAvoidingView style={ styles.screen } behavior="position">
    <View style={ [styles.rootContainer, { marginTop: marginTopDistance }] }>
      <Title>Guess my Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
          <TextInput
              style={ styles.numberInput }
              maxLength={ 2 }
              keyboardType="number-pad"
              value={ enteredNumber }
              onChangeText={ numberInputHandler }
          />
          <View style={ styles.buttonsContainer }>
              <View style={ styles.buttonContainer }>
                <PrimaryButton onPress={ resetInputHandler }>
                  Reset
                </PrimaryButton>
              </View>
              <View style={ styles.buttonContainer }>
                <PrimaryButton onPress={ confirmInputHandler }>
                  Confirm
                </PrimaryButton>
              </View> 
          </View>
      </Card>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    // marginTop: height < 400 ? 30 : 100,
    alignItems: 'center'
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    // alignSelf: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  }
})

