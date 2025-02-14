document.addEventListener('DOMContentLoaded', () => {
  class FormManager {
    constructor() {
      this.formContainer = document.getElementById('formContainer');
      this.addButton = document.getElementById('addPerson');
      this.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJW7zoOyJNyDyCb7NnuTKPyoyA0-YjeyHx32dYuWtFCy7fzELvtl0g75wrBJAdtj8c/exec'; // URL correta
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
        const response = await fetch(this.SCRIPT_URL, {mode: "no-cors"}, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }), // Envia todos os registros
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          this.formContainer.innerHTML = '';
          this.addNewPerson();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Erro:', error);
        alert(error.message || 'Erro ao salvar!');
      }
    }

    collectData() {
      return Array.from(document.getElementsByClassName('input-group')).map(group => {
        const inputs = group.getElementsByTagName('input');
        const select = group.querySelector('select');
        return {
          nome: inputs[0].value,
          telefone: inputs[1].value,
          email: inputs[2].value,
          curso: select.value
        };
      });
    }
  }

  new FormManager();
});
