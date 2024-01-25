import prismadb from "@/lib/db"

const AppointmentPage = async ({ params }: { params: { appointmentId: string }}) => {
  const appointment = await prismadb.appointment.findUnique({
    where: {
      id: Number(params.appointmentId)
    }
  })

  if(!appointment) return null

  return (
    <div
      className="container"
    >
      <code
        className="max-w-sm"
      >
        {
          JSON.stringify(appointment)
        }
      </code>
    </div>
  )
}

export default AppointmentPage