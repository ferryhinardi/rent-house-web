import { View, StyleSheet } from 'react-native';
import Header from 'components/Header';

export default function Custom500() {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <h1>Sorry, Server-side error occurred!</h1>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
