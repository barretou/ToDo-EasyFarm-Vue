new Vue({
    el: "#app", //id da div (no caso específico é uma tag main) que terá a DOM manipulada pelo VueJS
    data: {
        currentTodo: "", //exemplo básico de data biding, essa informação será manipulada dentro da tag <p>
        todos: [ //esse array de objetos todos, vai conter todas as tarefas.
            { text: "Atender um cliente", done: false },
            { text: "Interagir com o time de Desenvolvimento", done: false },
            { text: "Reuníão com o time de People", done: true }
        ]
    },
    methods: {
        toggleTodo(todo) {
            todo.done = !todo.done;
            this.sortTodos();
        },
        adicionarTodo() {
            if(!this.currentTodo.trim() || this.checkIfTodoExists()) return;
            this.todos.push({
                text: this.currentTodo,
                done: false
            });
            this.currentTodo = "";
            this.sortTodos();
        },
        deleteTodo(todo) {
            this.todos = this.todos.filter(el => el.text !== todo.text);
        },
        sortTodos() {
            this.todos.sort((a,b) => a.done - b.done);
        },
        checkIfTodoExists() {
            return this.todos.some((todo) => todo.text === this.currentTodo.trim());
        }
    },
    computed: {
        filteredTodos() {
            return this.todos.filter(
                todo => todo.text.toLowerCase().match(this.currentTodo.toLowerCase())
            );
        }
    }
});