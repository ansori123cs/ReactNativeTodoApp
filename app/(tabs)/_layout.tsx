import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <View className='bg-accent flex flex-row w-full flex-1 min-w-[112px] min-h-16  mt-4 justify-center items-center rounded-full overflow-hidden'>
        <Image source={icon} tintColor='#fff' className='size-5' />
        <Text className='text-secondary text-base font-semibold ml-2 text-white'>{title}</Text>
      </View>
    );
  }
  return (
    <View className='size-full justify-center items-center mt-4 rounded-full '>
      <Image source={icon} tintColor='#A8b5db' className='size-5' />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
        tabBarStyle: { backgroundColor: '#8F87F1', borderRadius: 50, marginHorizontal: 20, marginBottom: 36, height: 52, position: 'absolute', overflow: 'hidden', borderWidth: 0, borderColor: '#8F87F1' },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.home} title='Home' />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Kalender',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.task} title='Kalender' />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.person} title='Profile' />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
