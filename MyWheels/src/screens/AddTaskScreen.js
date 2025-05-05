import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddTaskScreen = ({ navigation }) => {
    const [taskTitle, setTaskTitle] = useState('');

    const addTask = async () => {
        if (!taskTitle.trim()) { return; }
        const response = await fetch('http://10.0.2.2:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: taskTitle }),
        });

        if (response.ok) {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Add New Task</Text>

            {/* Input Field */}
            <TextInput
                style={styles.input}
                placeholder="Enter Task Title..."
                placeholderTextColor="#999"
                value={taskTitle}
                onChangeText={setTaskTitle}
            />

            {/* Add Button */}
            <TouchableOpacity
                style={[styles.addButton, !taskTitle.trim() && styles.disabledButton]}
                onPress={addTask}
                disabled={!taskTitle.trim()}
            >
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});

export default AddTaskScreen;
