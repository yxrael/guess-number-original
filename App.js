import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ImageBackground, SafeAreaView, Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { StartGameScreen } from './screens/StartGameScreen';
import { useCallback, useEffect, useState } from 'react';
import { GameScreen } from './screens/GameScreen';
import { Colors } from './constants/colors';
import { GameOverScreen } from './screens/GameOverScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState( false );
  const [guessRounds, setGuessRounds] = useState(0)

  const [ fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
 
  if (!fontsLoaded) {
    return null;
  }
  

  // if ( fontsLoaded ) {
  //   SplashScreen.hideAsync()
  // }
  
  const pickedNumberHandler = ( pickedNumber ) => {
    setUserNumber( pickedNumber );
    setGameIsOver( false );
  }

  const gameOverHandler = ( numberOfRounds ) => {
    setGameIsOver( true );
    setGuessRounds( numberOfRounds )
  }

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }


  const insideContent = (!userNumber 
    ? <StartGameScreen onPickNumber={ pickedNumberHandler }/>
    : gameIsOver 
        ? <GameOverScreen userNumber={ userNumber} roundsNumber={ guessRounds } onStartNewGame={ startNewGameHandler } />
        : <GameScreen userNumber={ userNumber } onGameOver={ gameOverHandler }/>
    )

  let content = (
    // Work for ios
    <SafeAreaView style={ styles.rootScreen}>
            { insideContent }
    </SafeAreaView>
  );

  if ( Platform.OS === 'android'){
    content = (
      <SafeAreaViewAndroid style={ styles.rootScreen}>
            { insideContent }
    </SafeAreaViewAndroid>
    )
  }

  return (
    <>
      <StatusBar style='auto'/>
     <View style={ styles.rootScreen } onLayout={onLayoutRootView}>
      <LinearGradient
          // Button Linear Gradient
            style={ styles.rootScreen }
            colors={[ Colors.primary700,Colors.accent500 ]}
          >
          <ImageBackground
            source={require('./assets/background.png')}
            resizeMode='cover'
            style={ styles.rootScreen }
            imageStyle={ styles.backgroundImage }
          >
            
            {          
            content
            }
    
          </ImageBackground>
            
          </LinearGradient>
     </View>
          
    </>
         

  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
})