import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateTimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  value: Date;
  onChange: (value: Date) => void;
  mode?: "date" | "time";
}

const DateTimePickerModal: React.FC<DateTimePickerModalProps> = ({
  visible,
  onClose,
  value,
  onChange,
  mode = "date",
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleCancel = () => {
    setInternalValue(value);
    onClose();
  };

  const handleDone = () => {
    onChange(internalValue);
    onClose();
  };

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableWithoutFeedback onPress={handleCancel}>
              <Text style={styles.cancel}>取消</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.title}>
              {mode === "date" ? "选择日期" : "选择时间"}
            </Text>
            <TouchableWithoutFeedback onPress={handleDone}>
              <Text style={styles.done}>完成</Text>
            </TouchableWithoutFeedback>
          </View>
          <DateTimePicker
            value={internalValue}
            mode={mode}
            display="spinner"
            onChange={(event, date) => setInternalValue(date)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "80%",
    maxHeight: "80%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  cancel: {
    fontSize: 16,
    color: "#007AFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  done: {
    fontSize: 16,
    color: "#007AFF",
  },
});

export default DateTimePickerModal;
