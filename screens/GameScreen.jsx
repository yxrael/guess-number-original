import { Alert, FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import { Title } from '../components/ui/Title'
import { useEffect, useState } from 'react'
import { generateRandomBetween } from '../helpers/generateRandomBetween'
import { NumberContainer } from '../components/game/NumberContainer'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { Card } from '../components/ui/Card'
import { InstructionText } from '../components/ui/InstructionText'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GuessLogItem } from '../components/game/GuessLogItem'

let minBoundary = 1;
let maxBoundary = 100;

export const GameScreen = ({ userNumber, onGameOver }) => {

    const initialGuess = generateRandomBetween( 1, 100, userNumber );
    const [currentGuess, setCurrentGuess] = useState( initialGuess );
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
      if ( currentGuess === userNumber ) {
        onGameOver( guessRounds.length);
      }
    }, [ currentGuess, userNumber, onGameOver ]);

    useEffect(() => {
      minBoundary = 1;
      maxBoundary = 100;
    }, [])
    
    
    const nextGuessHandler = ( direction) => {  //lower or greater

        if (( direction === 'lower' && currentGuess < userNumber ) 
            || ( direction === 'greater' && currentGuess > userNumber )) {
                Alert.alert("Don't lie!", 'You know that this is wrong...', [
                    {text: 'Sorry!', style: 'cancel' },
                ]);
                return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess - 1;
        } else {
            minBoundary = currentGuess + 1;
        };
        const newRndNumber = generateRandomBetween( minBoundary, maxBoundary, currentGuess );
        setCurrentGuess( newRndNumber );
        setGuessRounds( prevGuessRounds => [ newRndNumber, ...prevGuessRounds ]);
    }

    const guessRoundListLength = guessRounds.length;

    let content = (
        <>
        <NumberContainer>{ currentGuess }</NumberContainer>
            <Card>
                <InstructionText style={ styles.instructionText }>Higher or lower?</InstructionText>
                <View style={ styles.buttonsContainer }>
                    <View style={ styles.buttonContainer }>
                        <PrimaryButton onPress={ nextGuessHandler.bind( this, 'lower' ) }>
                            <Ionicons name="remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={ styles.buttonContainer }>
                        <PrimaryButton onPress={ nextGuessHandler.bind( this, 'greater' ) }>
                        <Ionicons name="add" size={24} color="white"/>
                        </PrimaryButton>
                    </View> 
                </View>
            </Card>
        </>)

    if ( width > 500 ) {
        content = (
            <>
            <View style={ styles.buttonsContainerHorizontal }>
                <View style={ styles.buttonContainer }>
                    <PrimaryButton onPress={ nextGuessHandler.bind( this, 'lower' ) }>
                        <Ionicons name="remove" size={24} color="white"/>
                    </PrimaryButton>
                </View>
            <NumberContainer>{ currentGuess }</NumberContainer>
                <View style={ styles.buttonContainer }>
                    <PrimaryButton onPress={ nextGuessHandler.bind( this, 'greater' ) }>
                    <Ionicons name="add" size={24} color="white"/>
                    </PrimaryButton>
                </View> 
            </View>
            </>
        )
    }

  return (
    <View style={ styles.screen }>
        <Title style={ styles.title }>Oponnent's Guess</Title>
        { content }
        <View style={ styles.listContainer }>
            {/* { guessRounds.map( guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
            <FlatList
                data={ guessRounds }
                renderItem={ ( itemData) => <GuessLogItem roundNumber={ itemData.index - guessRoundListLength } guess={ itemData.index }/>}
                keyExtractor={ (item) => item }
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonsContainerHorizontal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
})
