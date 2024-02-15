import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
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
import { createUserAccount } from '../../lib/appwrite/api'

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
  }

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
            {isLoading? (
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
