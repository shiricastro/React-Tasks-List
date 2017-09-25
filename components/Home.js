import React from 'react';
import axios from 'axios'; 


export default class TodoList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:[],
		}
	}

	componentDidMount(){
		axios.get('http://localhost:3000/Tasks').then(response => {
			const dataVal = response.data;
			this.setState({
				data:dataVal			
			});
		});	

	}

	render(){
		return(<div className="homeContainer">
			<h1>Home Management</h1>
			<h3>Todo List</h3>
			<div className="Tabelwrap">
				<table>
					<thead>
						<tr>
							<th>Description</th>
							<th>Date</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((x,idx)=>(
						<tr key={idx}>
							<td>{x.task}</td>
							<td>{x.date.slice(0, 10)}</td>
							<td>{x.person.name}</td>
						</tr>
						))}	
					</tbody>
				</table>
			</div>
		</div>);
	}
}
