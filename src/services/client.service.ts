import { Observable } from "rxjs";
import { ServiceMethodResultsInfo } from "../interfaces/_common.interface";
import { AppConstants } from "./app.constants";
import { StorageService } from "./storage.service";
import { Constants } from "expo-constants";



export class ClientService {
  private static API_DOMAIN: string = 'http://0404-2601-147-8200-5000-00-8181.ngrok.io/mobile';

  static sendRequest<T = any>(
    route: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object | FormData | null,
  ): Observable<ServiceMethodResultsInfo<T>> {
    return new Observable((observer) => {
      StorageService.getData(AppConstants.JWT_NAME).then((jwt: string | null | undefined) => {
        const api_url = ClientService.API_DOMAIN + route;
        
        const headers: any = {
          'Accept': 'application/json',
          'Authorization': `Bearer ${jwt}`
        };
        if (data && data.constructor === Object) {
          headers['Content-Type'] = 'application/json';
        }
        
        const fetchOptions: any = {
          method,
          headers,
          // credentials: 'include',
        }
        
        switch (method) {
          case 'POST':
          case 'PUT': {
            if (data) {
              fetchOptions['body'] = data && data.constructor === Object ? JSON.stringify(data) : (<FormData> data);
            }
            break;
          }
        }
          
        // console.log(`fetching...`, api_url, fetchOptions);

        fetch(api_url, fetchOptions)
          .then(async (response: Response) => {
            const isError = (
              response.status.toString().startsWith('4') ||
              response.status.toString().startsWith('5')
            );
            // console.log(`response`, response, isError);
            return {
              isError,
              data: await response.json()
            };
          })
          .then((results) => {
            // console.log({results});
            if (results.isError) {
              observer.error(results.data as ServiceMethodResultsInfo<T>);
              observer.complete();
              return;
            }

            observer.next(results.data as ServiceMethodResultsInfo<T>);
            observer.complete();
          })
          .catch((error) => {
            // console.error(`fetch error`, error);
            observer.error(error);
            observer.complete();
          });
      });
    });
  }
}