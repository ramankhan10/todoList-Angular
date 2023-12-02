import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categories: Array<any> = [];

  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
      
    });
  }
}
