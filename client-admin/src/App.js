import React from "react";
import './App.css';
import MyProvider from "./contexts/MyProvider";
import MainComponent from "./components/MainComponent";
import LoginComponent from "./components/LoginComponent"
class App extends React.Component {
    render() {
        return (
            <MyProvider>
                <LoginComponent />
                <MainComponent />
            </MyProvider>
        );
    }
}

export default App;