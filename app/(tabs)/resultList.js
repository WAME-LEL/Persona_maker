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
                            <Text style={styles.boldText}>프로젝트</Text>
                            <Text>{data.userProject}</Text>
                            <Card.Divider />
                           
                            <Text><Text style={styles.boldText}>나이 </Text> {data.age}</Text>
                            <Text><Text style={styles.boldText}>직업 </Text>{data.role}</Text>
                            <Card.Divider />
                            <Text style={styles.boldText}>배경</Text>
                            <Text>{data.background}</Text>
                            <Text style={styles.boldText}>성격</Text>
                            <Text>{data.personality}</Text>
                            <Text style={styles.boldText}>목표</Text>
                            <Text>{data.goal}</Text>
                            <Text style={styles.boldText}>고민</Text>
                            <Text>{data.worry}</Text>
                            <Card.Divider />
                            <Text style={styles.boldText}>사용 시나리오</Text>
                            <Text>{data.senario}</Text>
                            <Text style={styles.boldText}>경험 후 개선점</Text>
                            <Text>{data.experience}</Text>
                            <Card.Divider />
                            <Text style={styles.boldText}>평가 {"\n"}</Text>

                            <Text style={styles.boldText}>창의성</Text>
                            <Text>{data.creativity}</Text>
                            <Text style={styles.boldText}>사용자참여도 및 유용성</Text>
                            <Text>{data.utility}</Text>
                            <Text style={styles.boldText}>기술적 실행 가능성</Text>
                            <Text>{data.feasibility}</Text>
                            <Text style={styles.boldText}>시장의 수용도</Text>
                            <Text>{data.acceptance}</Text>
                            <Text style={styles.boldText}>지속가능성 및 확장성</Text>
                            <Text>{data.scalability}</Text>
                            <Text style={styles.boldText}>총점</Text>
                            <Text>{data.totalPoint}</Text>

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

    },
    boldText: {
        fontWeight: 'bold'
    },
    biggerText:{
        fontSize: 18
    }

})

export default ResultList;