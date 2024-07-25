import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body: { name: string, date: Date, professionalId: string, userId: string } = await req.json()
  const { name, date, professionalId, userId } = body

  try {
    const appointment = await prismadb.appointment.create({
      data: {
        name,
        date,
        professionalId,
        userId
      }
    })

    revalidatePath('/turnos')
    revalidatePath('/calendario')
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