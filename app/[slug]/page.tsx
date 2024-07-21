import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

async function AppointmentPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container my-5">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Image
            src="/portada.png"
            alt="Portada"
            width={2400}
            height={500}
            className="rounded-t-lg"
            // style={{
            //   maskImage: "linear-gradient(#09090b 80%, transparent)",
            // }}
          />
          <Avatar className="w-32 h-32 absolute top-1/2 translate-y-4 border-4 translate-x-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl font-semibold">{params.slug}</h1>
        </div>
      </div>
    </div>
  );
}

export default AppointmentPage;
