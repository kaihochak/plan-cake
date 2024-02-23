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
import Logo from '@/assets/icons/logo.png'
import Loader from '@/components/utility/Loader'
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations'
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
    isPending: isSigningIn
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
    // if the user account was not created, show an error message
    if (!newUser) {
      return toast({ title: "Error", message: "Sign up failed. Please try again.", type: "error" });
    }

    // if the user account was created, sign in the user
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    // if the user was not signed in, show an error message
    if (!session) {
      return toast({ title: "Error", message: "Sign in failed. Please try again.", type: "error" });
    }

    // check if the user is authenticated
    const isLoggedIn = await checkAuthUser();
    // if the user is authenticated, redirect to the home page
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    }
    // if the user is not authenticated, show an error message
    return toast({ title: "Error", message: "Sign in failed. Please try again.", type: "error" });
  }

  // return the form
  return (
    <Form {...form}>
      <div className='w-full flex flex-col justify-center items-center gap-y-4 pt-10'>
        <img src={Logo} alt="Home" className="w-20 "/>
        <h1 className="text-2xl font-bold text-center">Create a account</h1>

        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col justify-center items-center space-y-4 w-full"
        >
          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-[80%]">
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  Username CANNOT be changed later
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
              <FormItem className="w-[80%]">
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
            {isCreatingUser ? (
              <div className='flex items-center gap-2'>
                <Loader/>Loading...
              </div>
            ) : (
              <div>Sign up</div>
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
