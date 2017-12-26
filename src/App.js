import React, { Component } from 'react';
import Matrix from './Matrix.js'
import Myself from './MySelf.js'
import {Router,Route,browserHistory} from 'react-router'
import './App.css';
// import $ from 'jquery'



class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                    <Route path="/" component={Matrix} />
                    <Route path="/cxy" component={Myself} />


            </Router>

        );
    }
}

// class App extends Component {
//
//     readHTML(){
//         $.ajax({
//             url:"testtxt.txt",
//             async:false,
//             success:function(data){
//                 // alert(data)
//                 console.log(data)
//             }
//         });
//     }
//
//     render() {
//         return (
//             <input type="submit" onClick={()=>{this.readHTML()}}/>
//
//         );
//     }
// }

export default App;
