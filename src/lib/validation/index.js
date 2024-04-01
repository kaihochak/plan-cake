import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: 'Too Short' }),
    username: z.string().min(2, { message: 'Too Short' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Too Short' }),
})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Too Short' }),
})

export const CommentValidation = z.object({
    comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
    accountId: z.string(),
});

export const ReplyValidation = z.object({
    comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
