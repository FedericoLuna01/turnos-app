import { NextResponse } from "next/server";

import prismadb from "@/lib/db";

export async function GET(req: Request, { params }: { params: { appointmentId: number }}) {
  const { appointmentId } = params

  try {
    const appointment = await prismadb.appointment.findUnique({
      where: {
        id: Number(appointmentId),
      },
    })

    if (!appointment) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}