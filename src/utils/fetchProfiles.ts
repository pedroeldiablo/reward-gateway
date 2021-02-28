import btoa from 'btoa';

export interface ProfileImage {
  title: string;
  avatar: string;
  height?: number;
  width?: number;
}
export interface Profile {
  uuid: string;
  company: string;
  bio: string;
  title: string;
  avatar: string;
}

let uri = 'http://localhost:8080/https://hiring.rewardgateway.net/list';

let headers = new Headers();
headers.append('Accept', 'application/json');
// let encoded = btoa(`hard:hard`);
// console.log({ encoded });
// let encoded = base64;
let envVar = btoa(
  `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
);
// console.log('process', process.env);
// console.log(process.env.REACT_APP_USERNAME);
// let encoded = 'aGFyZDpoYXJk';
let auth = 'Basic ' + envVar;
headers.append('Authorization', auth);
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
// console.log({ envVar });
// console.log({ encoded });
// console.log(auth);
// console.log(headers);

let req = new Request(uri, {
  method: 'GET',
  headers,
  // credentials: 'same-origin',
});
//credentials: 'same-origin'

console.log({ req });

export function fetchProfiles<T>(): Promise<T> {
  return fetch(req)
    .then(handleErrors)
    .then((response) => {
      console.log(response);
      return response;
    })
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
