'use client';

//import { useRouter } from 'next/router';
//import { apiGetPost } from '../api';
import { useEffect, useState } from 'react';
import { useSearchStore } from '@/store';

export default function Post() {
  const { searchValue } = useSearchStore();

  if (!searchValue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{searchValue.title}</h1>
    </div>
  );
}
