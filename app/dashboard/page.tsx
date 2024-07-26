import { auth } from "@/auth"
import prismadb from "@/lib/db"

export default async function DashboardPage() {
  const session = await auth()
  const appointments = await prismadb.appointment.findMany({
    where: {
      professionalId: session?.user?.id
    }
  })

  console.log(appointments)

  return (
    <div>DashboardPage</div>
  )
}