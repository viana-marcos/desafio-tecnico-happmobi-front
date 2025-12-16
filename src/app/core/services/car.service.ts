import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { lastValueFrom  } from 'rxjs';

const SAVE = 'car/new';
const LIST = 'car/list';

@Injectable({
  providedIn: 'root'
})
export class CarService { 
  
  env:any;

  public typesBodiesOptions = [
    { text: 'Hatch compacto', value: 'Hatch compacto'},
    { text: 'Hatch médio', value: 'Hatch médio'},
    { text: 'SUV compacto', value: 'SUV compacto'},
    { text: 'SUV grande', value: 'SUV grande'},
    { text: 'Crossover', value: 'Crossover'},
    { text: 'Coupé', value: 'Coupé'},
    { text: 'Picape leve', value: 'Picape leve'},
    { text: 'Picape leve-média', value: 'Picape leve-média'},
    { text: 'Picape média', value: 'Picape média'},
    { text: 'Sedan Compacto', value: 'Sedan Compacto'},
    { text: 'Sedan Médio', value: 'Sedan Médio'},
    { text: 'Sedan Grande', value: 'Sedan Grande'},
    { text: 'Minivan/monovolume', value: 'Minivan/monovolume'},
    { text: 'Utilitário leve', value: 'Utilitário leve'},
    { text: 'Utilitário', value: 'Utilitário'}
  ];

  public engineTypeOptions = [
    { text: 'Motor 1.0', value: 'Motor 1.0'},
    { text: 'Motor 1.4', value: 'Motor 1.4'},
    { text: 'Motor 1.6', value: 'Motor 1.6'},
    { text: 'Motor 1.8', value: 'Motor 1.8'},
    { text: 'Motor 2.0', value: 'Motor 2.0'},
  ];

  public numbeSeatsOptions = [
    { text: '2 Lugares', value: '2 Lugares'},
    { text: '3 Lugares', value: '3 Lugares'},
    { text: '4 Lugares', value: '4 Lugares'},
    { text: '5 Lugares', value: '5 Lugares'},
    { text: '6 Lugares', value: '6 Lugares'},
    { text: '7 Lugares', value: '7 Lugares'}
  ]

  constructor(private httpClient: HttpClient) {
    this.env = (environment as any);
  }

  public async getCarById(id:string) {
    return await lastValueFrom(this.httpClient.get<any>(this.env.api_url + 'car', {params: {id}}));
  } 

  public async getCarList(filter:any) {
    const keys = Object.keys(filter);
    const _filter = {}  as any;    
    keys.forEach(key=>{
      const value = filter[key];
      if(value){
        _filter[key] = value;
      }
    })

    _filter.page = filter.page;
    _filter.size = filter.size;

    return await lastValueFrom(this.httpClient.get<any>(this.env.api_url + LIST, {params: _filter}));
  }  

  public async save(data: any) {
    return await lastValueFrom (this.httpClient.post<any>(this.env.api_url + SAVE, data));
  }
  
  public async update(id:string, data: any) {
    return await lastValueFrom (this.httpClient.put<any>(this.env.api_url + 'car/' + id, data));
  }

  public async delete(id:string) {
    return await lastValueFrom (this.httpClient.delete<any>(this.env.api_url + 'car/' + id));
  }

  public async toReserve(carId:string, userId: any) {
    return await lastValueFrom (this.httpClient.put<any>(this.env.api_url + 'car/to-reserve/' + carId + '/' + userId, {}));
  }

  public async endReserve(carId:string, userId: any) {
    return await lastValueFrom (this.httpClient.put<any>(this.env.api_url + 'car/end-reserve/' + carId + '/' + userId, {}));
  }

}