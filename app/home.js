import * as React from "react";
import { useRouter } from "expo-router"
import { Text, StyleSheet, View, Pressable } from "react-native";

const Home = () => {
    const router = useRouter();

    //introduce 페이지로 이동하는 함수
    const toIntroduce = () => {
        router.replace("/introduce");
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>내 아이디어 어때?</Text>
            <Pressable style={styles.button} onPress={toIntroduce}>
                <Text style={styles.buttonText}>Continue...</Text>
            </Pressable>
        </View>
    )

}

//스타일
const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 50,
        
    },
    container: {
        flex: 1,
        backgroundColor: '#F1B4BB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#1F4172',
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