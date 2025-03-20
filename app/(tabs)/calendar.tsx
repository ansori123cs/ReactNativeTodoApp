import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todos, setTodos] = useState<{ date: string; title: string }[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Gagal memuat To-Do', error);
    }
  };

  const saveTodos = async (updatedTodos: { date: string; title: string }[]) => {
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
      const newTodos = [...todos, { date: selectedDate, title: todoTitle }];
      setTodos(newTodos);
      saveTodos(newTodos);
      setTodoTitle('');
    }
  };

  return (
    <View className='flex-1 p-4 bg-gray-100'>
      <Text className='text-lg font-bold text-center mb-2'>Tambah To-Do</Text>

      <TextInput className='border p-2 rounded mb-2 bg-white' placeholder='Masukkan Judul To-Do' value={todoTitle} onChangeText={setTodoTitle} />

      <TouchableOpacity onPress={() => setDatePickerVisibility(true)} className='p-2 bg-blue-500 rounded'>
        <Text className='text-white text-center'>{selectedDate || 'Pilih Tanggal'}</Text>
      </TouchableOpacity>

      <Button title='Tambah To-Do' onPress={addTodo} />

      <DateTimePickerModal isVisible={isDatePickerVisible} mode='date' onConfirm={handleConfirmDate} onCancel={() => setDatePickerVisibility(false)} />

      <Calendar
        markedDates={todos.reduce((acc, todo) => {
          acc[todo.date] = { marked: true, dotColor: 'red' };
          return acc;
        }, {} as Record<string, any>)}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        enableSwipeMonths={true}
        theme={{
          calendarBackground: '#333248',
          textSectionTitleColor: 'white',
          textSectionTitleDisabledColor: 'pink',
          dayTextColor: 'red',
          todayTextColor: 'white',
          selectedDayTextColor: 'white',
          monthTextColor: 'white',
          indicatorColor: 'white',
          selectedDayBackgroundColor: '#333248',
          arrowColor: 'white',
          // textDisabledColor: 'red',
          stylesheet: {
            calendar: {
              header: {
                week: {
                  marginTop: 30,
                  marginHorizontal: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              },
            },
          },
        }}
      />
      <Text className='text-lg font-bold mt-4'>Daftar To-Do:</Text>
      <View>
        <FlatList
          data={todos.filter((todo) => todo.date === selectedDate)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text className='p-2 bg-gray-200 rounded mb-2'>{item.title}</Text>}
          ListEmptyComponent={<Text className='p-2 bg-gray-200 rounded mb-2'>Tidak Ada Kegiatan</Text>}
        />
      </View>
    </View>
  );
};

export default calendar;
