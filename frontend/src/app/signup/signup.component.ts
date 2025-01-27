import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  onSubmit() {
    // subscribe sert à lancer la fonction signupToApi
    this.auth.signupToApi(this.name, this.email, this.password).subscribe({
      next: () => {},
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => alert('User registered'),
    });

    // console.log('Name:', this.name);
    // console.log('Email:', this.email);
    // console.log('Password:', this.password);
  }
}

/*
Comprendre l'observable : 
const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

observable.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Terminé')
});
*/
