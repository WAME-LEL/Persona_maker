import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Introduce = () => (
  <View style={styles.container}>
    <Text style={styles.title}>내 아이디어 어때?</Text>
    <Text style={styles.description}>
      사용자가 계획중인 프로젝트를 입력 받아 가상의 페르소나를 만들어 해당 프로젝트를 경험 후 평가해주는 어플리케이션입니다.
    </Text>
    <Text style={styles.features}>
      - Introduce: Persona Maker 프로젝트를 소개하는 페이지
      {"\n"}
      - Persona: 사용자가 입력한 프로젝트를 GPT가 만든 페르소나에게 평가 받는 페이지, 조금 느릴 수 있음(2~3분 정도 소요됨)
      {"\n"}
      - Result List: 저장된 페르소나의 경험 결과를 보여주는 페이지
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    margin: 30
  },
  features: {
    fontSize: 16,
    margin: 40
  },
});

export default Introduce;