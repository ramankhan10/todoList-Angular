import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { TodoModel } from '../models/todo.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  categoryId: string = '';
  todos: Array<TodoModel> = [];
  isAddOrEdit: boolean = true;
  todoName: string = '';

  constructor(
    private activatedRout: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.activatedRout.snapshot.paramMap.get('id')!;
    this.todoService.fetchTodos(this.categoryId).subscribe((todos) => {
      this.todos = todos;
    });
  }

  onSubmit(form : NgForm) {
    const todoName = form.value.todoName
    if (this.isAddOrEdit) {
      this.todoService.createTodo(todoName,this.categoryId);
    } else {
      // this.todoService.editTodo(this.categoryId, newCategoryName);
      this.isAddOrEdit = true;
    }
    form.reset();
  }


  onDelete(todoId: string, categoryId: string) {
    this.todoService.deleteTodo(todoId, categoryId);
  }
}
