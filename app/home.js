import * as React from "react";
import { Link, useRouter } from "expo-router"
import { Text, StyleSheet, View, Pressable } from "react-native";

const Home = () => {
    const router = useRouter();

    const toContinue = () => {
        router.replace("/introduce");
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Persona Maker</Text>
            <Pressable style={styles.button} onPress={toContinue}>
                <Text style={styles.buttonText}>Continue...</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 50,
        
    },
    container: {
        flex: 1, // This allows the View to take up the entire screen
        backgroundColor: '#610C9F', // Change this to the desired background color
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#940B92',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonText: {
        color: 'white',
        fontSize: 26,
    },
});

export default Home;