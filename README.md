# LinkedIn Clone

## Overview

This project is a LinkedIn Clone built using **React and Redux**, along with **Firebase** for backend services. It aims to replicate key functionalities of LinkedIn, providing a professional networking platform where users can connect, share posts.

## Features

- **Authentication**: User authentication via Google Sign-In using Firebase.
- **User Profiles**: Users can create profiles with profile pictures.
- **Posts**: Users can create, edit, and delete posts, including text, images, and videos.
- **Social Interactions**: Like, comment, and share posts.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.
- Firebase project setup with appropriate configurations.

## Project Structure

- `public/`: Static assets like images.
- `src/`: Main source code directory.
  - `Components/`: React components.
  - `redux/`: Redux setup for state management.
    - `API/`: API actions for Firebase interaction.
    - `app/`: Redux store configuration.
    - `reducers/`: Redux reducers for handling state changes.
  - `firebase.js`: Firebase configuration and initialization.
  - `index.html`: Main HTML file.
  - `main.jsx`: Entry point for the React application.
  - `App.jsx`: Main application component.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling.
- **Firebase**: Backend as a Service (BaaS) providing authentication, database, and storage.
- **Redux**: State management library.
- **Styled-Components**: Library for styling React components.
