document.addEventListener('DOMContentLoaded', () => {
    class FormManager {
        constructor() {
            this.formContainer = document.getElementById('formContainer');
            this.addButton = document.getElementById('addPerson');
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

        handleSubmit(e) {
            e.preventDefault();
            const data = this.collectData();
            this.generateExcel(data);
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

        generateExcel(data) {
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Alunos");
            XLSX.writeFile(wb, 'cadastro_alunos.xlsx');
        }
    }

    new FormManager();
});
