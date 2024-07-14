// Seleciona o contêiner das tarefas na página
const todoContainer = document.querySelector(".todo-itens");

// Função para salvar as tarefas no localStorage
const saveInLocalStorage = () => {
  // Array para armazenar os textos das tarefas
  const tasks = [];
  // Seleciona todas as divs com a classe 'task-list'
  const taskList = document.querySelectorAll(".task-list");
  // Itera sobre cada div 'task-list'
  taskList.forEach((task) => {
    // Encontra o input de texto dentro de cada 'task-list'
    const inputText = task.querySelector('input[type="text"]');
    // Se encontrou o input, adiciona seu valor ao array 'tasks'
    if (inputText) {
      tasks.push(inputText.value);
    }
  });
  // Salva o array 'tasks' no localStorage convertendo para JSON
  localStorage.setItem("texto", JSON.stringify(tasks));
};

// Variáveis para controle de tarefas
let taskCount = 0; // Contador de tarefas adicionadas
const maxTask = 15; // Número máximo de tarefas permitidas

// Função para adicionar uma nova tarefa
const addTask = (text = "") => {
  // Verifica se ainda não atingiu o limite máximo de tarefas
  if (taskCount < maxTask) {
    // Incrementa o contador de tarefas
    taskCount++;
    // Cria um novo elemento div para a tarefa
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-list"); // Adiciona a classe 'task-list' à div
    // Define o HTML interno da div com um input de texto e botões
    taskDiv.innerHTML = `
      <input type="text" value="${text}">
      <div class="btn-checked-task">
        <button class="finished-task-button fa-solid fa-check" type="button"></button>
        <button class="remove-task-button fa-solid fa-xmark" type="button"></button>
      </div>`;
    // Adiciona a div da tarefa ao contêiner principal
    todoContainer.appendChild(taskDiv);

    // Seleciona o input de texto dentro da nova div da tarefa
    const inputField = taskDiv.querySelector("input[type='text']");
    // Adiciona um ouvinte de evento para salvar no localStorage em tempo real
    inputField.addEventListener("input", saveInLocalStorage);

    // Seleciona o botão de finalizar tarefa dentro da nova div da tarefa
    const btnFinished = taskDiv.querySelector(".finished-task-button");
    // Adiciona um ouvinte de evento para alternar entre concluído e não concluído
    btnFinished.addEventListener("click", () => {
      // Verifica se o campo de texto está vazio ao tentar finalizar
      if (!inputField.value) {
        alert("Digite sua tarefa!");
      } else {
        // Alterna entre os ícones de finalizado e não finalizado
        btnFinished.classList.toggle("fa-check");
        btnFinished.classList.toggle("fa-pen-to-square");
        // Altera o estilo do texto da tarefa para tachado quando finalizado
        inputField.style.textDecoration = "line-through";
        // Altera o estilo da borda da div da tarefa quando finalizado
        if (btnFinished.classList.contains("fa-pen-to-square")) {
          taskDiv.style.border = "1px solid green";
        } else {
          taskDiv.style.border = "none";
          inputField.style.textDecoration = "none";
        }
      }
    });

    // Seleciona o botão de remover tarefa dentro da nova div da tarefa
    const btnRemove = taskDiv.querySelector(".remove-task-button");
    // Adiciona um ouvinte de evento para remover a tarefa
    btnRemove.addEventListener("click", () => {
      // Remove a div da tarefa do contêiner principal
      taskDiv.remove();
      // Salva no localStorage após remover a tarefa
      saveInLocalStorage();
    });

    // Salva no localStorage ao adicionar uma nova tarefa
    saveInLocalStorage();
  }
};

// Função para restaurar as tarefas do localStorage ao carregar a página
const restoreFromLocalStorage = () => {
  // Obtém o array de tarefas do localStorage convertido de JSON para objeto JavaScript
  const taskItems = JSON.parse(localStorage.getItem("texto"));
  // Se houver itens salvos no localStorage, adiciona cada um como uma nova tarefa
  if (taskItems) {
    taskItems.forEach((text) => {
      addTask(text);
    });
  }
};

// Aguarda o DOM ser completamente carregado para iniciar as operações
document.addEventListener("DOMContentLoaded", () => {
  // Restaura as tarefas do localStorage ao carregar a página
  restoreFromLocalStorage();
  
  // Seleciona o botão de adicionar tarefa
  const btnSubmit = document.querySelector(".add-task-button");
  // Ouvinte de evento para adicionar uma nova tarefa ao clicar no botão
  const handleClick = (e) => {
    e.preventDefault();
    addTask();
  };
  btnSubmit.addEventListener("click", handleClick);
});
