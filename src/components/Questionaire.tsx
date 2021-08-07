import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

function Questionaire() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Start Here'}</Text>
      <Text style={styles.subtitle}>{'Where do you want to move?'}</Text>
      <TextInput placeholder="name 1" style={styles.textInput} />
      <TextInput placeholder="name 2" style={styles.textInput} />
      <TextInput placeholder="name 3" style={styles.textInput} />
      <TextInput placeholder="name 4" style={styles.textInput} />
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitText}>{'Find My Home'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: 2,
    borderColor: '#D69E2E',
    padding: 60,
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: 36,
    lineHeight: 36,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 28,
    marginVertical: 12,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#1A365D',
  },
  submitButton: {
    marginTop: 36,
    paddingVertical: 16,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#1A365D',
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
  },
});

export default Questionaire;
