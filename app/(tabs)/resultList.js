import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { db, getDocs, deleteDoc, doc, collection } from '../../firebaseConfig'
import { Card } from '@rneui/themed'


const ResultList = () => {
    const [result, setResult] = useState([]);


    const readFromDB = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "result"));
            const resultData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setResult(resultData);

        } catch (error) {
            console.log(error.message);
        }

    }

    const deleteFromDB = async (id) => {
        try {
            await deleteDoc(doc(db, "result", id));
            alert("삭제되었습니다")
        } catch (error) {
            console.log(error.message)
        }

        readFromDB();
    }


    useEffect(() => {
        readFromDB();
    }, [])


    return (
        <ScrollView>
            <View>

                <Pressable style={styles.button} onPress={readFromDB}>
                    <Text style={styles.text}>리스트 불러오기</Text>
                </Pressable>

                {result && result?.map((data) => {
                    return (
                        <Card key={data.id}>
                            <View>
                                <Card.Title>페르소나 : {data.name}</Card.Title>
                                <View style={styles.deleteButton}>
                                    <Pressable onPress={() => deleteFromDB(data.id)}>
                                        <Text style={styles.deleteButtonText}>삭제</Text>
                                    </Pressable>

                                </View>

                            </View>
                            <Card.Divider />
                            <Text>프로젝트 : {data.userProject}</Text>
                            <Card.Divider />
                            <Text>나이 : {data.age}</Text>
                            <Text>역할 : {data.role}</Text>
                            <Card.Divider />
                            <Text>사용 시나리오 : {data.senario}</Text>
                            <Card.Divider />
                            <Text>경험 후 개선점 : {data.experience}</Text>
                        </Card>
                    );
                })}
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#393E46',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    deleteButton: {
        backgroundColor: '#393E46',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: 50
    },
    deleteButtonText: {
        backgroundColor: '#393E46',
        color: 'white',

    }

})

export default ResultList;