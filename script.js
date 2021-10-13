window.addEventListener("load", windowLoad);

let imgSlide;
let slideTimer;
let slideControl;
let container_slide;

function windowLoad(){
    /*slide-show*/
    imgSlide = [];
    slideTimer = 0;
    slideControl = 0;
    container_slide = document.querySelector("#container-slide-show");

    /*slide-show*/ 
    carregaSlides();
    insereSlide();
    requestAnimationFrame(alteraSlide);

    /*data de nascimento*/
    listaDia();
    listaMes();
    listaAno();

    /*background areas de atuação*/
    atribuiBackground()

    /* */
    adicionaEvento();
}

/*slide-show*/
function carregaSlides(){
    for(let i = 0; i < 3; i++){
        imgSlide[i] = new Image;
        imgSlide[i].src = `img/slide/img${i}.jpg`;
    }
}

function insereSlide(){
    container_slide.style.backgroundImage = `url(${imgSlide[slideControl].src})`;
}

function alteraSlide(){
    if(slideTimer == 150){
        slideTimer = 0;
        
        if(slideControl == 2){
            slideControl = 0;
            insereSlide();
        }else{
            slideControl += 1;
            insereSlide();
        }
    }else{
        slideTimer++;
    }

    requestAnimationFrame(alteraSlide);
}


/*data de nascimento*/
function listaDia(){
    let selectDia = document.querySelector("#dia-nascimento");
    let opcoes = `<option></option>`;

    for(let i = 1; i <= 31; i++){
        opcoes += `<option>${i < 10 ? "0" + i : i}</option>`;
    }

    selectDia.innerHTML = opcoes;
     
}

function listaMes(){
    let selectDia = document.querySelector("#mes-nascimento");
    let opcoes = `<option></option>`;

    for(let i = 1; i <= 12; i++){
        opcoes += `<option>${i < 10 ? "0" + i : i}</option>`;
    }

    selectDia.innerHTML = opcoes;
     
}

function listaAno(){
    let selectDia = document.querySelector("#ano-nascimento");
    let opcoes = `<option></option>`;

    for(let i = 2021; i >= 1970; i--){
        opcoes += `<option>${i}</option>`;
    }

    selectDia.innerHTML = opcoes;
     
}

/*background areas de atuação*/
function atribuiBackground(){
    let containers = document.querySelectorAll(".areas");

    for(let i = 0; i <= 7; i++){
        containers[i].style.backgroundImage = `url(img/area-de-atuacao/background/fundo${i}.jpg)`;
    }
}



let inputCep = document.querySelector("#cep");
let inputCidade = document.querySelector("#cidade");
let inputEndereco = document.querySelector("#endereco");
let inputBairro = document.querySelector("#bairro");
let inputEstado = document.querySelector("#estado");


/*consumo api viacep*/
let smallCep = document.querySelector("#small-cpf-invalido");

inputCep.addEventListener("focus", function (){
    if(smallCep.innerHTML != ""){
        smallCep.innerHTML = ""; 
    }
})

inputCep.addEventListener("blur", function (){
    if(inputCep.value == ""){
        inputCidade.value = "";
        inputEndereco.value = "";
        inputBairro.value = "";
        inputEstado.value = "";

    }else{
        smallCep.innerHTML = "";

        let numeroCep = inputCep.value.replace("-", "");

        const options = {
            method : "GET",
            mode : "cors",
            cache : "default"
        };

        fetch(`https://viacep.com.br/ws/${numeroCep}/json`, options)
        .then((response) => { response.json()
            .then((data) => {
                inputEndereco.value = data.logradouro;
                inputCidade.value = data.localidade; 
                inputBairro.value = data.bairro; 
                inputEstado.value = data.uf;
            })})

        .catch(() => {
            smallCep.innerHTML = "CEP NÃO ENCONTRADO";    
        });
    }    
});


/*valida dados*/
let smallStatus = document.querySelector("#small-status-cadastro");

let btnCadastrarCurriculo = document.querySelector("#btn-cadastrar-curriculo");
btnCadastrarCurriculo.addEventListener("click", function (){

    let status = true;

    verificaInputVazio();
    verificaDataNascimento();
    verificaCEP();
    
    if(status == false){
        
    }else{
        cadastraCurriculo();
        limpaInput();

        function limpaInput (){
            todosInputs.forEach((item) => {
                item.value = "";
            })
        }
    }


    function verificaInputVazio (){
        inputs.forEach((item) => {
            if(item.value == ""){
                smallStatus.innerHTML = `Nem todos os campos foram preenchidos`;
                status = false;
            }
        });
    }

    function verificaDataNascimento (){
        let dia = document.querySelector("#dia-nascimento").value;
        let mes = document.querySelector("#mes-nascimento").value;
        let ano = document.querySelector("#ano-nascimento").value;

        if(dia == "" || mes == "" || ano == ""){
            smallStatus.innerHTML = `Nem todos os campos foram preenchidos`;
            status = false;
        }
    }


    function verificaCEP(){
        let endereco = document.querySelector("#endereco").value;

        if(endereco == ""){
            smallStatus.innerHTML = `Nem todos os campos foram preenchidos`;
            status = false;
        }
    }

});



/*verificação de input vazio*/

let inputs = document.querySelectorAll(".input-obrigatorio");
let smalls = document.querySelectorAll(".campo-obrigatorio");

function adicionaEvento (){
    inputs.forEach((item, indice) => {
        item.addEventListener('focus', function (){
            smalls[indice].innerHTML = "";
            smallStatus.innerHTML = "";
        })

        item.addEventListener('blur', function (){
            if(item.value == ""){
                smalls[indice].innerHTML = "campo obrigatório"
            }
        })
    });
}


/*cadastra curriculo*/

let todosInputs = document.querySelectorAll(".input-form-curriculo");
let curriculo = "";

function montaCurriculo(){
    curriculo = {
        nome : todosInputs[0].value,
        profissao : todosInputs[1].value,
        data_de_nascimento : `${todosInputs[2].value}/${todosInputs[3].value}/${todosInputs[4].value}`,
        endereco : `${todosInputs[8].value}, ${todosInputs[11].value} - ${todosInputs[9].value}, ${todosInputs[10].value} - ${todosInputs[12].value}, ${todosInputs[7].value}`,
        telefone_fixo : todosInputs[13].value,
        telefone_celular : todosInputs[14].value,
        email : todosInputs[15].value,
        identidade : todosInputs[16].value,
        cpf : todosInputs[17].value.replace(/\./g, "").replace("-", ""),
        estado_civil : todosInputs[5].value,
        sexo : todosInputs[6].value,
        possui_veiculo : todosInputs[18].value,
        possui_habilitacao : todosInputs[19].value
    }
}

function cadastraCurriculo (){
    montaCurriculo();
    
    const options = {
        method : 'post',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(curriculo)
    };

    fetch(``, options)
    .then((response) => {response.json()
        .then((data) => {
            console.log(data)
            if(data == 0){
                smallStatus.innerHTML="usuario já cadastrado";
            }else{
                smallStatus.innerHTML="cadastro realizado com sucesso";
            }
        })})

    .catch((error) => {
        console.log(error); 
    });
}

