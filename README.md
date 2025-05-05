MyWheels - Task Tracker Native
Welcome to MyWheels, a React Native-based reminder application designed to help users manage vehicle maintenance schedules and other tasks efficiently. This is a beginner-friendly project that combines a React Native frontend with a Node.js backend, featuring token-based authentication and core task management functionalities. The app aims to provide a seamless experience for users to stay on top of their vehicle maintenance reminders and other tasks through timely notifications.
This repository, task-tracker-native, contains the complete source code for the MyWheels application. Below, you'll find a comprehensive guide to the project, including its features, setup instructions, usage, and more.
Table of Contents

Project Overview
Features
Tech Stack
Getting Started
Prerequisites
Installation
Running the Backend
Running the Frontend


Usage
Registering a User
Signing In
Managing Tasks
Notifications


Project Structure
Future Enhancements
Contributing
License
Contact

Project Overview
MyWheels is a mobile application built as a beginner's first React Native project. The primary goal of the app is to assist users in tracking vehicle maintenance tasks, such as oil changes, tire rotations, or service appointments, by providing timely reminders. Beyond vehicle maintenance, the app also serves as a general task management tool, allowing users to create, update, and delete tasks with deadlines.
The app uses token-based authentication to ensure secure user access. Once registered, users can sign in, manage their tasks, and receive notifications when a task's due time approaches. The name "MyWheels" reflects the app's focus on vehicle-related reminders, symbolizing the importance of keeping your vehicle "rolling" smoothly.
This project is a great starting point for those learning React Native and Node.js, as it covers essential concepts like API integration, state management, and mobile notifications.
Features

User Authentication:
Register a new user with email and password.
Sign in securely using token-based authentication (JWT).


Task Management:
Create tasks with a title, description, and due date/time.
Update existing tasks to modify details.
Delete tasks when no longer needed.


Notifications:
Receive push notifications when a task's due time is approaching.
Customizable reminders for vehicle maintenance or general tasks.


User-Friendly Interface:
Clean and intuitive UI built with React Native.
Responsive design for various mobile devices.


Secure Backend:
Node.js backend with RESTful APIs.
Secure storage of user credentials and task data.



Tech Stack

Frontend:
React Native: For building the cross-platform mobile application.
React Navigation: For handling navigation between screens.
Axios: For making HTTP requests to the backend.
React Native Push Notification: For implementing push notifications.


Backend:
Node.js: For building the server-side application.
Express.js: For creating RESTful APIs.
MongoDB: For storing user and task data.
JSON Web Tokens (JWT): For token-based authentication.
Bcrypt: For hashing user passwords.


Tools & Utilities:
Git: For version control.
npm: For package management.
Expo CLI: For easier React Native development and testing.



Getting Started
Follow the instructions below to set up and run the MyWheels application locally.
Prerequisites
Ensure you have the following installed:

Node.js (v16 or higher)
npm (v8 or higher)
MongoDB (local or cloud instance, e.g., MongoDB Atlas)
Expo CLI (npm install -g expo-cli)
React Native development environment (follow React Native setup guide)
An Android/iOS emulator or physical device for testing

Installation

Clone the Repository:
git clone https://github.com/your-username/task-tracker-native.git
cd task-tracker-native


Install Backend Dependencies:Navigate to the backend directory and install dependencies.
cd backend
npm install


Install Frontend Dependencies:Navigate to the frontend directory and install dependencies.
cd ../frontend
npm install


Set Up Environment Variables:

In the backend directory, create a .env file and add the following:MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
PORT=5000


In the frontend directory, create a .env file (if needed) for API URL:API_URL=http://localhost:5000/api





Running the Backend

Start the MongoDB server (if running locally).
In the backend directory, run:npm start


The backend server will run on http://localhost:5000.

Running the Frontend

In the frontend directory, start the Expo development server:npm start


Use the Expo Go app on your mobile device or an emulator to scan the QR code and launch the app.

Usage
Once the app is running, you can use the following features:
Registering a User

Open the app and navigate to the Register screen.
Enter your email, password, and any other required details.
Submit the form to create a new account.

Signing In

On the Sign In screen, enter your registered email and password.
Upon successful authentication, you'll be redirected to the task dashboard.

Managing Tasks

Create a Task:
Click the "Add Task" button.
Enter the task title, description, and due date/time.
Save the task to add it to your list.


Update a Task:
Select an existing task from the list.
Edit the task details and save changes.


Delete a Task:
Select a task and choose the "Delete" option to remove it.



Notifications

When a task's due time approaches, the app will send a push notification to remind you.
Ensure notifications are enabled on your device for the MyWheels app.

Project Structure
The repository is organized into two main directories:
task-tracker-native/
├── backend/                  # Node.js backend code
├── ├── src/
│       ├── config/               # Database configuration
│       ├── models/               # MongoDB schemas
│       ├── routes/               # API routes
│   ├── .env                  # Environment variables
│   └── server.js             # Entry point for backend
├── MyWheels/                 # React Native frontend code
│   ├── assets/               # Images and static files
├── ├── src/
│       ├── context/           # Reusable UI components
│       ├── screens/              # App screens (e.g., Register, SignIn, Tasks)
│       ├── navigation/           # Navigation setup
│   ├── .env                  # Environment variables
│   └── App.js                # Entry point for frontend
├── README.md                 # Project documentation
└── package.json              # Project metadata and scripts

Future Enhancements
As this is a beginner project, there are several opportunities for improvement:

Task Categories: Allow users to categorize tasks (e.g., vehicle maintenance, personal, work).
Recurring Tasks: Support tasks that repeat daily, weekly, or monthly.
Offline Support: Enable task management when the device is offline.
UI/UX Improvements: Enhance the design with animations and better styling.
Analytics: Add a dashboard to track task completion rates.
Cloud Sync: Sync tasks across multiple devices using a cloud service.

Contributing
Contributions are welcome! If you'd like to contribute to MyWheels, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request with a detailed description of your changes.

Please ensure your code follows the project's coding style and includes appropriate tests.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For any questions or suggestions, feel free to reach out:

Email: your-email@example.com
GitHub: your-username

Thank you for exploring MyWheels! Happy task tracking and vehicle maintenance! 🚗
