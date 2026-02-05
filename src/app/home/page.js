"use client";

import AdminPage from '@/component/herosection'
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  // Check user if Logged In or Not
  useEffect(() => {
    const isAuth = document.cookie.includes("auth=true");
    if (!isAuth) {
      router.replace("/");
    }
  }, []);

  return (
    <div>
      <AdminPage />
    </div>
  )
}

export default Page
