            
var todasAsTarefas = [];

carregarTarefas();

function adicionarTarefa() {          

    var novaTarefa = document.getElementById("tarefa");
    console.log(tarefa);

    var tarefaEspecifica = {"checkBoxSelecionado": false, "tarefa": novaTarefa.value};
    salvarNoLocalStorage(tarefaEspecifica);

    novaTarefa.value = "";
    
    carregarTarefas();
}

function salvarNoLocalStorage(novaTarefa) {
    console.log("texto:", todasAsTarefas);
    todasAsTarefas.push(novaTarefa);
    localStorage.setItem("itens", JSON.stringify(todasAsTarefas));
}

function carregarTarefas(){
    var contador = 0;
    var criarLista= document.getElementById("lista");
    criarLista.innerHTML= "";
        console.log(lista);
   
    todasAsTarefas = JSON.parse(localStorage.getItem("itens"));
    if (todasAsTarefas === undefined || todasAsTarefas === null)  {
        todasAsTarefas = [];
    }
    console.log("itens", todasAsTarefas);

    for(var i=0; i<todasAsTarefas.length; i++){
        console.log("item: ", todasAsTarefas[i].tarefa);
        console.log("item: ", todasAsTarefas[i]);


  
        var itemLista = document.createElement("li");
        var itemAttr = document.createAttribute("id");
        itemAttr.value = "task-"+contador;
        itemLista.setAttributeNode(itemAttr);
        
        
        criarLista.appendChild(itemLista);

        var criarCheckBox = document.createElement("input");
        criarCheckBox.setAttribute("type", "checkbox");
        criarCheckBox.setAttribute("id","checkbox-"+contador);
        criarCheckBox.className="checkbox";
        
        if(todasAsTarefas[i].checkBoxSelecionado){
            
            criarCheckBox.setAttribute("checked", true);
        } else {
            criarCheckBox.removeAttribute("checked");
        }

        criarCheckBox.value = contador;
        itemLista.appendChild(criarCheckBox);
        criarCheckBox.addEventListener("change", function(event){
            var alteracaoCheckBox = JSON.parse(localStorage.getItem("itens"));
            alteracaoCheckBox[event.target.value].checkBoxSelecionado=event.target.checked
            console.log("valor", event.target.value)

        }); 

        var criarLabel = document.createElement("label");
        criarLabel.setAttribute("for","checkbox-"+contador);
        criarLabel.innerText = todasAsTarefas[i].tarefa;
        criarLabel.className="label";
        itemLista.appendChild(criarLabel);

        var criarBotaoExcluir = document.createElement("button");
        criarBotaoExcluir.setAttribute("id", "delete-"+contador);
        criarBotaoExcluir.value = contador;
        criarBotaoExcluir.innerText = "EXCLUIR";
        criarBotaoExcluir.className="botaoexcluir";
        itemLista.appendChild(criarBotaoExcluir);
        criarBotaoExcluir = document.querySelector("#delete-"+contador);
        criarBotaoExcluir.addEventListener("click", function(event){
            var confirmaAcao = confirm("Deseja realmente excluir esta tarefa?")
            if (confirmaAcao){
            
            criarLista.removeChild(event.target.parentNode);
            removerStorage(event.target.value);
        }
        });
        contador++;

    }
}

function removerStorage (i){
    console.log(i, todasAsTarefas)
    todasAsTarefas.splice(i, 1);
    console.log(i, todasAsTarefas)
    localStorage.setItem("itens", JSON.stringify(todasAsTarefas));
}

