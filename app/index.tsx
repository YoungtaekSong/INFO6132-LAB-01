import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
      { id: String(uuid.v4()), desc: "Do lab1", status: true },
      { id: String(uuid.v4()), desc: "Do quiz2", status: true },
      { id: String(uuid.v4()), desc: "Do lab2", status: true },
    ]
  )
  const [todoDesc, setTodoDesc] = useState('')
  const [disabledAddButton, setDisabledAddButton] = useState(true)

  const addTask = async () => {
    console.log("* add item : " + todoDesc)

    if (todoDesc == "") {
      console.log("is blank")
      alert("Please input description for Todo.")
      return
    }

    var duplicateFlag: Boolean = false

    todoList.map((t) => {
      if (t.desc == todoDesc) { duplicateFlag = true; return; }
    })

    if (duplicateFlag) {
      alert("Description is duplicated.")
      return
    }

    const newTodoList = [...todoList]
    newTodoList.push({ id: String(uuid.v4()), desc: todoDesc, status: true })
    setTodoList(newTodoList)
  }

  const onChangeTextDesc = async (desc: any) => {
    setDisabledAddButton(!!(desc == ""))
    setTodoDesc(desc)
  }

  const renderTask = ({ item }: any) => {

    const deleteItem = async () => {
      console.log("* delete item: " + item.id)
      const newTodoList: TaskData[] = [];
      todoList.filter(t => t.id != item.id).map((t) => { newTodoList.push(t) })
      setTodoList(newTodoList)
    }

    const changeStatus = async () => {
      console.log("* change status: " + item.id)
      const newTodoList: TaskData[] = [];
      todoList.map((t) => { if (t.id == item.id) { t.status = !t.status } newTodoList.push(t) })
      setTodoList(newTodoList)
    }

    return (
      <View style={styles.taskContainer}>
        <Text>Key: {item.id.split("-")[0]} </Text>
        <Text>Task: {item.desc}</Text>
        <TouchableOpacity onPress={deleteItem}>
          <Ionicons name='trash-bin-outline' size={24} color="red" />
        </TouchableOpacity>
        <Switch
          value={item.status}
          onValueChange={changeStatus}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

      <Header title="Todo List" />

      <TextInput
        style={styles.taskInput}
        placeholder="Enter the task's description"
        onChangeText={desc => onChangeTextDesc(desc)}
      />
      <TouchableOpacity
        style={disabledAddButton ? styles.addTaskButtonDisabled : styles.addTaskButton}
        onPress={addTask}
        disabled={disabledAddButton}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList style={styles.todoListContainer}
        data={todoList}
        renderItem={renderTask}
        keyExtractor={(todoList) => todoList.id} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  todoListContainer: {
    width: "100%"
  },
  taskContainer: {
    borderBlockColor: "#CFCFCF",
    borderTopWidth: 1,
    borderBottomWidth: 4,
    borderLeftWidth: 0.2,
    borderRightWidth: 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: "#CFCFCF",
    width: "95%",
    padding: 10,
    margin: 10
  },
  addTaskButton: {
    backgroundColor: '#EB8634',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addTaskButtonDisabled: {
    backgroundColor: '#CFCFCF',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18
  },
});
