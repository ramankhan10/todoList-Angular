import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { TodoModel } from '../models/todo.model';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fireService: AngularFirestore) {}

  createTodo(todoName: string, categoryId: string) {
    const id = this.fireService.createId();
    const newTodo: TodoModel = {
      id: id,
      title: todoName,
      isCompleted: false,
    };
    this.fireService
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .add(newTodo)
      .then((res) => {
        this.fireService
          .collection('categories/' + categoryId)
          .doc()
          .update({ todoCount: 0 });
      });
  }

  // editTodo() {}

  deleteTodo(todoId: string, categoryId: string) {
    return this.fireService
      .collection('categories/' + categoryId + '/todos/')
      .doc(todoId)
      .delete();
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
