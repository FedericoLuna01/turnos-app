import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const professionals = await prismadb.user.findMany({
    where: {
      role: "PROFESSIONAL",
    }
  })

  return (
    <div className="container flex flex-col h-full">
      <h1 className="text-4xl font-bold mt-4 mb-1">Elije tu profesional</h1>
      <Separator />
      <div className="grid grid-cols-4 gap-5 py-10">
        {
          professionals.map(({ id, name }) => (
            <Card
              key={id}
            >
              <CardHeader className="pb-3">
                <CardTitle>{name}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Descripción corta
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  asChild
                >
                  <Link
                    href={`/sacar-turno/${id}`}
                  >
                    Pedir turno
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
