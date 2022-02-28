
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

    cadastrar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state;

        const usuario = { nome, email, senha, senhaRepeticao }

        try{
            this.service.validar(usuario);

        }catch( erro ){

            const msg = erro.mensagens;
            msg.forEach( msg => mensagemErro(msg) )

            return false;
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