import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { ResponseAPIGetAll } from '../../interfaces/ResponseAPI_GetAll';

@Component({
  selector: 'characters-card',
  imports: [HttpClientModule],
  providers: [CharacterService],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  private characterService: CharacterService = inject(CharacterService);

  public characters: ResponseAPIGetAll[] = [];

  public errors : string[] = [];

  constructor () {}

  ngOnInit(): void {
    this.obtenerPersonajes(); 
  }

  obtenerPersonajes(page : number = 1)  
  {
    this.characterService.getCharacters(page).then((characters) => {
      console.log(characters);
      this.characters.push(...characters);
    }).catch((error) => {
      console.log(error)
    });
  }
}
