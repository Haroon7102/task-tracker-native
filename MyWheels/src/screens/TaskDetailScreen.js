// src/screens/TaskDetailScreen.js
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api/tasks';

const TaskDetailScreen = ({ route, navigation }) => {
    const { task } = route.params;
    const [taskTitle, setTaskTitle] = useState(task.title);

    const updateTask = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Session Expired', 'Please login again.');
                navigation.replace('Login');
                return;
            }

            const response = await fetch(`${API_URL}/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskTitle,
                    completed: task.completed,
                }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                console.log('Task Updated:', updatedTask);
                Alert.alert('Success', 'Task updated successfully.');
                navigation.goBack();
            } else {
                console.error('Update failed:', response.status);
                Alert.alert('Error', 'Failed to update task.');
            }
        } catch (error) {
            console.error('Update Error:', error);
            Alert.alert('Error', 'Something went wrong while updating.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.heading}>Update Your Task</Text>
            <TextInput
                style={styles.input}
                value={taskTitle}
                onChangeText={setTaskTitle}
                placeholder="Enter new task title"
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={updateTask}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6fd',
        padding: 20,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#b0c4de',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#10b981',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#4e8cff',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TaskDetailScreen;
