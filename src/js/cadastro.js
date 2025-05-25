// cadastro.js

// Importa as funções de autenticação necessárias do Firebase
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// IMPORTANTE: Importa a instância 'auth' que você exportou do seu firebase-config.js
import { auth } from "./firebase-config.js"; 

// Obtém referências aos elementos do formulário no HTML
const cadastroForm = document.getElementById('cadastroForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const googleSignInButton = document.getElementById('googleSignInButton');

// Adiciona um "listener" para o evento de "submit" do formulário de cadastro
cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validação básica: verifica se as senhas são iguais
    if (password !== confirmPassword) {
        alert("As senhas não coincidem! Por favor, verifique.");
        return; // Interrompe a execução se as senhas não combinam
    }

    try {
        // Tenta criar um novo usuário com e-mail e senha usando a instância 'auth'
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; // O objeto do usuário recém-criado
        
        console.log("Usuário cadastrado com sucesso:", user);
        alert("Cadastro realizado com sucesso!");
        
        // Redireciona o usuário para a página de login ou para uma página de sucesso
        window.location.href = './login.html'; 
    } catch (error) {
        // Captura e trata os erros de autenticação do Firebase
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.error("Erro no cadastro:", errorCode, errorMessage);
        
        // Mensagens de erro mais amigáveis para o usuário
        if (errorCode === 'auth/email-already-in-use') {
            alert("Este e-mail já está em uso. Tente outro ou faça login.");
        } else if (errorCode === 'auth/invalid-email') {
            alert("O formato do e-mail é inválido.");
        } else if (errorCode === 'auth/weak-password') {
            alert("A senha é muito fraca (mínimo de 6 caracteres).");
        } else {
            alert(`Erro ao cadastrar: ${errorMessage}`);
        }
    }
});

// Adiciona um "listener" para o botão "Cadastrar com Google"
googleSignInButton.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider(); // Cria um provedor de autenticação Google
    try {
        // Tenta fazer login/cadastro com o pop-up do Google usando a instância 'auth'
        const result = await signInWithPopup(auth, provider);
        const user = result.user; // O objeto do usuário logado/cadastrado
        
        console.log("Usuário logado/cadastrado com Google:", user);
        alert("Login/Cadastro com Google realizado com sucesso!");
        
        // Redireciona o usuário para uma página inicial ou dashboard
        window.location.href = './home.html'; 
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.error("Erro no login/cadastro com Google:", errorCode, errorMessage);
        
        if (errorCode === 'auth/popup-closed-by-user') {
            alert("O pop-up de login com Google foi fechado.");
        } else {
            alert(`Erro ao logar/cadastrar com Google: ${errorMessage}`);
        }
    }
});