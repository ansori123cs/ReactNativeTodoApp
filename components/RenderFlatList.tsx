import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image, ScrollView, ImageBackgroundComponent, Alert } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
import Checkbox from 'expo-checkbox';

const RenderFlatlist = ({ data }: { data: any[] }) => {
  const [dataToDos, setDataToDos] = useState(data);
  const handleChange = (idData: number) => {
    const temp = dataToDos.map((dataTodo) => (dataTodo.idData === idData ? { ...dataTodo, isChecked: !dataTodo.isChecked } : dataTodo));
    setDataToDos(temp);
  };

  let selected = dataToDos.filter((dataToDo) => dataToDo.isChecked);
  return (
    <FlatList
      data={dataToDos}
      keyExtractor={(item) => item.idData.toString()}
      renderItem={({ item }) => (
        <View className='border-b p-3'>
          <View className='flex-row py-3 justify-between'>
            <View className='flex-row items-center gap-3 w-3/4'>
              <Image source={icons.person} style={{ width: 24, height: 24 }} />
              <Text className='font-bold'>{item.title}</Text>
            </View>
            <Checkbox value={item.isChecked} onValueChange={() => handleChange(item.idData)} className='mx-3' />
          </View>
        </View>
      )}
    />
  );
};
export default RenderFlatlist;
