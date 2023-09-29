import CustomerComplainForm from "@/components/CustomerComplainForm";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mx-auto my-16 max-w-3xl">
        <CustomerComplainForm />
      </div>
      <Modal open={true} />
    </>
  )
}
