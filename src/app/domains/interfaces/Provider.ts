export interface Providers {
  id: number;
  "firstName": string;
  "lastName": string;
  "urlProfil": string;
  "email": string;
  "city": string;
  "tel": string;
  "street": string;
  "biographie": string;
  "createAt": Date;
  "updateAt": Date;
  "user": {
    "actif": boolean,
    "userName": string,
    "password": string,
    "role": {
      "role": string,
    },
  }
}
