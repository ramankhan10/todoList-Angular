import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { TodoModel } from '../models/todo.model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  categoryId: string = '';
  todos: Array<TodoModel> = [];

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

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }
}
