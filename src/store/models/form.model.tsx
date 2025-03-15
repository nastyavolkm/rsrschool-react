export interface FormState {
  name: string | null;
  age: number | null;
  email: string | null;
  password: string | null;
  confirmedPassword: string | null;
  gender: 'female' | 'male' | 'other' | null;
  accept: boolean;
  upload: File | string | null;
  country: string | null;
}
