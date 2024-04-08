async function AppointmentPage({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  return <div>{params.slug}</div>;
}

export default AppointmentPage;
