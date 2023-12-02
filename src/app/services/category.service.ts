import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private fireService: AngularFirestore) {}

  fetchCategories() {
    return this.fireService
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((documentAction) => {
            const data = documentAction.payload.doc.data();
            const id = documentAction.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
