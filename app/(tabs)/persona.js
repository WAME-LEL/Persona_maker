import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Pressable, ScrollView } from "react-native"
import { Divider } from '@rneui/base';
import axios from 'axios';
import { db, collection, addDoc } from '../../firebaseConfig'

const Persona = () => {
    const OPENAI_API_KEY = 'your-api-key' // OpenAI API Key
    const model = 'gpt-4'       //  모델

    const [name, setName] = useState("");       //페르소나 이름
    const [age, setAge] = useState("");         //페르소나 나이
    const [role, setRole] = useState("");       //페르소나 직업
    const [background, setBackground] = useState("");       //페르소나 배경
    const [personality, setPersonality] = useState("");     //페르소나 성격    
    const [goal, setGoal] = useState("");                   //페르소나 목표
    const [worry, setWorry] = useState("");                 //페르소나 고민
    const [senario, setSenario] = useState("");             //페르소나 사용 시나리오
    const [experience, setExperience] = useState("");       //페르소나 경험 후 개선점
    const [creativity, setCreativity] = useState("");       //평가의 창의성
    const [utility, setUtility] = useState("");             //평가의 사용자참여도 및 유용성
    const [feasibility, setFeasibility] = useState("");     //평가의 기술적 실행 가능성
    const [acceptance, setAcceptance] = useState("");       //평가의 시장의 수용도
    const [scalability, setScalability] = useState("");     //평가의 지속가능성 및 확장성
    const [totalPoint, setTotalPoint] = useState("");       //평가의 총점
    const [state, setState] = useState("");                 //상태
    const [userProject, setUserProject] = useState("");     //사용자가 입력한 프로젝트
    const [functionCallingString, setFunctionCallingString] = useState();       //funtionCalling에 전달 할 응답 내용

    //firebase db에 평가 결과 데이터를 저장하는 함수
    const addToDB = async => {
        try {
            const docRef = addDoc(collection(db, "result"), {
                userProject: userProject,
                name: name,
                age: age,
                role: role,
                background: background,
                personality: personality,
                goal: goal,
                worry: worry,
                senario: senario,
                experience: experience,
                creativity: creativity,
                utility: utility,
                feasibility: feasibility,
                acceptance: acceptance,
                scalability: scalability,
                totalPoint: totalPoint,
            });
            console.log("Document written with ID: ", docRef.id);
            alert("저장되었습니다")

        } catch (error) {
            console.log(error.message);
        }
    }

    //GPT에게 프로젝트를 설명하고 페르소나를 만들어 달라고 요청하는 함수
    const runConversation = async () => {
        setState("GPT에게 물어보는 중 입니다.");
        alert("gpt에게 요청했습니다")
        //state를 초기화
        setName("");
        setAge("");
        setRole("");
        setBackground("");
        setPersonality("");
        setGoal("");
        setWorry("");
        setSenario("");
        setExperience("");
        setCreativity("");
        setUtility("");
        setFeasibility("");
        setAcceptance("");
        setScalability("");
        setTotalPoint("");

        const messages = [{
            "role": "system", "content": "당신은 프로젝트 컨설턴트 입니다. 내가 현재 진행중인 프로젝트에 대한 내용을 말해주면 당신은 임의의 페르소나를 만들어서 그에 대한 '사용 시나리오'와 '경험 후 개선점'을 반드시 말해주면 됩니다 또한 페르소나는 '이름'과 '나이', '직업', '배경', '성격', '목표', '고민'을 가지며. 응답은 무조건 페르소나의 '이름', '나이',  '직업', '배경', '성격', '목표', '고민', '사용 시나리오', '경험 후 개선점'이 구성요소로 들어가며 각 구성요소에대해 상세하고 응답해줘야하며 구성요소 명이 명시되어야만 합니다. 또한 내가 알려준 프로젝트를 '창의성', '사용자참여도 및 유용성', '기술적 실행 가능성', '시장의 수용도', '지속가능성 및 확장성' 이 5개의 항목으로 각 20점 씩 100점 만점으로 평가 해줘야 하며 각 항목에 대한 설명과 점수가 필요하고 각 항목에 대한 설명, 점수라고 명시 해줘야한다. 이 점수를 모두 합한 총점 항목이 필요합니다" },
        { "role": "user", "content": userProject }];

        //에러 발생시 재시도 하기위해 함수로 따로 빼서 실행
        const executeRunConversation = async () => {
            try {
                //axios로 openai api에 요청
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: model,
                    messages: messages,
                    temperature: 0.7,       //시행착오 결과 가장 적합하다 판단한 0.7로 설정
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        },

                    },

                );

                //응답 받은 내용 중 결과만을 추출
                const responseString = response.data.choices[0].message.content;
                console.log("response : " + responseString);

                setFunctionCallingString(responseString);

            } catch (e) {
                console.error("에러 발생:", e);
                console.log("재시도 중...");
                await executeRunConversation(); // 에러가 발생하면 함수를 재호출하여 재시도
            }
        };


        // 최초 실행
        executeRunConversation();
    }



    //GPT에게 받은 응답을 function calling을 활용하여 JSON형태로 정리하는 함수
    const functionCalling = async () => {
        setState("GPT가 응답을 정리하는 중입니다");
        console.log("this:" + functionCallingString);

        const messages = [{ "role": "user", "content": functionCallingString }];
        //function calling을 활용하여 함수를 설명하고 응답을 정리함
        const functions = [
            {
                "name": "persona",
                "description": "페르소나",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "페르소나의 이름 찾기",      //함수 설명
                        },
                        "age": {
                            "type": "string",
                            "description": "페르소나의 나이 찾기",
                        },
                        "role": {
                            "type": "string",
                            "description": "페르소나의 직업 찾기",
                        },
                        "background": {
                            "type": "string",
                            "description": "페르소나의 배경 찾기",
                        },
                        "personality": {
                            "type": "string",
                            "description": "페르소나의 성격 찾기",
                        },
                        "goal": {
                            "type": "string",
                            "description": "페르소나의 목표 찾기",
                        },
                        "worry": {
                            "type": "string",
                            "description": "페르소나의 고민 찾기",
                        },
                        "senario": {
                            "type": "string",
                            "description": "페르소나의 사용 시나리오 항목의 모든 내용 가져오기",
                        },
                        "experience": {
                            "type": "string",
                            "description": "페르소나의 경험 후 개선점 항목의 모든 내용 가져오기",
                        },
                        "creativity": {
                            "type": "string",
                            "description": "평가의 창의성 항목의 설명과 점수를 포함한 모든 내용 가져오기",
                        },
                        "utility": {
                            "type": "string",
                            "description": "평가의 사용자참여도 및 유용성 항목의 설명과 점수를 포함한 모든 내용 가져오기",
                        },
                        "feasibility": {
                            "type": "string",
                            "description": "평가의 기술적 실행 가능성 항목의 설명과 점수를 포함한 모든 내용 가져오기",
                        },
                        "acceptance": {
                            "type": "string",
                            "description": "평가의 시장의 수용도 항목의 설명과 점수를 포함한 모든 내용 가져오기",
                        },
                        "scalability": {
                            "type": "string",
                            "description": "평가의 지속가능성 및 확장성 항목의 설명과 점수를 포함한 모든 내용 가져오기",
                        },
                        "totalPoint": {
                            "type": "string",
                            "description": "평가의 5개의 각 항목 점수의 총점 구하기",
                        }

                    },
                    //응답 중에 꼭 필요한 항목들
                    "required": ["name", "age", "role", "background", "personality", "goal", "worry", "senario", "experience", "creativity" ,"utility" , "feasibility", "acceptance", "scalability", "totalPoint"],
                },
            }
        ];

        //에러 발생시 재시도 하기위해 함수로 따로 빼서 실행
        const executefunctionCalling = async () => {
            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: model,
                    messages: messages,
                    functions: functions,
                    function_call: "auto",      //auto로 설정하면 GPT의 판단 하에 function calling을 사용할지 말지 결정, none으로 설정하면 function calling을 사용하지 않음
                    temperature: 0.7,
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        },

                    },

                );

                const responseMessage = response.data.choices[0].message.function_call.arguments;

                const responseJson = JSON.parse(responseMessage);
                console.log("name : " + responseMessage);

                setName(responseJson.name);
                setAge(responseJson.age);
                setRole(responseJson.role);
                setBackground(responseJson.background);
                setPersonality(responseJson.personality);
                setGoal(responseJson.goal);
                setWorry(responseJson.worry);
                setSenario(responseJson.senario);
                setExperience(responseJson.experience);
                setCreativity(responseJson.creativity);
                setUtility(responseJson.utility);
                setFeasibility(responseJson.feasibility);
                setAcceptance(responseJson.acceptance);
                setScalability(responseJson.scalability);
                setTotalPoint(responseJson.totalPoint);
                setState("GPT가 응답했습니다.");

            } catch (e) {
                console.error("에러 발생:", e);
                console.log("재시도 중...");
                await executefunctionCalling(); // 에러가 발생하면 함수를 재호출하여 재시도
            }
        };

        // 최초 실행
        executefunctionCalling();
    }

    //functionCallingString이 바뀔 때마다 functionCalling 함수를 실행
    useEffect(() => {
        if (functionCallingString) {
            functionCalling();
        }
    }, [functionCallingString]);



    return (
        <View style={styles.bottomHorizontal}>
            <TextInput
                style={styles.input}
                onChangeText={setUserProject}
                placeholder="당신이 진행중인 프로젝트에 대한 설명을 적어주십시오."
                value={userProject} />


            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={runConversation}>
                    <Text style={styles.text}>Create and evaluate persona</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={addToDB}>
                    <Text style={styles.text}>Result Save</Text>
                </Pressable>
            </View>




            <Text>{state}</Text>

            <Divider width={5} />
            <ScrollView>
                <View style={styles.vertical}>
                    <Text style={styles.boldText}>이름</Text>
                    <Divider orientation="vertical" />
                    <Text>{name}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.vertical}>
                    <Text style={styles.boldText}>나이</Text>
                    <Divider orientation="vertical" />
                    <Text>{age}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.vertical}>
                    <Text style={styles.boldText}>직업</Text>
                    <Divider orientation="vertical" />
                    <Text>{role}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>배경</Text>
                    <Divider />
                    <Text>{background}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>성격</Text>
                    <Divider />
                    <Text>{personality}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>목표</Text>
                    <Divider />
                    <Text>{goal}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>고민</Text>
                    <Divider />
                    <Text>{worry}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>사용 시나리오</Text>
                    <Divider />
                    <Text>{senario}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>경험 후 개선점</Text>
                    <Divider />
                    <Text>{experience}</Text>
                </View>

                <Divider width={5} />
                <Text style={styles.boldText}>평가</Text>
                <Divider width={5} />


                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>창의성</Text>
                    <Divider />
                    <Text>{creativity}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>사용자참여도 및 유용성</Text>
                    <Divider />
                    <Text>{utility}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>기술적 실행 가능성</Text>
                    <Divider />
                    <Text>{feasibility}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>시장의 수용도</Text>
                    <Divider />
                    <Text>{acceptance}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>지속가능성 및 확장성</Text>
                    <Divider />
                    <Text>{scalability}</Text>
                </View>

                <Divider width={5} />

                <View style={styles.horizontal}>
                    <Text style={styles.boldText}>총점</Text>
                    <Divider />
                    <Text>{totalPoint}</Text>
                </View>

                <Divider width={5} />
            </ScrollView>

        </View>
    );
}

//스타일
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    vertical: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    horizontal: {
        marginBottom: 10,
    },
    bottomHorizontal:{
        marginBottom: 160,
    },
    buttonContainer: {
        flexDirection: "row",

    },
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
    boldText: {
        fontWeight: 'bold'
    }
});

export default Persona;