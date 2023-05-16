'use client'
import React from "react"
import UserDataCard from "@/components/userDataCard/userDataCard"
import { TableUserOverview, UserArticle } from "@/components/table/table"

const participate=()=> {
  return (
    <>
      <UserDataCard />
      Statistics
      <TableUserOverview />
      <UserArticle />
    </>
  );
}

export default participate