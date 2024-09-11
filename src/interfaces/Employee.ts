export interface IEmployee {
  id: number;
  name: string;
  isArchive: boolean;
  phone: string;
  birthday: string;
  role: "cook" | "waiter" | "driver";
}
