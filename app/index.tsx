import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState
} from "react";

import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import Header from '../components/Header';

interface TaskData {
  id: string,
  desc: string,
  status: boolean,
}

export default function App() {

  const [todoList, setTodoList] = useState<TaskData[]>(
    [
      { id: String(uuid.v4()), desc: "Do quiz1", status: true },
      { id: String(uuid.v4()), desc: "Do quiz2", status: true },
      { id: String(uuid.v4()), desc: "Do lab1", status: false },
      { id: String(uuid.v4()), desc: "Do lab2", status: false },
    ]
  )

  const renderTask = ({ item }: any) => {

    const deleteItem = async () => {
      console.log("* delete item: " + item.id)

      const newTodoList: TaskData[] = [];

      todoList.filter(t => t.id != item.id).map(
        (t) => {
          console.log(t)
          newTodoList.push(t)
        }
      )
      setTodoList(newTodoList)
    }

    const changeStatus = async () => {
      console.log("* change status: " + item.id)

      const newTodoList: TaskData[] = [];

      todoList.map(
        (t) => {
          if (t.id == item.id) {
            t.status = !t.status
          }
          newTodoList.push(t)
        }
      )
      setTodoList(newTodoList)
    }

    return (
      <>
        <Text></Text>
        <Text></Text>
        <Text>{item.id} </Text>
        <Text>{item.desc}</Text>
        <Text>----------------------------</Text>
        <TouchableOpacity onPress={deleteItem}>
          <Ionicons name='trash-bin-outline' size={24} color="red" />
        </TouchableOpacity>
        <Switch
          value={item.status}
          onValueChange={changeStatus}
        />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Header title="Todo Input" />
      <View style={{}} >
        <TextInput placeholder="Enter Todo" />
        <TouchableOpacity>
          <Text> Add Item</Text>
        </TouchableOpacity>
      </View >

      <Header title="Todo List" />
      <View>
        <FlatList
          data={todoList}
          renderItem={renderTask}
          keyExtractor={(todoList) => todoList.id} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
