import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const timestamp = Date.now();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now() - timestamp);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <View>
      <Text>{formatTime(currentTime)}</Text>
    </View>
  );
};

export default Clock;
