import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Tab, TabView, Icon } from "@rneui/themed";
import CircleList from "../../components/CircleList";

const CircleScreen = ({ navigation }) => {
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
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <Icon type="feather" name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CircleScreen;
