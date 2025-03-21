import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image, ScrollView, ImageBackgroundComponent } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
const Index = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todos, setTodos] = useState<{ [key: string]: { title: string }[] }>({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        console.log(storedTodos);
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Gagal memuat To-Do', error);
    }
  };

  const saveTodos = async (updatedTodos: { [key: string]: { title: string }[] }) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Gagal menyimpan To-Do', error);
    }
  };

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setDatePickerVisibility(false);
  };

  const addTodo = () => {
    if (todoTitle && selectedDate) {
      const newTodos = { ...todos };
      if (!newTodos[selectedDate]) {
        newTodos[selectedDate] = [];
      }
      newTodos[selectedDate].push({ title: todoTitle });
      setTodos(newTodos);
      saveTodos(newTodos);
      setTodoTitle('');
    }
  };
  return (
    <View className='flex-1 bg-primary'>
      <View className='flex-row  mt-5 justify-center items-center'>
        <CustomButton text='Back' bgColor='white' />
        <Text className='text-white mx-3 text-3xl font-bold text-center '>My To Do List</Text>
      </View>
      <ScrollView
        className='flex-1 rounded-t-3xl mt-3 px-2'
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
          backgroundColor: '#fff',
        }}
      >
        <View className='bg-accent justify-center items-center'></View>
      </ScrollView>
    </View>
    // <View className='flex-1 p-4 bg-gray-100'>
    //   <Text className='text-lg font-bold text-center mb-2'>Agenda To-Do List</Text>

    //   <TextInput className='border p-2 rounded mb-2 bg-white' placeholder='Masukkan To-Do' value={todoTitle} onChangeText={setTodoTitle} />

    //   <TouchableOpacity onPress={() => setDatePickerVisibility(true)} className='p-2 bg-blue-500 rounded'>
    //     <Text className='text-white text-center'>{selectedDate || 'Pilih Tanggal'}</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity onPress={addTodo} className='p-2 bg-green-500 mt-2 rounded'>
    //     <Text className='text-white text-center'>Tambah To-Do</Text>
    //   </TouchableOpacity>

    //   <DateTimePickerModal isVisible={isDatePickerVisible} mode='date' onConfirm={handleConfirmDate} onCancel={() => setDatePickerVisibility(false)} />

    //   <Agenda
    //     items={todos}
    //     selected={selectedDate}
    //     renderItem={(item, isFirst) => (
    //       <View className='p-2 bg-white rounded shadow-md m-2'>
    //         <Text className='text-black'>{item.title}</Text>
    //       </View>
    //     )}
    //     renderEmptyData={() => <Text className='text-center text-gray-500 p-4'>Tidak ada To-Do</Text>}
    //   />
    // </View>
  );
};
export default Index;
