
import React from "react";

import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom';

import UsuarioService from "../app/service/usuarioService";

import LocalStorageService from "../app/service/localStorageService";

import {mensagemErro} from '../components/toastr'
class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = async () => {

        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha

        }).then( response => {

            LocalStorageService.adicionarItem('_usuario_logado', response.data );     

            this.props.history.push('/home')

        } ).catch( erro => {
            mensagemErro( erro.response.data )
        })
    }

    prepareCadastrar = () =>{
        this.props.history.push('/cadastro-usuarios');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', margin: 'auto' }} >
                    <div className="bs-docs-section">
                        <Card title="Login" >                       
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup
                                                label="Email: *"
                                                htmlForm="exampleInputEmail1">
                                                <input
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email">
                                                </input>
                                            </FormGroup>

                                            <FormGroup
                                                label="Senha *"
                                                htmlForm="exampleInputPassword1">
                                                <input
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    type="password"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password">
                                                </input>

                                            </FormGroup>

                                            <button onClick={this.entrar} className="btn btn-success mt-3">Entrar</button>
                                            <button onClick={this.prepareCadastrar} className="btn btn-danger mt-3">Cadastrar</button>

                                        </fieldset>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( Login );