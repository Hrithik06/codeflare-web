export default interface UserInterface {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    gender: string,
    about?: string,
    photoUrl?: string,
    skills?: string[]
}