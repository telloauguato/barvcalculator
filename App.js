import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      marginTop: 10,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: '#212121',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  const [base, setBase] = useState(7);
  const [reason, setReason] = useState(0);
  const [variation, setVariation] = useState(-1);
  const lambda = variation < 0 ? base + reason : base - reason;
  const result =
    base * (Math.pow(base, 2) - Math.pow(reason, 2) + variation * lambda);

  const handleBase = (value) => {
    if (value === '' || value <= 0) return setBase(1);
    setBase(value);
  };
  const handleReason = (value) => {
    if (value === '' || value < 0) return setReason(0);
    if (value >= base) return setReason(base - 1);
    setReason(value);
  };
  const handleVariation = (value) => {
    if (value === '') return setVariation(0);
    if (Math.abs(value) >= base - reason)
      return setVariation(value > 0 ? base - reason - 1 : -(base - reason - 1));
    setVariation(value);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [changer, setChanger] = useState('base');

  const handleValues = (value) => {
    if (changer === 'base') handleBase(value);
    if (changer === 'reason') handleReason(value);
    if (changer === 'variation') handleVariation(value);
  };

  const getValues = (key) => {
    if (key === 'base') return base;
    if (key === 'reason') return reason;
    if (key === 'variation') return variation;
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>bλrv Calculator</Text>
      <Text style={{ fontSize: 50 }}>
        <Text
          onPress={() => {
            setModalVisible(true);
            setChanger('base');
          }}>
          {base}
        </Text>
        λ
        <Text
          onPress={() => {
            setModalVisible(true);
            setChanger('reason');
          }}>
          {reason}
        </Text>
        <Text
          onPress={() => {
            setModalVisible(true);
            setChanger('variation');
          }}
          style={{ fontSize: 30 }}>
          {variation}
        </Text>
      </Text>
      <Text style={{ fontSize: 50 }}>{result}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change {changer}</Text>
            <NumericInput
              value={getValues(changer)}
              onChange={handleValues}
              valueType="real"
              textColor="#B0228C"
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor="#212121"
              leftButtonBackgroundColor="#212121"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Change</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
