import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import CircleList from '../../components/CircleList';

const CircleScreen = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <Tab value={activeIndex} onChange={setActiveIndex}>
        <Tab.Item title="推荐" />
        <Tab.Item title="好友" />
      </Tab>
      <TabView value={activeIndex} onChange={setActiveIndex}>
        <TabView.Item style={styles.container}>
          <CircleList type="recommendation" />
        </TabView.Item>
        <TabView.Item style={styles.container}>
          <CircleList type="friend" />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CircleScreen;
