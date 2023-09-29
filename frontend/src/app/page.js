'use client';

import CustomerComplainForm from "@/components/CustomerComplainForm";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [signInModalOpen, setSignInModalOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="mx-auto my-16 max-w-3xl">
        <CustomerComplainForm />
      </div>
      <Modal open={signInModalOpen} setOpen={setSignInModalOpen} />
    </>
  )
}
