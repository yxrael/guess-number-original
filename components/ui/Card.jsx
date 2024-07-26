

import { StyleSheet, View, Dimensions } from 'react-native'
import { Colors } from '../../constants/colors'

export const Card = ({ children }) => {
  return (
    <View style={ styles.card }>
        { children }
    </View>
  )
}

const devideWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: devideWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        //ANDROID
        elevation: 8,
        // IOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
      }
})