import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Generic } from '../model/generic';


export  abstract class ComunesService <T extends Generic>{

  protected baseEndpoint:string;

  protected cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(protected http: HttpClient) {

  }

  public listar(): Observable<T[]> {
    return this.http.get<T[]>(this.baseEndpoint);
  }

  public listarPaginas(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/pagina`, { params: params });
    /*  return this.http.get<any>(`${this.urlAlumno}/pagina?page=${page}&size=${size}`); */

  }

  public ver(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseEndpoint}/${id}`);
  }

  public crear(entity: T): Observable<T> {
    return this.http.post<T>(this.baseEndpoint, entity, { headers: this.cabeceras });
  }

  public editar(entity: T): Observable<T> {
    return this.http.put<T>(`${this.baseEndpoint}/${entity.id}`, entity, { headers: this.cabeceras });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }







}


