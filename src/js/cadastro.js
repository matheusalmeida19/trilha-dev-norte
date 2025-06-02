
const firebaseConfig = {
  apiKey: "AIzaSyBMKWLVOvswkRXT46h8xdBJTP9JwPJbC50",
  authDomain: "trilha-dev-norte.firebaseapp.com",
  projectId: "trilha-dev-norte",
  storageBucket: "trilha-dev-norte.firebasestorage.app",
  messagingSenderId: "407164778288",
  appId: "1:407164778288:web:a315098492f4c33af5",
  measurementId: "G-EY35EF1BQX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const auth = firebase.auth();

let analytics = null;
if (typeof window !== "undefined" && firebase.analytics) {
  analytics = firebase.analytics();
}

const formCadastro = document.getElementById("cadastroForm");
const inputEmail       = document.getElementById("email");
const inputSenha       = document.getElementById("password");
const inputConfirma    = document.getElementById("confirmPassword");
const botaoGoogle      = document.getElementById("googleSignInButton");



function exibirMensagem(texto) {
  
  alert(texto);
}


// gente, essa é a Função de cadastro por e‑mail/senha

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email        = inputEmail.value.trim();
  const senha        = inputSenha.value;
  const confirma     = inputConfirma.value;

  if (senha !== confirma) {
    exibirMensagem("As senhas não conferem. Tente novamente.");
    return;
  }

  try {
    
    const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
    
    exibirMensagem("Usuário cadastrado com sucesso!");
    formCadastro.reset();
   
  } catch (error) {
    exibirMensagem("Erro ao cadastrar: " + error.message);
  }
});

// apenas acrescentando a funcionalidade de login com Google, mas nao funciona

botaoGoogle.addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
   
    exibirMensagem("Autenticado com Google: " + result.user.email);
   
  } catch (error) {
    exibirMensagem("Erro no login com Google: " + error.message);
  }
});
