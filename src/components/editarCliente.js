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
			message:'',
			params:this.props.match.params.cpf
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
	 _buscar(){
	 	let cpf = this.state.params;

		axios({
		  method: 'get',
		  url: 'http://localhost:8001/usuarios/pesquisa/'+cpf
		}).then(res => {
	       if(res.data.status == false){
	       	this.setState({message:res.data.message});
	       }else{
	       	this.setState({body: {
					nome_completo:res.data.usuarios[0].nome_completo,
					cpf:res.data.usuarios[0].cpf,
					endereco:res.data.usuarios[0].endereco,
					email:res.data.usuarios[0].email
				}
			});
	       }
	  }).catch((err)=>{
      	console.log(err);
      })
	}
	 componentDidMount() {
	 	 this._buscar();
	}
	_alterar_informacoes(){

		let cpf = this.state.params;

		axios.put('http://localhost:8001/usuarios/editar/'+cpf,this.state.body)
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
	 				<h1>Alterar cliente</h1>
	 			</div>
				<div>
					<form>
						<div className='input-container'>
							<label>Nome completo cliente:</label>
							<input type='text' name='nome_completo' value={this.state.body.nome_completo}  onChange={this._updateField.bind(this)} />
							<span>{this.state.validation.nome_completo}</span>
						</div>
						<div className='input-container'>
							<label>CPF cliente:</label>
							<input type='text' name='cpf' value={this.state.body.cpf} onChange={this._updateField.bind(this)}  />
							<span>{this.state.validation.cpf}</span>
						</div>
						<div className='input-container'>
							<label>Endereço cliente:</label>
							<input type='text' name='endereco' value={this.state.body.endereco}  onChange={this._updateField.bind(this)} />
							<span>{this.state.validation.endereco}</span>
						</div>
						<div className='input-container'>
							<label>E-mail cliente:</label>
							<input type='text' name='email' value={this.state.body.email}  onChange={this._updateField.bind(this)} />
							<span>{this.state.validation.email}</span>
						</div>
						<div className='input-container button'>
							<input type='button' value='Alterar cliente' onClick={this._alterar_informacoes.bind(this)} />
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
