let array
const listarProjeto = async () => {
    const res = await fetch('./Clone/projetos.json');
    data = await res.json();
    console.log('data', data);
    array = data
    console.log(typeof data)
    mostarNatela(array)
}

const inputdados = document.getElementById('input')
inputdados.addEventListener('keyup', (tecla) => {
    const procuraLetra = tecla.target.value.toLowerCase();
    console.log(procuraLetra)
    const datafilter = data.filter(i => {
        return i.projectName.toLowerCase().includes(procuraLetra)

    })

    exibir.innerHTML = ""
    mostarNatela(datafilter)

});

function PrimeiraLetra(str) {
    return str.split('  ').map(e => e[0].toUpperCase())
}

function mostarNatela(array) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

    Object.values(array).forEach((valores, index) => {
let existe = favoritos.find(fav=>fav==valores.id)



        exibir = document.getElementById("containerdow")

        exibir.innerHTML += `
            <div class="kissbot_perfillis" id="bot_lista">
                <div class="kissbot_perfillis_in">
                    <!--quadro perfil-->
                    &nbsp;&nbsp;<span class="material-icons-outlined">
                        meeting_room
                    </span>
                    &nbsp;<div class="perfillis">${PrimeiraLetra(valores.projectName)}</div>
                    &nbsp; <span class="titulo">${valores.projectName}&nbsp;<span class="material-icons-outlined">
                    lock
                </span><p>${valores.description}</p> </span> 
                <div class="role">${valores.role}</div>
                </div>
                <!-- icone estrela -->
                <span id="star-${valores.id}" onclick="star(${valores.id})" class="material-icons-outlined ${existe &&'is'}">
                    star
                </span><span class="hours">${String( new Date(valores.lastUpdate).getHours()).padStart(2, '0')}:${String( new Date(valores.lastUpdate).getMinutes()).padStart(2, '0')}</span>
                <!-- ------------- -->

            </div>
             `

    })
}


listarProjeto()

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

function star(id) {
    console.log(id)
   
    // se estar ou nao no local
    const idd = favoritos.indexOf(id)

    if (idd != -1) {
        document.getElementById(`star-${id}`).classList.remove('is')
        
        favoritos.splice(idd, 1)
    } else {
        favoritos.push(id)
        document.getElementById(`star-${id}`).classList.add('is')
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos))

    console.log('idex', idd)
    console.log(favoritos)
}






