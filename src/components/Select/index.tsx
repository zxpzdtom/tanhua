import React from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import WheelPicker from "react-native-wheely";

const Select = ({ visible, onClose, onChange, options, value }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    Math.max(options.indexOf(value), 0)
  );

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onChange(options[selectedIndex]);
    onClose();
  };

  const handleValueChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelButton}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm}>
            <Text style={styles.confirmButton}>确定</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <WheelPicker
            options={options}
            selectedIndex={selectedIndex}
            onChange={handleValueChange}
            containerStyle={styles.picker}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cancelButton: {
    color: "red",
    fontSize: 18,
  },
  confirmButton: {
    color: "blue",
    fontSize: 18,
  },
  pickerContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  picker: {
    flex: 1,
    flexShrink: 0,
  },
});

export default Select;
