import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

const timeToDate = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0]; //returns the date
};

const QOTD = ({ navigation, route }) => {
  const [items, setItems] = useState({});

  // const loadQOTD = (day) => {
  //   setTimeout(() => {
  //     for (let i = -30; i < 1; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const date = timeToDate(time);
  //       //console.log(time);
  //       if (!items[date]) {
  //         items[date] = [];
  //         items[date].push({
  //           date: 'QOTD from ' + date + ': ',
  //           question: '[What is your favorite season of Friends?]',
  //           height: Math.max(50, Math.floor(Math.random() * 150)),
  //         });
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
        <View style={styles.backArrowContainer}>
          <Image source={require('../assets/icons/back_arrow_icon.png')}
            style={styles.backArrow} />
        </View>
      </TouchableOpacity>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          04/25/2023
        </Text>
      </View>
      <View style={styles.qotdContainer}>
        <Text style={styles.qotd}>
          Question of the Day:
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          [This was the question from the date.]
        </Text>
      </View>
      <View style={styles.urResponseContainer}>
        <Text style={styles.urResponse}>
          Your Response:
        </Text>
      </View>
      <View style={styles.responseContainer}>
        <Text style={styles.response}>
          [This was your response.]
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  backArrow: {
    width: 35,
    height: 35,
  },
  backArrowContainer: {
    marginLeft: 20,
    marginTop: 55,
  },
  dateContainer: {
    marginTop: 10,
  },
  date: {
    color: '#464646',
    fontFamily: 'InriaSans-Bold',
    fontSize: 22,
    textAlign: 'center',
  },
  qotdContainer: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  qotd: {
    fontFamily: 'InriaSans-Bold',
    fontSize: 34,
    color: '#6A6A6A',
    textAlign: 'center',
  },
  questionContainer: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  question: {
    fontFamily: 'InriaSans-Regular',
    fontSize: 24,
    color: '#6A6A6A',
    textAlign: 'center',
  },
  urResponseContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 70,
  },
  urResponse: {
    color: '#ADADAD',
    fontFamily: 'InriaSans-Bold',
    fontSize: 22,
  },
  responseContainer: {
    marginTop: 10,
    marginLeft: 50,
    marginRight: 20,
  },
  response: {
    color: '#ADADAD',
    fontFamily: 'InriaSans-Regular',
    fontSize: 16,
  },
});

export default QOTD;