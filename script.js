document.addEventListener('DOMContentLoaded', () => {
    class FormManager {
        constructor() {
            this.formContainer = document.getElementById('formContainer');
            this.addButton = document.getElementById('addPerson');
            this.SCRIPT_URL = 'https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbx7z79mx3N9Aspu3thze_HQXS5Zsg1R6OSRoSBTxyd4QsxUk7-TPQpx_k211O2tdcg/exec';
            this.initializeEvents();
        }

        initializeEvents() {
            this.addButton.addEventListener('click', () => this.addNewPerson());
            document.getElementById('registrationForm')?.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        addNewPerson() {
            const newGroup = document.createElement('div');
            newGroup.className = 'input-group';
            newGroup.innerHTML = `
                <input type="text" placeholder="Nome" required>
                <input type="tel" placeholder="Telefone" required>
                <input type="email" placeholder="Email" required>
                <select required>
                    <option value="">Selecione o curso</option>
                    <option>Implantodontia e Protese</option>
                    <option>Ortodontia</option>
                    <option>HOF</option>
                    <option>Endodontia</option>
                    <option>Alinhadores</option>
                    <option>Cirurgia Bucal</option>
                    <option>Ortodontia Interceptativa</option>
                    <option>Dentista com Enfase em Estetica</option>
                    <option>Mini Implantes</option>
                    <option>Escultura Dental</option>
                    <option>Tratamento Simplificado da Classe II</option>
                    <option>Biomateriais para Implantodontia</option>
                    <option>Descomplicando a Endodontia</option>
                </select>
            `;
            this.formContainer.appendChild(newGroup);
        }

        async handleSubmit(e) {
            e.preventDefault();
            const data = this.collectData();
            
            try {
                const response = await fetch(this.SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data }),
                });

                if (response.ok) {
                    alert('Dados salvos com sucesso!');
                    this.formContainer.innerHTML = ''; // Limpa o formulário
                    this.addNewPerson(); // Adiciona novo grupo vazio
                } else {
                    throw new Error('Falha no envio');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao salvar dados!');
            }
        }

        collectData() {
            const groups = Array.from(document.getElementsByClassName('input-group'));
            return groups.map(group => {
                const inputs = group.getElementsByTagName('input');
                const select = group.getElementsByTagName('select')[0];
                return {
                    nome: inputs[0].value,
                    telefone: inputs[1].value,
                    email: inputs[2].value,
                    curso: select.value
                };
            });
        }
    }

    // Inicializa o FormManager
    new FormManager();
});
