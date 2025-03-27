"use client"

import { signUpSchema } from "@/lib/validations"
import AuthForm from "@/components/ui/AuthForm"
import { signUp } from "@/lib/actions/auth"


export default function Page() {
  return (
    <div>
      <AuthForm 
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues= {{
         email:"",
         password:"",
         fullName:"",
         universityId:"",
         universityCard:"",
        }}
        onSubmit={signUp}
      />
    </div>
  )
}