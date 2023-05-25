/* eslint-disable no-console */
import create from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { persist } from 'zustand/middleware';
import { apiGetPostList, apiPostData } from '@/apis/post';

export type Post = {
  id: string;
  title: string;
  link: string;
  originalText: string;
  personalThoughts: string;
  time: string;
};

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  increase: (post: Post) => void;
  decrease: (id: string) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  fetchPostsFromBackend: () => Promise<void>;
  // getStorage: () => {
  //   getItem: (key: string) => Promise<any>;
  //   setItem: (value: any) => Promise<void>;
  //   removeItem: (key: string) => Promise<void>;
  // };
}

const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
  increase: (post: Post) => {
    set(({ posts }: any) => ({ posts: [...posts, post] }));
    //向后端发送数据
    //apiPostData(post);
  },
  decrease: (id: string) =>
    set(({ posts }: any) => ({
      posts: posts.filter((p: { id: string }) => p.id !== id)
    })),
  updatePost: (id: string, post: Partial<Post>) =>
    set(({ posts }: any) => ({
      posts: posts.map((p: { id: string }) =>
        p.id === id ? { ...p, ...post } : p
      )
    })),
  fetchPostsFromBackend: async () => {
    try {
      const response: AxiosResponse<Post[]> = await apiGetPostList({});
      set({ posts: response.data });
    } catch (error) {
      console.error(error);
    }
  }
}));

export const {
  getState: getStore,
  setState: updateStore,
  subscribe: subscribeStore,
  destroy: destroyStore
} = usePostStore;

export default usePostStore;
