"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Input } from "./input"
import { Button } from "./button"
import { FIELD_NAMES, FIELD_TYPES } from "@/constants"
import ImageUpload from "./ImageUpload"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



interface Props<T extends FieldValues> {
  schema: ZodType;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string}>;
  type: "SIGN_IN" | "SIGN_UP";
}

export default function AuthForm <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.success(isSignIn ? "You have successfully Signed in." : "You have succesfully Signed up.");
      router.push("/");
    } else {
      toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome Back to BookWise" : "Create Your Library Account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library "}
      </p>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? ( 
                      <ImageUpload onFileChange={field.onChange}/>
                    ) : ( 
                      <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className="form-input"/>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
  
          <Button type="submit" className="form-btn">{isSignIn ? "Sign In" : "Sign Up"}</Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise? " : "Already Have an Account? "}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-primary">
          {isSignIn ? "Create an Account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
  
    
    
  
}