import { NextResponse } from "next/server";
import { db } from "../lib/db";
import {hash} from 'bcrypt'
import * as z from 'zod'


//Define the schema for input validation 
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(1, 'Password must have than 8 characters'),
  })
 


export  async function POST(req: Request) 

 { 
    try{

      const body = await req.json()
      const {email, username, password } =  userSchema.parse(body)
      console.log("Parsed JSON body:", body);


      //check if email already exist 
      const existingUserByEmail = await db.user.findUnique({
         where: {email: email}
      })
      if(existingUserByEmail) { 
         return NextResponse.json({user: null, message: "User with this email already exisit"}, {status: 409})
      }

      //Check if user name
      
      const existingUserByUserName = await db.user.findUnique({
         where: {username: username}
      })
      if(existingUserByUserName) { 
         return NextResponse.json({user: null, message: "User with this username already exisit"}, {status: 409})
      }

      const hashedPassword = await hash(password, 10)
      const newUser = await db.user.create(
          {
            data: { 
               username,
               email,
               password: hashedPassword

            }
          }
      );

      const {password: newUserPassword, ...rest} = newUser;

      
      
      return NextResponse.json({user: newUser, message: "User created successfully"}, {status: 201})

    }catch(e) { 
      console.error(e)
      return NextResponse.json({message: `Something went wrong ${e}`} ,  {status: 500})
    }
 }