// =======================
//classes =========================================
class Note{ // classe para as anotações
    constructor(id, criadoem, titulo, texto){
        this.id = id //"000000"
        this.criadoem = criadoem //"00/00/0000"
        this.titulo = titulo
        this.texto = texto
    }
    resumo(){ // método para resumir primeiros 40 dígitos
        let content = ""
        if (this.texto.length > 40){
            for (let i=0; i <= 40; i++){
            content += this.texto[i]
            }
            content += "..."
            return content
        }else{
            return this.texto
        }
    }
}
// =========================================
//variáveis de botões=========================================
const newNoteButton = document.getElementById("newNote") // nova anotação
const saveNoteButton = document.getElementById("saveNote") // salvar anotação
const backNoteButton = document.getElementById("backNote") // apagar o conteúdo escrito da anotação
const cancelNoteButton = document.getElementById("cancelNote") // sair anptação
// =========================================
//variáveis de modal=========================================
const modal_container = document.getElementById("modal_container") // background modal
const modal_novaNota = document.getElementById("modal_novaNota") // modal criação de nota
const modal_read = document.getElementById("modal_read") // modal de leitura completa da nota
const main_content = document.getElementById("main_content") // página [uso do inert]
const listAnnotation = document.getElementById("listAnnotation") // espaço para cards
const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}` // data dehoje
const title = document.getElementById("ititulo") // titulo do formulário // new note
const text = document.getElementById("iannotation") // conteúdo do formulário // new note
const modal_save = document.getElementById("modal_save") // pop-up de salvamento
let noteArray = JSON.parse(localStorage.getItem("noteArray")) || [] // lista que integra local storage
noteArray = noteArray.map(function(obj){ // ao pegar os objetos do localstorage, transforma em um objeto da classe "Note" novamente [serve para se rpossível utilizar métodos]
    return new Note(obj.id, obj.criadoem, obj.titulo, obj.texto) // retornar a um objeto completo
})
let id = Number(localStorage.getItem("id")) || 0 // recupera o ultimo id salvo  no localstorage
// =========================================
// eventos|funções =========================================
function idFunc(number){ // gerador de id [000001]
    x = String(number).padStart(6,"0")
    return x
}
function createCard(object){ //criação dos cards
    // ==========
    // cria a base dos elementos
    let container = document.createElement("div")
    let pId = document.createElement("p")
    let pCriadoEm = document.createElement("p")
    let titulo = document.createElement("h3")
    let pResumo = document.createElement("p")
    let bDelete = document.createElement("button")
    let bRead = document.createElement("button")
    // =============
    // aplica os elementos na página
    listAnnotation.style.visibility = "visible"
    listAnnotation.appendChild(container)
    container.appendChild(pId)
    container.appendChild(pCriadoEm)
    container.appendChild(titulo)
    container.appendChild(pResumo)
    container.appendChild(bDelete)
    container.appendChild(bRead)
    // =========
    // atribui os id|classes nos respectivos elementos
    pId.setAttribute("class","id")
    pCriadoEm.setAttribute("class","criadoEm")
    pResumo.setAttribute("class","resumo")
    bDelete.setAttribute("class","apagar button")
    bRead.setAttribute("class","leitura button")
    // =========
    // altera o conteúdo HTML de acordo com o objeto recebido no parâmetro 
    pId.innerHTML = `ID : ${object.id}`
    pCriadoEm.innerHTML = `Criado em : ${object.criadoem}`
    pResumo.innerHTML = object.resumo()
    titulo.innerHTML = object.titulo
    bDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    bRead.innerHTML = `<i class="fa-solid fa-file"></i>`
}
function readcard(id, criadoEm, textfull, titulo){ // abre o modal de leitura do card e altera o conteúdo
    main_content.setAttribute("inert","") // impossibilita de interagir com a página atrás
    modal_container.style.display = "block"
    modal_read.style.display = "flex"
    modal_read.style.zIndex = "100"
    setTimeout(function(){ // tempo para realizar animação
        modal_container.style.opacity = 100
        modal_read.style.opacity = 100
    },100)
    modal_read.querySelector(".id").innerHTML = `ID : ${id}`
    modal_read.querySelector("h2").innerHTML = `${titulo}`
    modal_read.querySelector(".criadoEm").innerHTML = `Criado em : ${criadoEm}`
    modal_read.querySelector(".textfull").innerHTML = `${textfull}`
}
newNoteButton.addEventListener("click", function novaNote(){ // abre o modal para criar nova nota
    main_content.setAttribute("inert","") // impossibilita de interagir com a página atrás
    modal_container.style.display = "block"
    modal_novaNota.style.display = "block"
    setTimeout(function(){ // tempo para realizar animação
        modal_container.style.opacity = 100
        modal_novaNota.style.opacity = 100
    },100)
})
cancelNoteButton.addEventListener("click", function cancelNote(){ // cancelar escrita e interface
    modal_container.style.opacity = 0
    modal_novaNota.style.opacity = 0
    setTimeout(function(){ // tempo para realizar animação
        modal_container.style.display = "none"
        modal_novaNota.style.display = "none"
    },500)
    title.value = ""
    text.value = ""
    main_content.removeAttribute("inert") // possibilita de interagir com a página novamente
})
saveNoteButton.addEventListener("click", function saveNote(){ // salvar anotação
    if (title.value == "" || text.value == ""){ // alerta caso nada tenha sido digitado
        window.alert("Título ou Conteúdo inválido")
    }else{
        id = Number(id) + 1 // muda o id da proxima anotação salva
        let annotation = new Note(idFunc(id), date, title.value, text.value) // cria nova anotação
        noteArray.push(annotation) // implementa na lista
        localStorage.removeItem("id") // atualiza o id, apagando e botando novamente
        localStorage.setItem("id", idFunc(id))
        localStorage.removeItem("noteArray") // atualiza a lista de notas, apagando e botando novamente
        localStorage.setItem("noteArray", JSON.stringify(noteArray)) // implementa a nova annotação no localstorage
        
        main_content.removeAttribute("inert") // possibilita de interagir com a página atrás
        modal_container.style.opacity = 0
        modal_novaNota.style.opacity = 0
        setTimeout(function(){ // tempo para sumir com a tela
            modal_container.style.display = "none"
            modal_novaNota.style.display = "none"
        },200)
        setTimeout(function(){ // tempo para realizar animação
            modal_save.style.animationPlayState = "running"
        },500)
        title.value = ""
        text.value = ""
        setTimeout(function(){ // tempo a página atualizar
            location.reload()
        },2000)
    }
})
backNoteButton.addEventListener("click", function backNote(){ // cancelar apenas escrita
    title.value = ""
    text.value = ""
})
window.addEventListener("load", function loadstorage(){ // quando recarrega a página, cards são carregados
    for (i in noteArray){ // para cada objeto no localstorage, cria um card
        let obj = noteArray[i]
        createCard(obj)
    } 
})
document.addEventListener("click", function deleteNote(){ // apagar card
    if (event.target.closest(".apagar")){ // se o botão de apgar card foi clicado
        let idCard = event.target.closest(".apagar").parentElement.querySelector(".id").innerHTML.slice(5) // pega parte númerica do id do card [000000]
        for (i in noteArray){
            if (noteArray[i].id == idCard){ // procura nao localstorage o id, equivalente ao id do card
                noteArray = noteArray.filter(object => object.id != idCard) // exclui o objeto da lista
                localStorage.removeItem("noteArray")
                localStorage.setItem("noteArray", JSON.stringify(noteArray))
                location.reload() //recarrega a página
                break
            }else{
                continue
            }
        }
    }
})
document.addEventListener("click", function readNote(){ // ler card
    if (event.target.closest(".leitura")){ // verifica se foi o botão de leitura que foi clicado
        let idCard = event.target.closest(".leitura").parentElement.querySelector(".id").innerHTML.slice(5) // pega a parte númerica do id do card
        for (i in noteArray){
            if (noteArray[i].id == idCard){ //procura o objeto com o id correspondente ao do card
                readcard(noteArray[i].id, noteArray[i].criadoem, noteArray[i].texto, noteArray[i].titulo) //cria o card com as informações do objeto
                break
            }else{
                continue
            }
        }
    }
})
document.addEventListener("click", function readNote(){ // ler card
    if (event.target.closest(".sair")){ // verifica se o botão de sair foi clicado
        modal_container.style.opacity = 0
        modal_read.style.opacity = 0
        setTimeout(function(){ // tempo para sumir com a tela
            modal_container.style.display = "none"
            modal_read.style.display = "none"
            modal_read.style.zIndex = "10" // coloca o modal atrás de todos, para evitar erros de interação
        },500)
        modal_read.querySelector(".id").value = ""
        modal_read.querySelector("h2").value = ""
        modal_read.querySelector(".criadoEm").value = ""
        modal_read.querySelector(".textfull").value = ""
        main_content.removeAttribute("inert") //possibilita interagir com a página principal novamente
    }
})
document.getElementById("reset").addEventListener("click", function reset(){ // sistema do botão de reset do localstorage
    localStorage.clear() // limpa o localstorage
    location.reload() // recarrega a página
})