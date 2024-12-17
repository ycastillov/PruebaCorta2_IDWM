import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPIGetAll } from '../interfaces/ResponseAPI_GetAll';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl: string = 'https://rickandmortyapi.com/api/character';

  public errors: string[] = [];

  private http = inject(HttpClient);

  async getCharacters(page : number = 1, name? : string) : Promise<ResponseAPIGetAll[]>
  {
    try
    {
      let queryParams = new HttpParams().set('page', page.toString());

      if (name)
      {
        queryParams = queryParams.set('name', name);
      }

      const response = await firstValueFrom(this.http.get<ResponseAPIGetAll[]>(`${this.baseUrl}`, {params : queryParams}));
      return Promise.resolve(response);
    }
    catch(error)
    {
      console.log("Error en getAllCharacters",error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
