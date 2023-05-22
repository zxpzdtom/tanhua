import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

interface EmptyProps {
  type?: 'no_data' | 'network_error';
  onPress?: () => void;
}

const Empty: React.FC<EmptyProps> = ({ type = 'no_data', onPress }) => {
  let iconName: string, text: string;
  switch (type) {
    case 'no_data':
      iconName = 'inbox';
      text = '暂无数据';
      break;
    case 'network_error':
      iconName = 'wifi-off';
      text = '网络错误，请检查网络后重试';
      break;
    default:
      iconName = 'inbox';
      text = '暂无数据';
      break;
  }

  return (
    <View style={styles.container}>
      <Icon name={iconName} type="feather" size={100} color="#999" />
      <Text style={styles.text}>{text}</Text>
      {onPress && <Text style={styles.button} onPress={onPress}>重新加载</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  button: {
    fontSize: 16,
    color: '#007aff',
    marginTop: 20,
  },
});

export default Empty;
