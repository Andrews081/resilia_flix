$('btn').click(function (evento) {
    evento.preventDefault();
    sendRequest();
})

let btnEnviar = document.getElementById('enviar');
btnEnviar.addEventListener('click', function() {
    console.log('caque coisa')
    return location = ('../html/cadastro2.html');
})
//Seperação números CEP
const inputValue = document.querySelector("#cep");
let zipCode = "";

inputValue.addEventListener("keyup", () => {
    zipCode = inputValue.value;
    if (zipCode)
        if (zipCode.length === 8) {
            inputValue.value = `${zipCode.substr(0, 5)}-${zipCode.substr(5, 9)}`;
        }
});

$(document).ready(function () {


    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        // $('#numero').val("");
        $("#uf").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                // $('#numero').val("...");
                $("#uf").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $('#numero').val(dados.numero)
                        $("#uf").val(dados.uf);
                    }
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            }
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        }
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});


function verificarNomes() {

    var texto = document.getElementById("fname").value;
    var texto = document.getElementById("lname").value;

    for (letra of texto) {

        if (!isNaN(texto)) {

            alert("Nos campos (Primeiro Nome e Segundo Nome) digite apenas letras e espaços");
            document.getElementById("entrada").value = "";
            return;
        }

        letraspermitidas = "ABCEDFGHIJKLMNOPQRSTUVXWYZ abcdefghijklmnopqrstuvxwyzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ"

        var ok = false;
        for (letra2 of letraspermitidas) {

            if (letra == letra2) {
                ok = true;
            }
        }
        if (!ok) {
            alert("Não digite caracteres que não sejam letras ou espaços");
            document.getElementById("fname").value = "";
            document.getElementById("lname").value = "";
            return;
        }
    }
}


// Enviar para página de cadastro realizado
// let btnEnviar = document.getElementById('enviar');
// btnEnviar.addEventListener('click', function() {
//     console.log('caque coisa')
//     return location = ('../html/cadastro2.html');
// })



