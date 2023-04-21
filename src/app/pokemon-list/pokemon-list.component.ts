import { Component, OnInit } from '@angular/core';
import { tap,skipWhile } from 'rxjs/operators';
import { PokedexService,PokemonDetails } from '../api_service/pokedex.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  fetching = true;
  pokemons$ = this.pokeapi.pokemons$.pipe(
    tap((x) => {
      console.log(x);
      this.fetching = false;
    }),
    skipWhile((x) => x.length === 0)
  );
  constructor(private pokeapi: PokedexService) {}

  ngOnInit(): void {}

  onNext(event: any) {
    if (!this.fetching)
      if (
        event.srcElement &&
        event.srcElement.scrollTop >
          ((event.srcElement.scrollHeight - event.srcElement.offsetHeight) *
            8) /
            20
      ) {
        this.fetching = true;
        this.pokeapi.get_next();
      }
  }

  trackPokemon(index: number, pokemon: PokemonDetails): number {
    return pokemon.id;
  }
}
