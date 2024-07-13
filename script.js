//Chamando elementos DOM

const todoContainer = document.querySelector(".todo-itens");
const inputTask = document.querySelectorAll(".task-list");

//Criando eventos de click

//Criando funções
// Aguarda o DOM carregar totalmente
document.addEventListener("DOMContentLoaded", () => {
  const btnSubmit = document.querySelector(".add-task-button");
  let taskCount = 0;
  const maxTask = 15;
  // Função de clique para adicionar tarefa
  const handleClick = (e) => {
    e.preventDefault();

    addTask();

    console.log(taskCount);
  };
  // Verifica se atingiu o limite de tarefas
  if (taskCount >= maxTask) {
    btnSubmit.removeEventListener("click", handleClick);
    alert("Você adicionou o máximo de elementos!");
  }
  // Adiciona evento de clique ao botão
  btnSubmit.addEventListener("click", handleClick);

  // Função para adicionar uma nova tarefa
  let addTask = () => {
    if (taskCount < maxTask) {
      taskCount++; // Incrementa o contador
      let teste = document.createElement("div");
      teste.classList.add("task-list"); // Adiciona a classe "task-list"
      teste.innerHTML = `
            <input type="text">
            <div class="btn-checked-task">
                <button 
                    class="complete-task-button fa-solid fa-check"
                    type="button"
                ></button>
                <button
                    class="remove-task-button fa-solid fa-xmark"
                    type="button"
                ></button>
            </div>`;
      todoContainer.appendChild(teste); // Adiciona o <div> ao "todoContainer"
    }
  };
});

//Botão apagar

//Botão finalizar

// Botão editar