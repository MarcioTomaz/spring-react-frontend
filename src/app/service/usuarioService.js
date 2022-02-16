
import ApiService from "../apiservice";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        
        const item =  this.post('/autenticar', credenciais);

        return item; 
    }

    obterSaldoPorUsuario(id){

        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        
        return this.post('/', usuario);
    }
}

export default UsuarioService;