import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/Header';

interface Todo {
  id: string,
  desc: string
}


export default function Index() {
  return (
    <SafeAreaView>
      <Header title="Todo Input" />
      <View style={styles.center} >
        <TextInput placeholder="Enter Todo" />
        <TouchableOpacity>
          <Text> Add Item</Text>
        </TouchableOpacity>
      </View >
      <Header title="Todo List" />

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  center: {
  }
});