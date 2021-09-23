inicio();

async function inicio(){
    let url = location.search
        url = url.replace("?", "")

        if(url != ""){
            let res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e5149226&t=${url}&plot=full`)
            let json = await res.json()
            ConstruirPage(json)
            
        }
    

    document.querySelector("#pesquisar").addEventListener("click", ()=>{
        url = document.querySelector("input#searchs").value
        location.href = `pesquisa.html?${url}`
    })

    if(document.querySelector(".boxPlanos")){
        planos();
    }
}

function planos(){
    let boxPlanos = document.querySelectorAll(".boxPlanos");
    boxPlanos.forEach((el, i) =>{
        boxPlanos[i].addEventListener("click", ()=>{
            for(let i = 0 ; i < boxPlanos.length ; i++){
                let check = boxPlanos[i].querySelector(`.imgplan`);
                    if(check){
                        check.parentNode.removeChild(check);
                    }
            }
            let img = document.createElement("img")
                img.src = "./img/icon/check-solid.svg";
                img.className = "imgplan";
                boxPlanos[i].appendChild(img)
                document.querySelector("#confirmar").style.display = "block"
        })
    })
    
}

function Bandeira(digito){
    //3 – American Express e Diners Club
    //4 – Visa
    //5 – MasterCard
    //6 – Discover Card
    let card = document.querySelectorAll(".container .cartoes ul li img")
    if(digito.length == 1){
        digito = parseInt(digito)
        
        
        switch (digito) {
            case 3:
                card[2].classList.add("cartaoSelecionado")
                break;
            case 4:
                card[1].classList.add("cartaoSelecionado")
                break;
            case 5:
                card[0].classList.add("cartaoSelecionado")
                break;
            
        }
    }else if(digito.length == 0){
        card.forEach((el, i)=>{
            card[i].classList.remove("cartaoSelecionado")
        })
    }
}
function stopDefAction() {
    let load = document.querySelector(".load")
    let msgs= document.querySelector(".msgs")

    load.style.display = "block"
    setTimeout(()=>{
        load.style.display = "none"        
        msgs.style.display = "flex"
    }, 4000)
    let msg = true
    let card = document.querySelector("#cardnumber").value
    
    if(parseInt(card[0]) == 3){
        msg = false
    }
    if(msg){
        document.querySelector(".msgValid").style.display = "flex"
    }else{
        document.querySelector(".msgErro").style.display = "flex"
    }   
    setTimeout(()=>{
        document.querySelector(".msgValid").style.display = "none"
        document.querySelector(".msgErro").style.display = "none"
        msgs.style.display = "none"
        
    }, 6000)

    // ==============================================  CÓDIGO FETCH POST

    // let dados = JSON.stringify({
    //     "nome" : document.querySelector("#name").value,
    //     "sobrenome" : document.querySelector("#sobrenome").value,
    //     "cpf" : document.querySelector("#cpf").value,
    //     "card" : document.querySelector("#cardnumber").value,
    //     "validade" : document.querySelector("#dateval").value,
    //     "cvv" : document.querySelector("#cvv").value
    // });
    // const url = "endereco"
    // const envio = await fetch(url, {
    //                             method: 'POST',
    //                             headers: {
    //                                     'Accept': 'application/json',
    //                                     'Content-Type': 'application/json'
    //                             },
    //                             body: dados
    // });
}
async function ConstruirPage(json){
    let main = document.querySelector("main")
    let nameClass
    let classific
    switch (json.Rated) {
        case "N/A":
            nameClass = "livre"
            classific = "L"
            break;
        case "PG":
            nameClass = "dez"
            classific = "10"
            break;
        case "PG-13":
            nameClass = "doze"
            classific = "12"
            break;
        case "R":
            nameClass = "quatorze"
            classific = "14"
            break;
        case "NC-17":
            nameClass = "dezesseis"
            classific = "16"
            break;
        default:
            nameClass = "dezoito"
            classific = "18"
            break;
    }
    main.innerHTML = `
                    <div class="mainMove">
                        <div class="PhotoDesc">
                            <div class="Photo">
                                <img src="${json.Poster}">
                            </div>
                            <div class="Desc">
                                <h2>${json.Title}</h2>
                                <p>
                                    <span class="descSpan">Gênero:</span>
                                    ${json.Genre}
                                </p>
                                <p>
                                    <span class="descSpan">Lançamento:</span>
                                    ${json.Year}
                                </p>
                                <p>
                                    <span class="descSpan">Duração:</span>
                                    ${json.Runtime}
                                </p>
                                <p>
                                    <span class="descSpan">Atores:</span>
                                    ${json.Actors}
                                </p>
                                <p>
                                    <span class="descSpan">Diretor:</span>
                                    ${json.Director}
                                </p>
                                <p>
                                    <a href="https://www.youtube.com/results?search_query=${json.Title}" target="_blank>
                                    <span class="descSpan">Ver filme</span></a>
                                </p>
                                <span id="classificacao" class="${nameClass}">${classific}</span>

                            </div>
                        </div>
                        <div class="sinopse">
                            <h3>Sinopse</h3>
                            <p>${json.Plot}</p>
                        </div>
                    </div>
    `
}