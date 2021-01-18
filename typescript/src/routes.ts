import {Request, Response} from 'express';
import creatUser from './services/creatUser.js';


export function helloWorld(request: Request, response: Response) {
  const user = creatUser({
    email: 'jeffreire0711@gmail.com',
    password: '123456',
    techs: ['Nodejs', 
      'java', 
      'C#', 
      'Python', 
      'React js', 
      'React-Native',
      {title: 'Python', experience: 80},
    ]
  });

  return response.json( user );
}