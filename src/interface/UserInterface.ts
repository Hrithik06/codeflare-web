export default interface UserInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  emailId: string;
  dateOfBirth: Date | string;
  age?: number;
  gender: string;
  about: string;
  photoUrl?: string;
  skills: string[];
}
