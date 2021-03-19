function loadParty() {
    const partySelect = document.querySelector('#party')
    const url = 'https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla'

    populate(url, partySelect)
}

loadParty()

function populate(url, select) {
    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        if(select.name == "party-group") {
            data.dados.forEach((value) => {
                select.innerHTML += `<option value="${value.id}">${value.sigla} - ${value.nome}</option>`
            })
        } else {
            select.innerHTML = ''
            data.dados.forEach((value) => {
                select.innerHTML += `
                <div class="member">
                    <img class="picture" src="${value.urlFoto}" alt="${value.nome}">
                    <h2>${value.nome} <span>${value.siglaUf}</span></h2>
                    <p><b>Email</b>: ${value.email}</p>
                </div>
                `
            })
        }
    })
}

document.querySelector("select[name=party-group")
.addEventListener("change", (event) => {
    const membersDiv = document.querySelector(".members")
    const id = event.target.value
    const url = `https://dadosabertos.camara.leg.br/api/v2/partidos/${id}/membros`

    populate(url, membersDiv)
})