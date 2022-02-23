import { catchError, flatMap, from, map, Observable, of } from "rxjs";
import { PlainObject } from "../interfaces/json-object.interface";
import { GenericApiResponse, GetVerifySmsCode } from "../interfaces/responses.interface";
import { IUser } from "../interfaces/user.interface";
import { IApiKey, IUserField, ServiceMethodResultsInfo } from "../interfaces/_common.interface";
import { isJwtFormat } from "../utils/common.utils";
import { AppConstants } from "./app.constants";
import { ClientService } from "./client.service";
import { StorageService } from "./storage.service";
import { UserStoreService } from "./user-store.service";



export class UsersService {
  static checkUserSession() {
    return UserStoreService.getChangesObs().pipe(
      flatMap((you: IUser | null) => {
        return you !== undefined
          ? of(you)
          : UsersService.checkSession().pipe(
              map((response: ServiceMethodResultsInfo<any>) => {
                return response.data.you || null;
              })
            );
      })
    );
  }

  private static checkSession(): Observable<ServiceMethodResultsInfo<any>> {
    return from(StorageService.getData(AppConstants.JWT_NAME)).pipe(
      flatMap((jwt: string | null | undefined) => {
        if (!jwt || jwt === `undefined` || !isJwtFormat(jwt)) {
          return from(StorageService.removeData(AppConstants.JWT_NAME)).pipe(
            map(() => {
              UserStoreService.setState(null);
              return (<ServiceMethodResultsInfo<any>> {
                message: `no token found`,
                data: {
                  online: false,
                  you: null,
                  token: null,
                }
              });
            })
          );
        }

        const observable = ClientService.sendRequest<any>(
          '/users/check-session',
          `GET`,
          null,
        ).pipe(
          map((response) => {
            UserStoreService.setState(response.data!.you);
            return response;
          })
        );
        return observable;
      })
    );
  }

  static sign_out() {
    return of().pipe(
      map(() => {
        StorageService.removeData(AppConstants.JWT_NAME).then(() => {
          UserStoreService.setState(null);
        });
        // console.log(`signed out`);
      })
    );
  }

  static verify_email(uuid: string): Observable<GenericApiResponse> {
    const endpoint = '/users/verify-email/' + uuid;
    return ClientService.sendRequest<GenericApiResponse>(endpoint, `GET`).pipe(
      map((response) => {
        StorageService.removeData(AppConstants.JWT_NAME).then(() => {
          UserStoreService.setState(null);
        });
        return response;
      })
    );
  }

  static send_sms_verification(phone: string): Observable<GenericApiResponse> {
    const endpoint = '/users/send-sms-verification/' + phone;
    return ClientService.sendRequest<GenericApiResponse>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static verify_sms_code(params: {
    request_id: string,
    code: string,
  }): Observable<GetVerifySmsCode> {
    const { request_id, code } = params;
    const endpoint = `/users/verify-sms-code/request_id/${request_id}/code/${code}`;
    return ClientService.sendRequest<GetVerifySmsCode>(endpoint, `GET`).pipe(
      map((response: any) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static send_feedback(you_id: number, data: PlainObject) {
    const endpoint = `/users/${you_id}/feedback`;
    return ClientService.sendRequest<any>(endpoint, `POST`, data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /** */

  static get_user_by_id(id: number) {
    const endpoint = '/users/id/' + id;
    return ClientService.sendRequest<IUser>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_home_page_stats(id: number) {
    const endpoint = `/users/${id}/home-stats`;
    return ClientService.sendRequest<PlainObject<number>>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_by_phone(phone: string) {
    const endpoint = '/users/phone/' + phone;
    return ClientService.sendRequest<IUser>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_followers_count(user_id: number) {
    const endpoint = `/users/${user_id}/followers-count`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_followings_count(user_id: number) {
    const endpoint = `/users/${user_id}/followings-count`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_messagings(you_id: number, messagings_timestamp?: string, get_all: boolean = false) {
    const endpoint = get_all
      ? '/users/' + you_id + '/messagings/all'
      : messagings_timestamp
        ? '/users/' + you_id + '/messagings/' + messagings_timestamp
        : '/users/' + you_id + '/messagings';
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_messages_all(you_id: number, user_id: number) {
    const endpoint = '/users/' + you_id + '/messages/' + user_id + '/all';
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_messages(you_id: number, user_id: number, min_id?: number) {
    const endpoint = min_id
      ? '/users/' + you_id + '/messages/' + user_id + '/' + min_id
      : '/users/' + you_id + '/messages/' + user_id;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_unseen_counts(you_id: number) {
    const endpoint = `/users/${you_id}/unseen-counts`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_api_key(you_id: number) {
    const endpoint = `/users/${you_id}/api-key`;
    return ClientService.sendRequest<IApiKey>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static find_users_by_name(query_term: string) {
    const endpoint = `/find/users/name?query_term=${query_term}`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static find_users_by_username(query_term: string) {
    const endpoint = `/find/users/username?query_term=${query_term}`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static find_users_by_name_or_username(query_term: string) {
    const endpoint = `/find/users/name-or-username?query_term=${query_term}`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // generic

  static get_random_models(
    you_id: number,
    model_name: string,
    industry: string = '',
    gallup_strength: string = '',
    pred_ref_profile: string = '',
    cause: string = '',
  ) {
    const endpoint = `/users/${you_id}/random?model_name=${model_name}&industry=${industry}&gallup_strength=${gallup_strength}&pred_ref_profile=${pred_ref_profile}&cause=${cause}`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static get_user_feed(you_id: number, feed_type: string, min_id?: number) {
    const endpoint = min_id
      ? `/users/${you_id}/feed/${min_id}?feed_type=${feed_type}`
      : `/users/${you_id}/feed?feed_type=${feed_type}`;
    return ClientService.sendRequest<any>(endpoint, `GET`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  /** POST */

  static sign_up(data: PlainObject) {
    return ClientService.sendRequest<any>('/users', `POST`, data).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static create_user_field(id: number, data: PlainObject) {
    return ClientService.sendRequest<GenericApiResponse<IUserField>>(`/users/${id}/user-field`, `POST`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static follow_user(you_id: number, user_id: number) {
    const endpoint = `/users/${you_id}/follows/${user_id}`;
    return ClientService.sendRequest<any>(endpoint, `POST`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static send_user_message(you_id: number, user_id: number, data: PlainObject) {
    return ClientService.sendRequest<any>(`/users/${you_id}/send-message/${user_id}`, `POST`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static update_user_last_opened(you_id: number) {
    return ClientService.sendRequest<any>(`/users/${you_id}/notifications/update-last-opened`, `POST`).pipe(
      map((response: any) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  
  /** PUT */
  
  static create_stripe_account<T = any>(you_id: number) {
    return ClientService.sendRequest<GenericApiResponse<T>>(
      `/users/${you_id}/create-stripe-account`, `PUT`
    ).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  static verify_stripe_account<T = any>(you_id: number) {
    return ClientService.sendRequest<GenericApiResponse<T>>(
      `/users/${you_id}/verify-stripe-account`, `PUT`
    ).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  static sign_in(data: PlainObject) {
    return ClientService.sendRequest<any>('/users', `PUT`, data).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static update_info(id: number, data: PlainObject) {
    const endpoint = `/users/${id}/info`;
    return ClientService.sendRequest<any>(endpoint, `PUT`, data).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static update_password(id: number, data: PlainObject) {
    const endpoint = `/users/${id}/password`;
    return ClientService.sendRequest<any>(endpoint, `PUT`, data).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static update_phone(id: number, data: PlainObject) {
    const endpoint = `/users/${id}/phone`;
    return ClientService.sendRequest<any>(endpoint, `PUT`, data).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static update_icon(id: number, formData: FormData) {
    const endpoint = `/users/${id}/icon`;
    return ClientService.sendRequest<any>(endpoint, `PUT`, formData).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static update_wallpaper(id: number, formData: FormData) {
    const endpoint = `/users/${id}/wallpaper`;
    return ClientService.sendRequest<any>(endpoint, `PUT`, formData).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  static update_user_field(you_id: number, id: number, data: PlainObject) {
    const endpoint = `/users/${you_id}/user-field/${id}`;
    return ClientService.sendRequest<IUserField>(endpoint, `PUT`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  static update_latest_coordinates(you_id: number, data: { lat: number, lng: number, automated: boolean }) {
    const endpoint = `/users/${you_id}/latest-coordiates`;
    return ClientService.sendRequest<any>(endpoint, `PUT`, data).pipe(
      map((response) => {
        StorageService.storeData(AppConstants.JWT_NAME, response.data.token).then(() => {
          UserStoreService.setState(response.data.you);
        });
        return response;
      })
    );
  }

  /** DELETE */

  static delete_user_field(you_id: number, id: number) {
    const endpoint = `/users/${you_id}/user-field/${id}`;
    return ClientService.sendRequest<GenericApiResponse>(endpoint, `DELETE`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}