const cepInput = document.querySelector('.cep-input')
const cepButton = document.querySelector('.cep-button')
const divResultado = document.querySelector('.resultado')

cepButton.addEventListener('click', () => {
    const fetchApi = async () => {
        try {
            Swal.fire({
                title: "Aguarde...",
                text: "Estamos buscando o local",
                icon: "info",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepInput.value}`)

            if (!res.ok) {
                throw new Error('CEP não encontrado.')
            }

            const data = await res.json()
            Swal.close()

            divResultado.innerHTML =
            `
            <div data-aos="fade-in" data-aos-duration="2000">
            <p>Rua: ${data.street}</p>
            <p>Bairro: ${data.neighborhood}</p>
            <p>cidade: ${data.city}</p>
            <p>Estado: ${data.state}</p>
            `

            console.log(data)
        } catch (err) {
            Swal.fire('Erro', 'Verifique o CEP informado e tente novamente', 'error')
            console.error(err.message)
        }
    }
    fetchApi()


})
