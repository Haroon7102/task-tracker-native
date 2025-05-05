import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api/tasks';

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTasks = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Session Expired', 'Please login again.');
                navigation.replace('Login');
                return;
            }

            const response = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                Alert.alert('Session Expired', 'Your session has expired. Please login again.');
                await AsyncStorage.removeItem('token');
                navigation.replace('Login');
                return;
            }

            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Fetch Error:', error);
            Alert.alert('Error', 'Something went wrong while fetching tasks.');
        }
    }, [navigation]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchTasks);
        return unsubscribe;
    }, [navigation, fetchTasks]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTasks().then(() => setRefreshing(false));
    }, [fetchTasks]);

    const deleteTask = async (taskId) => {
        if (!taskId) {
            console.error('Error: Task ID is undefined!');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                fetchTasks(); // refresh task list
            } else if (response.status === 401) {
                Alert.alert('Session Expired', 'Your session has expired. Please login again.');
                await AsyncStorage.removeItem('token');
                navigation.replace('Login');
            } else {
                console.error('Failed to delete task.');
            }
        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                onPress: async () => {
                    await AsyncStorage.removeItem('token');
                    navigation.replace('Login');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Task List</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item, index) => (item?._id ? item._id.toString() : index.toString())}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) =>
                    item ? (
                        <View style={styles.taskCard}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TaskDetail', { task: item })}
                                style={styles.taskTextContainer}
                            >
                                <Text style={styles.taskText}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTask(item._id)} style={styles.deleteButton}>
                                <Ionicons name="trash-outline" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f2937',
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        padding: 10,
        borderRadius: 12,
        shadowColor: '#ef4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    taskCard: {
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    taskTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    taskText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#111827',
    },
    deleteButton: {
        backgroundColor: '#dc2626',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#10b981',
        padding: 20,
        borderRadius: 60,
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
});
export default HomeScreen;