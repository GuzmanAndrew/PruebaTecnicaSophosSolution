import { HttpHeaders } from '@angular/common/http';

export function createBasicAuthHeader(username: string, password: string): HttpHeaders {
  const authString = `${username}:${password}`;
  const base64Auth = btoa(authString);
  return new HttpHeaders({
    'Authorization': `Basic ${base64Auth}`
  });
}
