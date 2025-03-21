import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CustomButton = ({ text, textColor, bgColor }: any) => {
  return (
    <TouchableOpacity className={`bg-${bgColor}`}>
      <Text className={`text-${textColor} text-bold`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
