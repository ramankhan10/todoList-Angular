import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fireService: AngularFirestore) {}

  createTodo(todo: any) {
    todo.id = this.fireService.createId();
    return this.fireService.collection('Todo').add(todo);
  }

  deleteTodo(todo: any) {
    return this.fireService.collection('Todo').doc(todo.id).delete();
  }

  fetchTodos() {
    return this.fireService.collection('Todo').snapshotChanges();
  }

  fetchTodoById(todoId: number) {}

  editTodo() {}
}
