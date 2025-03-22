import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image, ScrollView, ImageBackgroundComponent, Alert } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
import Checkbox from 'expo-checkbox';

import RenderFlatlist from '@/components/RenderFlatList';

const data = [
  { idData: 1, title: 'Lari', isChecked: false },
  { idData: 2, title: 'Latihan', isChecked: false },
  { idData: 3, title: 'Ngaji', isChecked: true },
  { idData: 4, title: 'Belajar', isChecked: false },
  { idData: 5, title: 'Skripsi', isChecked: false },
];

const Index = () => {
  const handleBack = () => {
    console.log('Back Button');
  };
  let selected = data.filter((dataToDo) => dataToDo.isChecked);
  return (
    <View className='flex-1 bg-primary'>
      <View className='mt-5 justify-center items-center'>
        <Text className='text-white font-bold m-3'>22 Maret 2025</Text>
        <Text className='text-white mx-3 text-3xl font-bold text-center '>My To Do List</Text>
      </View>
      <View className='h-1/3 rounded-3xl bg-white m-3'>
        <View>
          <RenderFlatlist data={data} />
        </View>
      </View>
      <View className='h-1/3 rounded-3xl bg-white m-3 justify-center items-center'>
        <RenderFlatlist data={selected} />
        <CustomButton
          onPress={() => {
            handleBack();
          }}
          title='Back'
          className='p-3 bg-primary mx-0'
        />
      </View>
    </View>
  );
};
export default Index;
