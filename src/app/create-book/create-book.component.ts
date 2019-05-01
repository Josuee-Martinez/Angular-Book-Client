import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  useBtn = false;
  createBook: FormGroup;
  books = [];

  constructor(private fb: FormBuilder, private dbService: DatabaseService) { 
    setTimeout(() => {
      this.useBtn = true;
    }, 3000);
  }

  ngOnInit() {
    this.createBook = this.fb.group({
      nameOfBook: new FormControl(),
      author: new FormControl(),
      genre: new FormControl(),
      pubYear: new FormControl(),
      rating: new FormControl()
    })

    this.findBooks();
  }

  onCreateBook(): void {
    this.books.push(this.createBook.value);
  }

  findBooks(): void {
    this.dbService.getBooks().subscribe(Books => {
      this.books = Books;
      this.books.reverse();
    })
  }

}
