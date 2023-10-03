'use client';

import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import { useEffect } from "react";


const Page = () => {

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) window.location.replace('/')
  }, [])

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          </table>
        </div>
      </div>
    </>
  )
}

export default Page;
