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

  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(form: NgForm) {
    const newCategoryName = form.value.categoryName;
    this.categoryService.addCategory(newCategoryName);
  }
}
