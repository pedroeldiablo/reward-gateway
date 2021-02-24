import btoa from 'btoa';
// import { error } from 'console';

export interface Profile {
  uuid: string;
  company: string;
  bio: string;
  title: string;
  avatar: string;
}

let uri = 'https://hiring.rewardgateway.net/list';

let headers = new Headers();
headers.append('Accept', 'application/json');
let encoded = btoa(`${process.env.USERNAME}:${process.env.PASSWORD}`);
console.log({ encoded });
let auth = 'Basic ' + encoded;
headers.append('Authorization', auth);
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
console.log(auth);
console.log(headers);

let req = new Request(uri, {
  method: 'GET',
  headers,
  credentials: 'same-origin',
});
//credentials: 'same-origin'

export function fetchProfiles<T>(): Promise<T> {
  return fetch(req)
    .then(handleErrors)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  console.log(response);
  return response;
}
