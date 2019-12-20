import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public endpoint = 'http://localhost:3000' ;

  get(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response);
      });
  }

  getList(callback) {
    /*const list = [
      new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation('68 Abbasia St', 'Cairo', 30.0739446, 31.282989)),
      new Coffee('Caramel Americano', 'Star Cafe', new PlaceLocation('67 Abbasia St', 'Cairo', 30.146465, 31.282989))
      ];
    callback(list);*/
    this.http.get(`${this.endpoint}/coffees`)
      .subscribe(response => {
        callback(response);
      });
  }

  save(coffee, callback) {
    if (coffee._id) {
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          callback(true);
        });
    } else {
      this.http.post(`${this.endpoint}/coffees`, coffee)
        .subscribe(response => {
          callback(true);
        });
    }
  }
}
