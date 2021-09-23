inicio();

let json;
async function inicio() {
    let res = await fetch("./asset/json/config.json")
    json = await res.json()

    if (document.querySelector("#banner")) {
        let banner = Math.trunc(Math.random() * (json.catalogo.length - 0) + 0);
        document.querySelector("#titleInicial").innerHTML = json.catalogo[banner].title
        document.querySelector("#descricaoInicial").innerHTML = json.catalogo[banner].sinopse
        document.querySelector("#banner img").src = `./asset/img/filmes/${json.catalogo[banner].img}`

        let slider = document.querySelectorAll(".sliderWidth");
        let tamanhoG = 210 * json.catalogo.length
        slider[0].style.width = `${tamanhoG}px`

        
        let acao       = json.catalogo.filter((s)=> s.genero == "0")
        let animacao   = json.catalogo.filter((s)=> s.genero == "1")
        let aventura   = json.catalogo.filter((s)=> s.genero == "2")
        let biografico = json.catalogo.filter((s)=> s.genero == "3")
        let comedia    = json.catalogo.filter((s)=> s.genero == "4")
        let comediaD   = json.catalogo.filter((s)=> s.genero == "5")
        let comediaR   = json.catalogo.filter((s)=> s.genero == "6")
        let drama      = json.catalogo.filter((s)=> s.genero == "7")
        let historico  = json.catalogo.filter((s)=> s.genero == "8")
        let seriados   = json.catalogo.filter((s)=> s.genero == "9")
        let terror     = json.catalogo.filter((s)=> s.genero == "10")
        

        json.catalogo.forEach((el, i) => {
            let cards = document.createElement("div")
            cards.className = "boxCards";
            cards.innerHTML = `<img src="./asset/img/filmes/${json.catalogo[i].img} "><div class="content"><button class="btn btn-plus-info modal">Mais Informações</button></div>`
            slider[0].appendChild(cards)
        })

        let tamanhoA = 210 * animacao.length
        slider[2].style.width = `${tamanhoA}px`
        animacao.forEach((el, i) => {
            let cards = document.createElement("div")
            cards.className = "boxCards";
            cards.innerHTML = `<img src="./asset/img/filmes/${animacao[i].img} "><div class="content"><button class="btn btn-plus-info modal">Mais Informações</button></div>`
            slider[2].appendChild(cards)
        })

        seriados.forEach((el, i) => {
            let cards = document.createElement("div")
            cards.className = "boxCards";
            cards.innerHTML = `<img src="./asset/img/filmes/${seriados[i].img} "><div class="content"><button class="btn btn-plus-info modal">Mais Informações</button></div>`
            slider[1].appendChild(cards)
        })




        let btnModal = document.querySelectorAll(".modal");
        let Modal = document.querySelector(".mainModal");

        btnModal.forEach((el, i) => {
            btnModal[i].addEventListener("click", () => {
                Modal.style.display = "flex"
                if (i > 0) {
                    document.querySelector("#titleModal").innerHTML = json.catalogo[i - 1].title
                    document.querySelector(".videoModal video").src = `./asset/video/${json.catalogo[i - 1].video}`
                    document.querySelector("#lancamento").innerHTML = json.catalogo[i - 1].lancamento
                    let classfica
                    let classficaL
                    switch (json.catalogo[i - 1].classificacao) {
                        case 1:
                            classfica = "maior"
                            classficaL = "18"
                            break;
                        case 2:
                            classfica = "medio"
                            classficaL = "12"
                            break;
                        case 3:
                            classfica = "livre"
                            classficaL = "L"
                            break;
                    }
                    document.querySelector("#classificacao").className = classfica
                    document.querySelector("#classificacao").innerHTML = classficaL
                    document.querySelector(".descricaoModal").innerHTML = json.catalogo[i - 1].sinopse
                }

            })
        })
        document.querySelector(".modalheader img").addEventListener("click", () => {
            Modal.style.display = "none"

        })
        
    }else{
        let main = document.querySelector("main")
        let url = location.search
            url = url.replace("?", "")
            let res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e5149226&t=${url}&plot=full`)
            let json = await res.json()

            if(json.Title != undefined){
                let mainSearch = document.createElement("div")
                mainSearch.className = "mainSearch"
                mainSearch.innerHTML = `
                                        <div class="searchPhoto">
                                            <img src="${json.Poster}">
                                        </div>
                                        <div class="resumo">
                                            <h2 id="titulo"><span>Titulo : </span> ${json.Title}</h2>
                                            <p><span>Gênero : </span>${json.Genre}</p>
                                            <p id="sinop"><span>Sinopse : </span>${json.Plot}</p>
                                            <p><span>Lançamento : </span>${json.Year}</p>
                                            <p><span>Legenda : </span>${json.Language}</p>
                                            <p><span>Duração : </span>${json.Runtime}</p>
                                        </div>
                    `
                main.appendChild(mainSearch)
            }else{
                main.innerHTML = `<h3>Desculpe, mas não foi possível localizar</h3><img src="./asset/img/icon/undraw_page_not_found_su7k.svg" class="erroimg">`
            }
            
            //console.log(json)
         // document.querySelector("#tituloPage").innerHTML = url
        // 
        // json.catalogo.forEach((el, i)=>{
        //     let box = document.createElement("div")
        //         box.className = "box"
        //         box.innerHTML = `
        //                         <img src="./asset/img/filmes/${json.catalogo[i].img} ">
        //                         <div class="content"><h3>${json.catalogo[i].title}</h3><p>${json.catalogo[i].sinopse}</p><button class="btn">Mais informações</button></div>`
        //         main.appendChild(box)
        // })
    }


    document.querySelector(".mainLoad").style.display = "none"
}




var slider = document.querySelectorAll(".sliderWidth");
var rolar = 1
document.querySelector(".arrowsright").addEventListener("click", () => {
    if(rolar <= (190 * json.catalogo.length)){
        rolar += 250
        slider[0].style.marginLeft = `-${rolar}px`
        rolar++
    }
    
})
document.querySelector(".arrowsleft").addEventListener("click", () => {
    if (rolar > 0) {
        rolar -= 250
        slider[0].style.marginLeft = `-${rolar}px`
        rolar--
    }

})

document.querySelector(".searchimg").addEventListener("click", ()=>{
    let url = document.querySelector("#search").value
        for(let i = 0 ; i < url.length ; i++){
            if(url[i] == " "){
                url = url.replace(" ", "+")
            }
        }
        
        location.href = `./page.html?${url}`
        
})


