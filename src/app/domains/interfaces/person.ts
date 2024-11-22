import {Balance} from "@interfaces/balance";
import {User} from "@interfaces/user";

export class Person {
  id: number;
  slug: string;
  firstName: string;
  lastName: string;
  urlProfil: string;
  email: string;
  city: string;
  tel: string;
  street: string;
  photoUrl : string | undefined;
  profession : string | undefined;
  certifications: Array<{ name: string; link: string; description: string; imageUrl?: string }> | undefined;
  competences : string[] | undefined;
  skillLevels : any;
  biographie: string;
  createAt: Date;
  updateAt: Date;
  balance: Balance[];
  user: User[];

  constructor(
    id: number,
    slug: string,
    firstName: string,
    lastName: string,
    urlProfil: string,
    email: string,
    city: string,
    tel: string,
    street: string,
    biographie: string,
    createAt: Date,
    updateAt: Date,
    balance: Balance[] = [],
    user: User[] = []
  ) {
    this.id = id;
    this.slug = slug;
    this.firstName = firstName;
    this.lastName = lastName;
    this.urlProfil = urlProfil;
    this.email = email;
    this.city = city;
    this.tel = tel;
    this.street = street;
    this.biographie = biographie;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.balance = balance;
    this.user = user;
  }
}
