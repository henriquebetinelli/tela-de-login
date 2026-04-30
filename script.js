let cadastro = false;

document.getElementById("toggle").onclick = () => {
    cadastro = !cadastro;

    document.getElementById("titulo").innerText = cadastro ? "Cadastro" : "Login";
    document.querySelector("button").innerText = cadastro ? "Cadastrar" : "Entrar";
    document.getElementById("toggle").innerText = cadastro ? "Já tem conta? Faça Login!" : "Não tem conta? Cadastre-se!";
    esconderAlerta();
}

document.getElementById("formLogin").onsubmit = (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let mensagem = document.getElementById("mensagem");

    mensagem.innerHTML = "";

    if (!email.includes("@") || !email.includes(".")) {
        mostrarAlerta("danger", "Email inválido!");
        return;
    }

    if (senha.length < 4) {
        mostrarAlerta("warning", "Senha muito curta! Mínimo 4 caracteres.");
        return;
    }

    if (cadastro) {
        localStorage.setItem(email, senha);
        mostrarAlerta("success", "Cadastrado com sucesso!");
    } else {
        let salva = localStorage.getItem(email);
        if (salva === senha) {
            mostrarAlerta("primary", "Login realizado com sucesso!");
        } else {
            mostrarAlerta("danger", "Email ou senha incorretos!");
        }
    }

    document.getElementById("formLogin").reset();
}

function mostrarAlerta(tipo, texto) {
    let mensagem = document.getElementById("mensagem");
    mensagem.classList.remove("alert-danger", "alert-success", "alert-primary", "alert-warning", "d-none");
    mensagem.classList.add("alert-" + tipo);
    mensagem.innerText = texto;
}

function esconderAlerta() {
    let mensagem = document.getElementById("mensagem");
    mensagem.classList.add("d-none");
    mensagem.innerText = "";
}