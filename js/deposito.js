const transacao = class {
    #valor;
    #data;
    #recebedor;
    #tipo;
    constructor(valor, data, recebedor, tipo) {
        this.#valor = valor;
        this.#data = data;
        this.#recebedor = recebedor;
        this.#tipo = tipo;
    }

    get valor(){
        return this.#valor;
    }

    get date(){
        return this.#data;
    }

    toString(){
        return `<li>${this.#tipo}<br>+ R$${this.#valor}<span>${this.#data}</span></li>/n`;
        
    }
}

const recebedor = class {
    #banco;
    #conta;
    #agencia;

    constructor(banco, conta, agencia){
        this.banco = banco;
        this.conta = conta;
        this.agencia = agencia;
    }
}

const deposito = document.querySelector("#deposiForm");
deposito.onsubmit = async function(e){
    e.preventDefault();

    let valorDeposito = document.querySelector("#valorDeposito").value;
    let dataVencimento = document.querySelector("#dataVencimento").value;
    let tipo = "deposito";

    try{
        data = await validaData(dataVencimento);

        const myMan = new recebedor("Forward Bank", "0101011-1", "0001");
        const transaction = new transacao(valorDeposito, data, myMan, tipo);

        let transacoes = window.localStorage.getItem("transacoes");
        transacoes += transaction.toString();
        window.localStorage.setItem("transacoes", transacoes);

        let grafico = window.localStorage.getItem("graficData");
        grafico += `${transaction.valor}<br>`;
        window.localStorage.setItem("graficData", grafico);

        let saldo = parseFloat(window.localStorage.getItem("saldo"));
        saldo += parseFloat(transaction.valor);
        window.localStorage.setItem("saldo", saldo);

        alert("Depósito realizado");
    } catch(error){
        let warning = document.querySelector("#error");
        warning.style.visibility = "visible";
        warning.innerHTML = error;
    }
}

function validaData(data){
    let dataInformada = new Date(data);
    let dataHoje = new Date();
    if (dataInformada < dataHoje){
        throw "Data inválida";
    } else if (dataInformada.getFullYear() > dataHoje.getFullYear()+1){
        throw "Data inválida";
    } else {
        return `${dataInformada.getDate()+1} / ${dataInformada.getMonth()+1} / ${dataInformada.getFullYear()}`;
    }
}