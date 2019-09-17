import React,{Component} from 'react';
import '../css/index.css';
import axios from 'axios';


class cadastrarUsuario extends Component {
	constructor(props){
		super(props);
		this.state = {
			body:{
				nome_completo:'',
				cpf:'',
				endereco:'',
				email:'',
			},
			validation:{
				nome_completo:'',
				cpf:'',
				endereco:'',
				email:'',
			},
			message:''
		}
	}
	_limparInputs(){
		this.setState({
			validation:{
				nome_completo:'',
				cpf:'',
				endereco:'',
				email:'',
			}
		});
	}
	 _editarErros (param,error) {
	    this.setState((prevState) => {
	      prevState.validation[param] = error;
	      return prevState;
	    });
	 }
	_cadastrar(){
		axios.post("http://localhost:8001/usuarios/cadastrar",this.state.body)
	      .then(res => {
	       	if(res.data.status == true){
	       		this.setState({message:res.data.message});
	       		setInterval(()=>{
					window.location.href = '/';
	       		},1000);
	       	}else{
	       		this._limparInputs();
	       		res.data.validation.forEach((input)=>{
	       			this._editarErros(input.param,input.msg);
	       		});
	       	}
	    }).catch((err)=>{
	      	console.log(err);
	    })
	}
	_updateField (event) {
	    let value = event.target.value;
	    let field = event.target.name;
	    this.setState((prevState) => {
	      prevState.body[field] = value;
	      return prevState;
	    });
	 }
	render() {
 	return (
 		<div>
	 		<header>
	 			<div className="Logo center">
					<h1>Controle de clientes</h1>
				</div>
	 		</header>
	 		<div className='main' >
	 			<div className='titulo'>
	 				<h1>Cadastrar cliente</h1>
	 			</div>
				<div>
					<form>
						<div className='input-container'>
							<label>Nome completo cliente:</label>
							<input type='text' name='nome_completo'  onChange={this._updateField.bind(this)} />
							<span>{this.state.validation.nome_completo}</span>
						</div>
						<div className='input-container'>
							<label>CPF cliente:</label>
							<input type='text' name='cpf' onChange={this._updateField.bind(this)}  />
							<span>{this.state.validation.cpf}</span>
						</div>
						<div className='input-container'>
							<label>Endereço cliente:</label>
							<input type='text' name='endereco'  onChange={this._updateField.bind(this)} />
							<span>{this.state.validation.endereco}</span>
						</div>
						<div className='input-container'>
							<label>E-mail cliente:</label>
							<input type='text' name='email'  onChange={this._updateField.bind(this)} />
							<span>{this.state.validation.email}</span>
						</div>
						<div className='input-container button'>
							<input type='button' value='Cadastrar cliente' onClick={this._cadastrar.bind(this)} />
						</div>
					</form>
					<div className='mensagem-salvo'>
						<h1>{this.state.message}</h1>
					</div>
				</div>
			</div>
	 	</div>
 		);
	}
}

export default cadastrarUsuario;
