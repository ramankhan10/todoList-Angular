import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from '../models/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categories: Array<CategoryModel> = [];
  categoryName: string = '';
  isAdd: boolean = true;
  categoryId: string = '';

  
  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(form: NgForm) {
    const newCategoryName = form.value.categoryName;
    if (this.isAdd) {
      this.categoryService.addCategory(newCategoryName);
    } else {
      this.categoryService.editCategory(this.categoryId, newCategoryName);
    }
    form.reset();
  }

  onDragStart(event: DragEvent, categoryId: any) {
    event.dataTransfer?.setData('text/plain', categoryId);
  }

  onDrop(event: DragEvent) {
    const categoryId = event.dataTransfer?.getData('text/plain');
    const category = this.categories.filter((category) => {
      return category.id == categoryId;
    });
    this.categoryId = categoryId!;
    this.categoryName = category[0].Category;
    this.isAdd = false;
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }
}
