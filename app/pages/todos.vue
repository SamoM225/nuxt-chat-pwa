<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">Todos</h1>
    
    <form @submit.prevent="handleAdd" class="mb-6">
      <input 
        v-model="newTodo"
        type="text"
        placeholder="Nový todo..."
        class="border p-2 rounded mr-2"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Pridať
      </button>
    </form>
    
    <div v-for="todo in todos" :key="todo.id" class="flex items-center gap-4 mb-2">
      <input 
        type="checkbox"
        :checked="todo.completed"
        @change="toggleTodo(todo.id, !todo.completed)"
      />
      <p>
        {{ todo.title }}
      </p>
      <button @click="deleteTodo(todo.id)" class="text-red-500">
        Zmazať
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodos } from '../../composables/useTodos'
const { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodos()
const newTodo = ref('')

onMounted(() => fetchTodos())

const handleAdd = async () => {
  if (newTodo.value.trim()) {
    await addTodo(newTodo.value)
    await fetchTodos()
    newTodo.value = ''
  }
}
</script>