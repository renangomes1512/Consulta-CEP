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
                    <p data-aos="fade-right" data-aos-duration="1000">Cidade: ${data.city}</p>
                    <p data-aos="fade-right" data-aos-duration="1600">Barrio: ${data.neighborhood}</p>
                    <p data-aos="fade-right" data-aos-duration="2200">Endereço: ${data.street}</p>

                    
                `
            console.log(data)
        } catch (err) {
            Swal.fire('Erro', 'Verifique o CEP informado e tente novamente', 'error')
            console.error(err.message)
        }
    }
    fetchApi()


})
