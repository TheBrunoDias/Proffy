//procurar o botao
document.querySelector("#add-time")
.addEventListener('click',cloneField)
//quando clicar no botao


//executar uma acao
function cloneField(){
    //duplicar os campos
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)

    //limpar os campos
    const fields = newFieldContainer.querySelectorAll('input')

    fields[0].value = ""
    fields[1].value = ""
    //colocar na pagina
    document.querySelector("#schedule-items").appendChild(newFieldContainer)
}
