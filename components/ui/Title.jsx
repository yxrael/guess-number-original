import { StyleSheet, Text, Platform } from "react-native"
import { Colors } from "../../constants/colors";


export const Title = ( {children} ) => {
  return (
    <Text style={ styles.title }>{ children }</Text>
  )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        borderWidth: Platform.select({ios: 0 , android: 2}),
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        width: 300
    }
})
