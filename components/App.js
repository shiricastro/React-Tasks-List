import React, { Component } from 'react';
import{
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Home from './Home';
import AddTodo from './AddTodo';

export default class App extends Component {
  render() {
    return (
    	<Router>
    		<div>
                <nav >
                 <ul className="navList">
                     <li><Link to="/Home">Home Management</Link></li>
                     <li><Link to="/AddTodo">Add Todo</Link></li>
                 </ul>
                </nav>
    			<Route path="/Home" component={Home}/>
    			<Route path="/AddTodo" component={AddTodo} />
    		</div>
    	</Router>
    );
  }
}


