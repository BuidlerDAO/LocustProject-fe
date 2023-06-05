'use client';

import { useRouter } from 'next/router';
//import { apiGetPost } from '../api';
import { useEffect, useState } from 'react';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    // async function fetchPost() {
    //   const post = await apiGetPost(id);
    //   setPost(post);
    // }
    // fetchPost();
    console.log('id', id);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h1>{post.title}</h1>
      <p>{post.content}</p> */}
    </div>
  );
}
