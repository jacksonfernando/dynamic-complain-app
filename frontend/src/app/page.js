'use client';

import CustomerComplainForm from "@/components/CustomerComplainForm";
import SignInModal from "@/components/Modal/SignInModal";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <>
      <Navbar setSignInModalOpen={setSignInModalOpen} />
      <div className="mx-auto my-16 max-w-3xl">
        <CustomerComplainForm />
      </div>
      <SignInModal open={signInModalOpen} setOpen={setSignInModalOpen} />
    </>
  )
}
