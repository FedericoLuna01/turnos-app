"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import Link from "next/link";
import { register } from "@/actions/auth/register";
import { Separator } from "../ui/separator";
import SocialButton from "../ui/social-button";

export function RegisterForm() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setSuccess("");
    setError("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  placeholder="correo@correo.com"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="*****"
                    {...field}
                    disabled={isPending}
                  />
                  {passwordVisibility ? (
                    <EyeOff
                      className="absolute cursor-pointer right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform"
                      onClick={() => {
                        setPasswordVisibility(!passwordVisibility);
                      }}
                    />
                  ) : (
                    <Eye
                      className="absolute cursor-pointer right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform"
                      onClick={() => {
                        setPasswordVisibility(!passwordVisibility);
                      }}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          Submit
        </Button>
      </form>
      <Separator className="my-4" />
      <SocialButton />
      <div className="mt-4 text-center text-sm">
        Ya tenes una cuenta?{" "}
        <Link href="/login" className="underline">
          Ingresar
        </Link>
      </div>
    </Form>
  );
}
