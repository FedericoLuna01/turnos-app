"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
import { LoginSchema } from "@/schemas";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { login } from "@/actions/auth/login";
import SocialButton from "../ui/social-button";
import { Separator } from "../ui/separator";

export function LoginForm() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "La cuenta de correo ya está registrada, por favor inicia sesión con tu correo y contraseña."
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setSuccess("");
    setError("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button
                size="sm"
                variant="link"
                asChild
                className="font-normal px-0"
              >
                <Link href="/recuperar-contrasena">Olvido la contraseña?</Link>
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          Submit
        </Button>
      </form>
      <Separator className="my-4" />
      <SocialButton />
      <div className="mt-4 text-center text-sm">
        No tienes una cuenta?{" "}
        <Link href="/register" className="underline">
          Registrarme
        </Link>
      </div>
    </Form>
  );
}
