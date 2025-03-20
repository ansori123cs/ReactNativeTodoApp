import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-3xl font-bold'>Dashboard</Text>
    </View>
  );
};
export default Index;
