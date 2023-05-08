import Navbar from "@/components/navbar"
import ReactNode from 'react';

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main>{children}</main>
  )
}