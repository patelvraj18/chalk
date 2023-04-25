import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import * as db_operations from '../db_operations.js';

const timeToDate = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0]; //returns the date
};

const CalView = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const itemsRef = useRef(items);

  useEffect(() => {
  }, [])

  const loadQOTD = (day) => {
    new_items = {}
    for (let i = -30; i < 30; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const date = timeToDate(time);
      new_items[date] = [];
    }
    db_operations.getPrompts().then((prompts) => {
      console.log(prompts)
      for (prompt of Object.values(prompts)) {
        console.log("prompt", prompt)
        const date = timeToDate(prompt.date);
        console.log(date)
        if (!new_items[date]) {
          new_items[date] = [];
        }
        new_items[date].push({
          date: date,
          question: prompt.text,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          prompt: prompt,
        });
      }
      console.log(new_items)
    })
    setItems(new_items)
  };

  const renderQOTD = (item) => {
    return (
      <TouchableOpacity style={styles.itemQOTD} onPress={() => {navigation.navigate('QOTD', {
                                                                  prompt: item.prompt,
                                                                  date: item.date,
                                                                  username: route.params.username,
                                                                }); }}>
        <Card style={styles.cards}>
          <Card.Content>
            <View
              style={styles.btwnViews}>
              <View style={styles.textPrompt}>
                <Text style={styles.textInfo}>{item.date}</Text>
                <Text style={styles.textQuestion}>{item.question}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.calView}>
      <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
        <View style={styles.backArrowContainer}>
          <Image source={require('../assets/icons/back_arrow_icon.png')}
            style={styles.backArrow} />
        </View>
      </TouchableOpacity>
      <Agenda
        items={items}
        loadItemsForMonth={loadQOTD}
        selected={'2023-04-24'}
        renderItem={renderQOTD}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemQOTD: {
    marginRight: 15,
    marginTop: 20,
  },
  btwnViews: {
    justifyContent: 'center',
    height: '100%',
  },
  cards: {
    backgroundColor: '#F1F1F1',
    height: 100,
  },
  backArrow: {
    width: 35,
    height: 35,
  },
  backArrowContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  textInfo: {
    fontFamily: 'InriaSans-Bold',
    fontSize: 13,
    color: '#616161',
    textAlign: 'center',
    alignContent: 'center',
  },
  textQuestion: {
    fontFamily: 'InriaSans-Regular',
    fontSize: 13,
    color: '#616161',
    textAlign: 'center',
  },
  textPrompt: {
    marginRight: 5,
  },
  calView: {
    flex: 1,
    marginTop: 33,
    backgroundColor: 'white',
  },
});

export default CalView;