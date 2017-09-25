import React from 'react';
import axios from 'axios'; 
import{
	Link
} from 'react-router-dom';

export default class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dataPersons:[],
			description:"",
			person:""
		}
	}
	inputChange(e){
		this.setState({
			[e.target.id]:e.target.value
		});
	}
	componentDidMount(){
		axios.get('http://localhost:3000/Person').then(response => {
			const data = response.data;
			this.setState({
				dataPersons:data		
			});
		});	
	}
	addTask(e){
		e.preventDefault();			
		const {description, person} = this.state; 
		console.log("we save the values");
		axios.post('http://localhost:3000/Tasks', {
			task: description,
			person: person
		})
		.then(function (response) {
			this.props.history.push('/Home');
		    console.log(response);		    
		}.bind(this))
		.catch(function (error) {
		    console.log(error);
		});
	}
	render(){
			return <div className="newBook">
			<form>
				<h2>Add New Task</h2>
				<div className="formWrap">
					<div className="wrapLabels">
						<label>
							<span>Description: </span>
							<input type="text" value={this.state.description} id="description" onChange={e => this.inputChange(e)}/>
						</label>
						<label>
							<span>Family Member: </span>
							<select id="person" value={this.state.person} onChange={e => this.inputChange(e)}>
								<option disabled>Select Person</option>
								{this.state.dataPersons.map((x,idx)=> (<option key={idx} value={x._id}>{x.name}</option>))}
							</select>
						</label>
					</div>
				</div>
				<button type="submit" onClick={e => this.addTask(e)}>Add Task</button>								
			</form>			
			</div>
		

	}
}
