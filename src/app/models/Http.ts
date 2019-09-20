import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T>(
  operation?: string,
  result?: T
) => (error: HttpErrorResponse) => Observable<T>;

export interface Headers {
  [headerKey: string]: string;
}

export interface Loading {
  bulk: boolean;
  single: boolean;
}

export interface CRUDLoading extends Loading {
  creating?: boolean;
  updating?: boolean;
  deleting?: boolean;
}
