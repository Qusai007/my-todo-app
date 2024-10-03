import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim() !== '') {
      setTasks([...tasks, { title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleTaskStatus = (index) => {
    const newTasks = [...tasks];
    newTasks[index].status = !newTasks[index].status;
    setTasks(newTasks);
  };

  const renderTask = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <View style={{ flex: 1 }}>
        <Text style={item.status ? styles.taskDone : styles.taskText}>{item.title}</Text>
      </View>
      <Switch value={item.status} onValueChange={() => toggleTaskStatus(index)} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(index)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#FF7E5F', '#FFB88C']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Colorful To-Do App</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            placeholderTextColor="#fff"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
  taskText: {
    fontSize: 18,
    color: '#fff',
  },
  taskDone: {
    fontSize: 18,
    color: '#fff',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
