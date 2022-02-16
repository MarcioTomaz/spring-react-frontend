
import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';

import {mensagemSucesso, mensagemErro} from '../components/toastr'



class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    validar(){

        const msgs = [];
    
        if( !this.state.nome ){
            msgs.push('O campo Nome é obrigatório.')
        }

        if( !this.state.email ){

            msgs.push('O campo Email é obrigatório.')
        }else if( !this.state.email.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$') ){
            msgs.push("Informe um Email válido")
        }

        if( !this.state.senha || !this.state.senhaRepeticao){

            msgs.push('Digite a senha 2 vezes.');

        }else if( this.state.senha !== this.state.senhaRepeticao ){

            msgs.push('As senhas não batem.');
        }

        return msgs;
    }

    

    cadastrar = () => {

        const msgs = this.validar();

        if(msgs && msgs.length > 0 ){
            msgs.forEach( (msg, index) => 
            mensagemErro(msg) );

            return false;
        }

        const usuario = {

            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha            
        }

        this.service.salvar(usuario)
            .then( response => {

                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para continuar. ');
                this.props.history.push('/login');

            }).catch( error => {

                mensagemErro(error.response.data);
            })
    }

    cancelar = () =>{
        this.props.history.push('/login');
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input
                                    type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })}>
                                </input>
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })}>
                                </input>
                            </FormGroup>

                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputRepitaSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}>
                                </input>
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success mt-3">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger mt-3">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CadastroUsuario);