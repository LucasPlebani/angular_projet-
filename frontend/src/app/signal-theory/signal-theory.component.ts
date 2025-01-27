import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signal-theory',
  imports: [],
  templateUrl: './signal-theory.component.html',
  styleUrl: './signal-theory.component.scss',
})
export class SignalTheoryComponent {
  count = signal(0);

  constructor() {
    // La fonction effect est utilisée pour créer un effet.
    // Elle prend en argument une fonction callback qui sera exécutée lorsque les signaux dépendants changent.
    // Dans ce cas, la fonction callback est une fonction fléchée sans arguments.

    // ATTENTION, ne pas mettre le .set dans le constructeur, sinon ça tourne en boucle (comme 51 000x)
    // un effet est appelé à chaque modification des signal qu'il contient
    effect(() => {
      console.log('count est à la valeur ', this.count());
    });
    this.count.set(1);
    this.count.set(2);
    this.count.set(3);
  }
}

/*
// signal est primitif
const count = signal(1);
count.set(2); // changer la valeur de count
count.update((count) => count + 1); // rajouter +1 à count
console.log(count()); // afficher la valeur de count

// computed est un signal dévrivé d'un signal primitif
// Il n'existe pas de .set pour un signal dérivé
// On ne peut pas modifier à la main un signal dérivé
// Un calculé (computed) est une valeur dérivée qui est automatiquement mise à jour
// en fonction d'autres valeurs ou signaux.
const comput: any = computed(() => count() * 2); // comput prend la valeur de count

/*
En mettant des dérivés dans des composants, on peut mettre à jour le signal, 
qui va se reporter dans tous les composants où il sera appelé.
  Exemple : si on a un signal dans un service pour un panier d'achat,
  il pourra être répercuté dans tous les composants où il sera utilisé


const showCount = signal(false);
const conditionalCount = computed(() => {
  console.log('Entrée dans conditionnalCount');
  if (showCount()) {
    console.log('recalcul de count');
    return `count : ${count()}.`;
  } else {
    return 'Rien à voir.';
  }
});

const count = signal(0);
const computedSignal = computed(() => count() * 2);
console.log(count(), computedSignal());

count.set(3);
console.log(count(), computedSignal());

count.update((value) => value + 1);
console.log(count(), computedSignal());

const showCount = signal(false);
const conditionalCount = computed(() => {
  console.log('Entree dans conditionnalCount');
  if (showCount()) {
    console.log('recalcul de count');
    return `count : ${count()}.`;
  } else {
    return 'Rien à voir.';
  }
});

console.log('\n utilisation de conditionalCount');
console.log(1, conditionalCount());

console.log('\n modification de count');
count.set(5);
console.log(2, conditionalCount()); // affiche uniquement Rien à voir,
// pas "entrée dans conditionnalCount" puis "RAV"

console.log('\n modification de showCount(true) puis count');
showCount.set(true);
count.set(6);
console.log(3, conditionalCount()); // affiche entrée[...], recalcul, count : 6
*/
