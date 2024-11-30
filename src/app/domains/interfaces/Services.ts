import {Skill} from "./Skill";

export interface Services {
  id: number;
  description: string;
  duration: number;
  price: number;
  provider: {
    id: number;
    skills: Skill[];
    city: string;
  };
  typeService: string;
}
