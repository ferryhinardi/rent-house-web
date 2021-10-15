import { View, StyleSheet } from 'react-native';
import Header from 'components/Header';

export default function Custom404() {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <h1>Sorry, Page Not Found!</h1>
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
