import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useEffect } from 'react';

export default function Header(props) {
  useEffect(() => {
    }, []);

  function criarConta(e) {
    e.preventDefault();
    let email = document.getElementById('email-cadastro').value;
    let username = document.getElementById('name-cadastro').value;
    let senha = document.getElementById('senha-cadastro').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        updateProfile(auth.currentUser.user, {
          displayName : username
        });
      })
      .catch((error) => {
        alert(error.message);
        let modal = document.querySelector('.modalCriarConta');
        modal.style.display = 'none';
      });
    }

    function logar(e) {
      e.preventDefault();
      let email = document.getElementById('email-login').value;
      let senha = document.getElementById('senha-login').value;
      
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, senha)
        .then((authD) => {
            props.setUser(authD.user.displayName);
            alert('Login sucesso');
          })
          .catch((error) => {
              alert(error.message); 
          });
    }

  function abrirModalCriarConta(e) {
    e.preventDefault();
    let modal = document.querySelector('.modalCriarConta');
    modal.style.display = 'block';
  }

    function closeform() {
      let modal = document.querySelector('.modalCriarConta');
      modal.style.display = 'none';
    }
    
    return (
        <div className='center'>
            <div className='modalCriarConta'>
                <div className='formCriarConta'>
                    <div onClick={()=>closeform()} className='closeForm'>X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e)=>criarConta(e)}>
                        <input id='email-cadastro' type='text' placeholder='Seu email..'></input>
                        <input id='name-cadastro' type='text' placeholder='Seu username..'></input>
                        <input id='senha-cadastro' type='password' placeholder='Sua senha..'></input>
                        <input type='submit' name="acao" value='Criar'></input>
                    </form>
                </div>
            </div>

        <div className="header">
          <div className="header_logo">
            <a href=""><img src="https://th.bing.com/th/id/OIP.XMA9fSJNuyoox6nlKoQsYQHaCK?pid=ImgDet&rs=1" /></a>
          </div>
          {
            (props.user) ?
            <div className='header_logadoInfo'>
                <span>Olá, <b>{props.user}</b></span>
              <a href='#'>Postar</a>
            </div>
            :
            <div className='header_loginForm'>
              <form onSubmit={(e)=>logar(e)}>
                <input id="email-login" type='text' placeholder='Email' />
                <input id="senha-login" type='password' placeholder='Password' />
                <input type='submit' name='acao' value='Login in' />
              </form>
              <div className='btn_criarConta'>
                <a onClick={(e)=>abrirModalCriarConta(e)} href='#'>Criar conta</a>
              </div>
            </div>
          }
        </div>
      </div>
    );
}