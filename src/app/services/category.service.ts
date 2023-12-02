import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private fireService: AngularFirestore) {}

  fetchCategories(): Observable<CategoryModel[]> {
    return this.fireService
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((documentAction) => {
            const data: any = documentAction.payload.doc.data();
            const id = documentAction.payload.doc.id;
            const category: CategoryModel = {
              id: id,
              Category: data.Category,
              ColorCode: data.ColorCode,
              todoCount: data.todoCount,
            };
            return category;
          });
        })
      );
  }

  addCategory(Category: string) {
    let newCategory: CategoryModel = {
      Category: Category,
      ColorCode: this.colorGenerator(),
      todoCount: 0,
    };
    this.fireService.collection('categories').add(newCategory);
  }

  private colorGenerator(): string {
    const colorsArray = [
      '#e7845e',
      '#fc0184',
      '#f6b93f',
      '#9224a7',
      '#20c898',
      '#f03734',
      '#aad450',
      '#026467',
      '#fefefe',
      '#928779',
      '#D4D2A5',
      '#FCDEBE',
      '#90A583',
      '#B26E63',
      '#C6CAED',
    ];
    let randomNumber = Math.floor(Math.random() * colorsArray.length);
    return colorsArray[randomNumber];
  }
}
