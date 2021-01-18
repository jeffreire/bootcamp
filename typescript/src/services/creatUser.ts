/**
 * Para criar: nome, email, password
 */


interface TechObject {
  title: string;
  experience: number; 
}

interface CreatUserDate {
  name?: string;
  email: string;
  password: string; 
  techs: Array<string | TechObject>;
}


export default function creatUser({name, email, password}: CreatUserDate) {
  const user = {
    name,
    email,
    password,
  }

  return user;
}