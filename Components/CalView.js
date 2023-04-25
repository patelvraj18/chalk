import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

const timeToDate = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0]; //returns the date
};

const CalView = ({ navigation, route }) => {
  const [items, setItems] = useState({});

  const loadQOTD = (day) => {
    setTimeout(() => {
      for (let i = -30; i < 1; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const date = timeToDate(time);
        //console.log(time);
        if (!items[date]) {
          items[date] = [];
          items[date].push({
            date: 'QOTD from ' + date + ': ',
            question: '[What is your favorite season of Friends?]',
            height: Math.max(50, Math.floor(Math.random() * 150)),
          });
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderQOTD = (item) => {
    return (
      <TouchableOpacity style={styles.itemQOTD} onPress={() => { navigation.navigate('QOTD'); }}>
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