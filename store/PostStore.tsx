import create from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { persist } from 'zustand/middleware';
import { apiPostData } from '@/apis/post';

export type Post = {
  id: string;
  title: string;
  link: string;
  originalText: string;
  personalThoughts: string;
  time: string;
};

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  increase: (post: Post) => void;
  decrease: (id: string) => void;
  updatePost: (id: string, post: Post) => void;
  fetchPostsFromBackend: () => Promise<void>;
};

const usePostStore = create<PostStore>((set, get) => ({
  // 从localStorage中获取数据
  //posts: JSON.parse(localStorage.getItem('posts') || '{}'),
  //count: parseInt(localStorage.getItem('count') || '0'),
  posts: [],
  setPosts: (posts) => set({ posts }),
  // 设置数据的方法
  increase: (post) => {
    set(({ posts }) => ({ posts: [...posts, post] }));
    //向后端发送数据
    //apiPostData(post);
  },
  decrease: (id) =>
    set(({ posts }) => ({ posts: posts.filter((p) => p.id !== id) })),
  updatePost: (id, post) =>
    set(({ posts }) => ({
      posts: posts.map((p) => (p.id === id ? { ...p, ...post } : p))
    })),
  fetchPostsFromBackend: async () => {
    try {
      const response: AxiosResponse<Post[]> = await axios.get('/api/posts');
      set({ posts: response.data });
    } catch (error) {
      console.error(error);
    }
  }
}));

export default usePostStore;
