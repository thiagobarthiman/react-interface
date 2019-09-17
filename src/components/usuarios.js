import React,{Component} from 'react';
import '../css/index.css';
import axios from 'axios';

class usuarios extends Component {
	constructor(props){
		super(props);
		this.state = {
		   usuarios: [],
		   message:'',
		   pesquisa:''
		}
	}
	_refresh(){
	  axios.get("http://localhost:8001/usuarios")
      .then(res => {
        this.setState({ usuarios:res.data.usuarios });
      }).catch((err)=>{
      	console.log(err);
      });
	}
	_inputPesquisa(event){
		 this.setState({pesquisa:event.target.value});
	}
	_pesquisarUsuario(){
		axios({
		  method: 'get',
		  url: 'http://localhost:8001/usuarios/pesquisa/'+this.state.pesquisa
		}).then(res => {
	       if(res.data.status == false){
	       	this.setState({message:res.data.message});
	       }else{
	       	this.setState({usuarios:res.data.usuarios});
	       }
	  }).catch((err)=>{
      	console.log(err);
      })
	}
 	componentDidMount() {
	  this._refresh();
	}
	_excluirRegistro(id){
		axios({
		  method: 'delete',
		  url: 'http://localhost:8001/usuarios/deletar/'+id
		}).then(res => {
	       this.setState({message:res.data.message});
	       this._refresh();
      }).catch((err)=>{
      	console.log(err);
      })
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
		 			<div>
						<h1>Clientes cadastrados</h1>
		 			</div>
	 			</div>
	 			<div>
	 				<form className='form-pesquisa'>
	 					<div className='flex-1'>
	 						<input type='text' name='pesquisa' onChange={this._inputPesquisa.bind(this)} placeholder='Pesquisar cpf:06938907110'  />
	 					</div>
	 					<div className='flex-2'>
	 						<input type='button' value='Pesquisar'  onClick={()=>this._pesquisarUsuario()} />
	 					</div>
	 				</form>
	 			</div>
	 			<div className='mensagem-salvo'>
					<h1>{this.state.message}</h1>
				</div>
				<div className='table'>
					<table>
						<thead>
							<tr>
								<th>Nome completo </th>
								<th>CPF</th>
								<th>Endereço</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody id="lista_contatos">
							{this.state.usuarios.map((usuario,i) =><tr key={i}>
								<td>{usuario.nome_completo}</td>
								<td>{usuario.cpf}</td>
								<td>{usuario.endereco}</td>
								<td>{usuario.email}</td>
								<td><a onClick={()=>this._excluirRegistro(usuario.cpf)}>Excluir</a></td>
								<td><a className='a' href={`/editar-cliente/${usuario.cpf}`}>Editar</a></td>
							</tr>)}
						</tbody>
					</table>
				</div>
				<div className='btn'>
	 				<a href='/cadastrar-cliente'><button>Cadastrar usuário</button></a>
	 			</div>
			</div>
	 	</div>
 		);
	}
}

export default usuarios;
