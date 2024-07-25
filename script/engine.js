// Função para obter o conteúdo dos contatos
function getContent() { 
    let content = '';
    for(a in window.sContacts) 
        content += `${a}\n`; // Adiciona cada contato ao conteúdo
    return content; // Retorna o conteúdo dos contatos
}

// Função de inicialização
function init() { 
    let content;

    const saveButton = document.querySelector("#saveButton")
    saveButton.disabled = true;
    saveButton.addEventListener("click", ()=>{
        download(content)
        saveButton.disabled = true;
        content = null;
    })


    const scanButton = document.querySelector("#scanButton")
    scanButton.addEventListener("click", () =>{
        getNumbers();
        content = getContent();
    
        if(content){
            saveButton.disabled = false;
        }


    })
    
    // getNumbers(); // Chama a função para obter números de contatos
    // Adiciona um evento de rolagem ao elemento '#pane-side' que chama a função getNumbers
    // document.querySelector('#pane-side').addEventListener('scroll', getNumbers);
}


// Função para baixar o conteúdo como um arquivo
function download(content) { 
    let data = 'data:application/octet-stream,' + encodeURIComponent(content); // Codifica o conteúdo como um URI de dados
    let newWindow = window.open(data, 'file'); // Abre uma nova janela para baixar o arquivo
}
// function download(content) { 
//     let blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
//     let link = document.createElement("a");
//     if (link.download !== undefined) { // Feature detection
//         let url = URL.createObjectURL(blob);
//         link.setAttribute("href", url);
//         link.setAttribute("download", "contatos.csv");
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
// }

// Função para obter números de contatos
function getNumbers() { 
    if(window.sContacts === undefined) 
        window.sContacts = []; // Inicializa o array de contatos se não estiver definido
    
    // Seleciona todos os elementos que podem conter números de telefone e os percorre
    document.querySelectorAll('#pane-side div[role=grid] div[role=row] > div:first-child div:nth-child(2) div:first-child > div:first-child').forEach(element => { 
        let phone = '';
        
        // Verifica se o texto interno ou o título do elemento é um número de telefone
        if(/^((\+| |-|\d)+$)/g.test(element.innerText)) 
            phone = element.innerText;
        else if(/^((\+| |-|\d)+$)/g.test(element.title)) 
            phone = element.title;
        
        // Se um número de telefone válido for encontrado, adiciona-o à lista de contatos e altera a cor de fundo do elemento
        if(phone !== '') { 
            window.sContacts[phone] = phone;
            element.style.backgroundColor = '#00ff00';
        } else { 
            element.style.backgroundColor = 'inherit'; // Restaura a cor de fundo original se não for um número de telefone
        }
    });

    console.log(`Total de contatos coletados: ${Object.keys(window.sContacts).length}`);
}

init(); // Chama a função de inicialização  
