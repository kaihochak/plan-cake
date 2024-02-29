import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import Logo from '@/assets/icons/logo.png'
import Loader from '@/components/utility/Loader'
import { useSignInAccount } from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'

const SigninForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  // use tanstack/react-query's useMutation hook to sign in the user
  const {
    mutateAsync: signInAccount,
    isPending: isSigningInUser
  } = useSignInAccount()

  // use react-hook-form's useForm hook to create a form
  const form = useForm({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // function to handle form submission
  async function onSubmit(values) {

    // if the user account was created, sign in the user
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      console.log("Sign in failed. Please try again.")
      return toast({
        variant: "destructive",
        title: "Sign in failed. ", 
        description: "Please try again!"
      });
    }

    // if the user is authenticated, redirect to the home page
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
      return toast({
        variant: "success",
        title: "Sign in successful. ",
      });
    } else {
      return toast({
        variant: "destructive",
        title: "Sign in failed. ", 
        description: "Please try again!"
      });
    }
}

  // return the form
  return (
    <Form {...form}>
      <div className='w-full flex flex-col justify-center items-center gap-y-4 pt-10'>
        <img src={Logo} alt="Home" className="w-20 "/>
        <h1 className="text-2xl text-center">Log in to your account</h1>

        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col justify-center items-center space-y-4 w-full"
        >
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[80%]">
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-[80%]">
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submit */}
          <Button type="submit" variant="outline" className="w-[80%]">
            {isSigningInUser ? (
              <div className='flex items-center gap-2'>
                <Loader/>Loading...
              </div> 
            ) : (
              <div>Sign in</div>
            )}
          </Button>

          <div className="flex flex-col justify-center items-center space-y-4 w-full">
            <p className="text-md">
              Don't have an account? 
              <Link to="/sign-up" className="text-accent"> Sign up</Link>
            </p>
          </div>

        </form>
      </div>

    </Form>
  )
}

export default SigninForm;
