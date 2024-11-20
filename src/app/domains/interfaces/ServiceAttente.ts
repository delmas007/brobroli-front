export interface ServiceAttente {
  id: number;
  description: string;
  duration: number;
  price: number;
  provider: {
    user: {
      userName: string;
    }
  };
  status: string;
  typeService: string;
  createAt:Date;
}
