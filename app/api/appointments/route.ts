import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const body: { name: string, date: Date, professionalId: string } = await req.json()
  const { name, date, professionalId } = body
  const session = await auth()

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  if (!professionalId) {
    return new NextResponse("Professional ID is required", { status: 400 })
  }

  try {
    const appointment = await prismadb.appointment.create({
      data: {
        name,
        date,
        professionalId,
        userId: session?.user?.id!
      }
    })

    revalidatePath("/turnos")
    return NextResponse.json(appointment)
  } catch (error) {
    console.log("[APPOINTMENTS_POST] Error: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE() {
  try {
    const res = await prismadb.appointment.deleteMany()

    return NextResponse.json(res)
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }

}