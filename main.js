new Vue({
    el: "#app", //selecionando o elemento a ser manipulado pelo Vue por ID
    data: {

      // Variável que será utilizada para verificar qual o botão que deverá ser exibido: Adicionar o Atualizar
      addOrEdit: 'add',

      // Variável que irá salvar o ID do item clicado para que possamos verificar qual item do objeto deve ser atualizado
      currentId: null,

      currentTodo: "", //elemento setado no v-model no indexHTML (bind)

      /* Foi adicionado um ID para identificar o cada um dos itens do TODO. 
      No momento de editar e verificar qual item da lista deve ser atualizado, esse ID será muito útil*/
      todos: [ 
        {id: 1, text: "Atender um cliente", done: false},
        {id: 2, text: "Interagir com o time de Desenvolvimento", done: false},
        {id: 3, text: "Reuníão com o time de People", done: true}
      ]
    },

    /*Methods é onde descrevemos todas funções chamadas pelos eventos disparados. 
    Basicamente toda reatividade da aplicação está aqui */ 
    methods: {
      toggleTodo(todo) {
        todo.done = !todo.done;
        this.sortTodos();
      },
      adicionarTodo() {
        if (!this.currentTodo.trim() || this.checkIfTodoExists()) return;
        
        // O ID será incremental, ele pegará o tamanho do objeto e irá adicionar mais 1, de forma que os IDS não repitam
        let id = this.todos.length + 1;
        
        this.todos.push({
          text: this.currentTodo,
          done: false,
          id: id,
        });
        this.currentTodo = "";
        this.sortTodos();
      },
      editTodo(todo) {
        // Buscamos no objeto o ID do item que foi solicitado a edição
        let item = this.todos.find(item => {
          return item.id === todo;
        });
        
        // Salvamos o ID do item para utilizarmos na hora de atualizar o mesmo
        this.currentId = item.id;
        // Troca o valor para mudar o botão
        this.addOrEdit = 'edit';
        // Pega o texto do item atual
        this.currentTodo = item.text;
      },
      updateTodo() {
        // É verificado se o ID do item no loop é igual ao ID do item que está sendo editado.
        // Quando for, nós atualizamos o texto do item.
        this.todos.filter((item) => {
          if (this.currentId === item.id) {
            item.text = this.currentTodo;
          }
        });
    
        // Limpamos o ID
        this.currentId = null;
        // Voltamos o texto para o botão de adicionar
        this.addOrEdit = 'add';
        this.currentTodo = '';
      },

      //função para deletar o elemento texto dentro do array todos
      deleteTodo(todo) {
        this.todos = this.todos.filter(el => el.text !== todo.text);
      },
      //função para filtrar as tarefas que ja foram grifadas como feitas pro fim do array e as que estão a ser feitas pro começo do array
      sortTodos() {
        this.todos.sort((a, b) => a.done - b.done);
      },
      //função para verificar se a tarefa existe para inserir dentro do array de tarefas a fazer
      checkIfTodoExists() {
        return this.todos.some((todo) => todo.text === this.currentTodo.trim());
      }
    },

    //função para retonar o array
    computed: {
      filteredTodos() {
        return this.todos;        
      }
    }
  });
  
  