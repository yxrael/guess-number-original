

import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import { Title } from '../components/ui/Title'
import { Colors } from '../constants/colors'
import { PrimaryButton } from '../components/ui/PrimaryButton'

export const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {

    const { width, height } = useWindowDimensions();

    let imageSize = 300;

    if ( width < 380 ) {
        imageSize = 150
    }

    if ( height < 400 ) {
        imageSize = 80
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

  return (
    <ScrollView style={{ flex: 1}}>
    <View style={ styles.rootContainer }>
        <Title>GAME OVER!</Title>
        <View style={ [styles.imageContainer, imageStyle ] }>
            <Image
                style={ styles.image }
                source={require('../assets/success.png')}
            />
        </View>
        <Text style={ styles.summaryText }>
            Your phone needed <Text style={ styles.highlight }>{ roundsNumber }</Text> rounds to guess the number <Text style={ styles.highlight }>{ userNumber }</Text>
        </Text>
        <PrimaryButton onPress={ onStartNewGame }>Start New Game</PrimaryButton>
    </View>
    </ScrollView>
  )
}

// const devideWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },  
    imageContainer: {
        // width: devideWidth < 380 ? 150 : 300,
        // height: devideWidth < 380 ? 150 : 300,
        // borderRadius: devideWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})