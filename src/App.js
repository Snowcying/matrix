import React, { Component } from 'react';
import { Button } from 'antd';
import Matrix from './Matrix.js'
import './App.css';



class App extends Component {
    render() {
        return (
            <div className="App">
                <Button type="primary">Button</Button>
                <Matrix/>
            </div>
        );
    }
}

export default App;
