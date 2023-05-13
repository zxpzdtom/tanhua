import React from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import WheelPicker from 'react-native-wheely';
import cities from '../../../assets/cities.json';

const CityPicker = ({ visible, onClose, onChange }) => {
  const [province, setProvince] = React.useState(0);
  const [city, setCity] = React.useState(0);
  const [district, setDistrict] = React.useState(0);
  const [key, setKey] = React.useState(Date.now());

  const provinces = Object.keys(cities);
  const selectedProvinceKey = provinces[province];
  const citiesInProvince = Object.keys(cities[selectedProvinceKey]);
  const districtsInCity = cities[selectedProvinceKey][citiesInProvince[city]];

  const handleProvinceChange = React.useCallback((value) => {
    setProvince(value);
    setCity(0);
    setDistrict(0);
    setKey(Date.now());
  }, []);

  const handleCityChange = React.useCallback((value) => {
    setCity(value);
    setDistrict(0);
    setKey(Date.now());
  }, []);

  const handleDistrictChange = React.useCallback((value) => {
    setDistrict(value);
  }, []);

  const handleCancel = React.useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleConfirm = React.useCallback(() => {
    const selectedDistrict = districtsInCity[district];
    onChange?.(selectedDistrict);
  }, [district, districtsInCity, onClose]);

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
            options={provinces}
            selectedIndex={province}
            onChange={handleProvinceChange}
            containerStyle={styles.picker}
          />
          <WheelPicker
            key={`${key}-city`}
            options={citiesInProvince}
            selectedIndex={city}
            onChange={handleCityChange}
            containerStyle={styles.picker}
          />
          <WheelPicker
            key={`${key}-district`}
            options={districtsInCity}
            selectedIndex={district}
            onChange={handleDistrictChange}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cancelButton: {
    color: 'red',
    fontSize: 18,
  },
  confirmButton: {
    color: 'blue',
    fontSize: 18,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  picker: {
    flex: 1,
    flexShrink: 0,
  },
});

export default CityPicker;
