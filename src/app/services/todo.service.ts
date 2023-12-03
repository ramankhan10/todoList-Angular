import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fireService: AngularFirestore) {}

  createTodo(todo: any) {
    todo.id = this.fireService.createId();
    return this.fireService.collection('todos').add(todo);
  }

  deleteTodo(todoId: string) {
    this.fireService
      .collection('todos')
      .doc(todoId)
      .delete()
      .then((res) => {});
  }

  fetchTodos(categoryId: string) {
    return this.fireService
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((documentAction) => {
            const data: any = documentAction.payload.doc.data();
            const id = documentAction.payload.doc.id;
            const todo: TodoModel = {
              id: id,
              title: data.title,
              isCompleted: data.isCompleted,
            };
            return todo;
          });
        })
      );
  }

  fetchTodoById(todoId: number) {}

  editTodo() {}
}
