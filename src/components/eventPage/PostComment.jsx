"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
// import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
// import { usePathname, useRouter } from "next/navigation";
import { Link } from "react-router-dom"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { CommentValidation } from "@/lib/validation";
// import { createThread } from "@/lib/actions/thread.actions";

function PostComment({ 
  id, 
  currentUserId, 
  parentId, 
  content, 
  author, 
  community, 
  createdAt, 
  comments 
}) {
  // const router = useRouter();
  // const pathname = usePathname();

  // const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",
      accountId: currentUserId,
    },
  });

  const onSubmit = async (values) => {
    // await createThread({
    //   text: values.thread,
    //   author: currentUserId,
    //   communityId: organization ? organization.id : null,
    //   path: pathname,
    // });

   // router.push("/");
  };

  console.log(author);

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 mb-5'>
              <FormLabel className=''>
                <p className='text-m-m text-border md:text-[20px]'>Comments</p>
              </FormLabel>
              <div className="flex gap-3 flex-row items-center md:gap-8">
                <Link href={`/profile/${author?.id}`} className='relative h-11 w-11 md:h-14 md:w-14 '>
                <img
                  src={author?.image}
                  alt='user_community_image'
                  className='cursor-pointer rounded-full w-full h-full object-cover'
                  />
                </Link>
                <FormControl className='no-focus'>
                  <input className=' bg-transparent border-[1.5px] rounded-sm p-1 pl-2 text-m-m text-border md:w-[100%]' placeholder="Add a comment" {...field} />
                </FormControl>

                <img
                  src='/assets/icons/share.svg'
                  alt='heart'
                  className='w-6 h-6 md:w-8 md:h-8 cursor-pointer object-contain'
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  );
}

export default PostComment;
