$('btn').click(function (evento) {
    evento.preventDefault();
    sendRequest();
})

let btnEnviar = document.getElementById('enviar');
btnEnviar.addEventListener('click', function () {
    console.log('caque coisa')
    return location = ('../html/cadastro2.html');
})
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
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
    }

    $("#cep").blur(function () {

        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {

            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {

                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $('#numero').val(dados.numero);
                        $("#uf").val(dados.uf);
                    }
                    else {
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            }
            else {
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        }
        else {
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



