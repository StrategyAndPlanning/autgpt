"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const LogIn = () => {
  return (
    <Card className="flex gap-2 flex-col min-w-[300px]">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl flex gap-2">
          <Image src="/aut-logo.svg" alt="Logo" width={50} height={25} />
          <span>
            AUT<span className="text-muted-foreground">GPT</span>
          </span>
        </CardTitle>
        <CardDescription >
          Login in with your AUT credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={() => signIn("azure-ad")}> Login</Button>
      </CardContent>
    </Card>
  );
};
