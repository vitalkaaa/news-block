import React, { Component } from 'react';
import './App.css';
import News from './News'
import news_data from './news_content'


class App extends Component {
    render(){
        return (
            <div>
                <News news={news_data}/>
            </div>);
    }
}
export default App;
