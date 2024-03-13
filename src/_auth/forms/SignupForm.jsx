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
import { SignupValidation } from "@/lib/validation"
import Logo from '/assets/icons/logo.png'
import Loader from '@/components/utility/Loader'
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'

const SignupForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  // use tanstack/react-query's useMutation hook to create a new user account
  const { 
    mutateAsync: createUserAccount, 
    isPending: isCreatingUser
  } = useCreateUserAccount()

  // use tanstack/react-query's useMutation hook to sign in the user
  const {
    mutateAsync: signInAccount,
    isPending: isSigningInUser
  } = useSignInAccount()

  // use react-hook-form's useForm hook to create a form
  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // function to handle form submission
  async function onSubmit(values) {

    // create a new user account with the values from the form
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Account not created. ", 
        description: "Please try again!"
      });
    }

    // if the user account was created, sign in the user
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      console.log("Sign in failed. Please try again.")
      return toast({
        title: "Sign in failed. ", 
        description: "Please try again!"
      });
    }

    // if the user is authenticated, redirect to the home page
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      console.log("XXX Sign in failed. Please try again.")
      return toast({
        title: "Sign in failed. ", 
        description: "Please try again!"
      });
    }
  }

  // return the form
  return (
    <Form {...form}>
      <div className='w-full flex flex-col justify-center items-center gap-y-8 pt-10'>
        <img src={Logo} alt="Home" className="w-20 "/>
        <h1 className="text-2xl text-center">Create a account</h1>

        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col justify-center items-center space-y-4 w-full gap-y-6"
        >
          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full lg:w-[60%]">
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full lg:w-[60%]">
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full lg:w-[60%]">
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
              <FormItem className="w-full lg:w-[60%]">
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submit */}
          <Button type="submit" variant="outline" className="w-full lg:w-[60%] bg-accent">
            {isCreatingUser ? (
              <div className='flex items-center gap-2'>
                <Loader/>Loading...
              </div>
            ) : (
              <div className='text-accent-foreground'>Sign up</div>
            )}
          </Button>

          <div className="flex flex-col justify-center items-center space-y-4 w-full">
            <p className="text-md">
              Already have an account? 
              <Link to="/sign-in" className="text-accent"> Log in</Link>
            </p>
          </div>

        </form>
      </div>

    </Form>
  )
}

export default SignupForm
