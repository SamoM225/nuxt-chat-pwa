export const useTodos = () => {
  const todos = useState<any[]>('todos', () => [])

  const fetchTodos = async () => {
    const data = await $fetch('/api/todos')
    if ('data' in data && Array.isArray(data.data)) {
      todos.value = data.data;
    } else if ('error' in data) {
      console.error('Failed to fetch todos:', data.error);
      todos.value = [];
    } else {
      console.error('Failed to fetch todos: Unknown error');
      todos.value = [];
    }
  }
  
  const addTodo = async (title: string) => {
    const data = await $fetch('/api/todos', {
      method: 'POST',
      body: { title }
    })
    todos.value.unshift(data)
  }
  
  const toggleTodo = async (id: string, completed: boolean) => {
    await $fetch(`/api/todos/${id}`, {
      method: 'POST',
      body: { action: 'toggle', completed }
    })
    await fetchTodos()
  }
  
  const deleteTodo = async (id: string) => {
    await $fetch(`/api/todos/${id}`, { method: 'POST', body: { action: 'delete' } })
    todos.value = todos.value.filter(t => t.id !== id)
  }
  
  return {
    todos,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}