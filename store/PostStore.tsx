/* eslint-disable no-console */
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

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  increase: (post: Post) => void;
  decrease: (id: string) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  fetchPostsFromBackend: () => Promise<void>;
  getStorage: () => {
    getItem: (key: string) => Promise<any>;
    setItem: (value: any) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
}

const usePostStore = create(
  persist(
    (set, get) => ({
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
          const response: AxiosResponse<Post[]> = await axios.get(
            'https://test-locust-api.buidlerdao.xyz/api/post'
          );
          set({ posts: response.data });
        } catch (error) {
          console.error(error);
        }
      }
    }),
    {
      name: 'post-storage', // name of the storage
      getStorage: () => ({
        getItem: async (key: string) => {
          const response = await axios.get(`/api/storage/${key}`);
          return response.data;
        },
        /*
      @param key: string
      @description:保存发送数据
      @use:await usePostStore.getState().getStorage().setItem(newPost);
      */
        setItem: async (value: any) => {
          await axios.post(
            `https://test-locust-api.buidlerdao.xyz/api/post`,
            value
          );
        },
        removeItem: async (key: string) => {
          await axios.delete(
            `https://test-locust-api.buidlerdao.xyz/api/post/${key}`
          );
        }
      }) // use a custom storage engine that communicates with your server
    }
  )
);

export default usePostStore;
