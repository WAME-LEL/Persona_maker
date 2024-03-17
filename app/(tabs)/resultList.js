import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { db, getDocs, deleteDoc, doc, collection } from '../../firebaseConfig'
import { Card } from '@rneui/themed'


const ResultList = () => {
    const [result, setResult] = useState([]);


    //firebase DB에서 데이터 읽어오는 함수
    const readFromDB = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "result"));      //getDocs함수로 result collection의 모든 document를 가져옴
            const resultData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));      //document의 id와 data를 합쳐서 resultData에 저장
            setResult(resultData);      //resultData를 result state에 저장

        } catch (error) {
            console.log(error.message);
        }

    }

    //firebase DB에서 데이터 삭제하는 함수
    const deleteFromDB = async (id) => {
        try {
            await deleteDoc(doc(db, "result", id));     //deleteDoc함수로 result collection의 해당 id를 가진 document를 삭제
            alert("삭제되었습니다")
        } catch (error) {
            console.log(error.message)
        }
        //데이터 삭제 후 다시 DB에서 데이터 읽어오기
        readFromDB();
    }


    useEffect(() => {
        readFromDB();
    }, [])      //컴포넌트가 마운트될 때 한번만 실행되도록 설정


    return (
        <ScrollView>
            <View>

                <Pressable style={styles.button} onPress={readFromDB}>
                    <Text style={styles.text}>리스트 불러오기</Text>
                </Pressable>

                {result && result?.map((data) => {      //result에 존재하는 모든 document를 map함수로 순회하며 Card 컴포넌트에 출력
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

//스타일
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