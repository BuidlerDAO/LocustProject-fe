import create, { SetState } from 'zustand';

type PostStore = {
  posts: {
    [id: number]: {
      title: string;
      link: string;
      originalText: string;
      personalThoughts: string;
    };
  };
  count: number;
  increase: (post: {
    title: string;
    link: string;
    originalText: string;
    personalThoughts: string;
  }) => void;
  decrease: () => void;
};

const usePostStore = create<PostStore>((set: SetState<PostStore>) => ({
  // 数据
  posts: {},
  count: 0,
  // 修改数据的方法
  increase: (post) =>
    set((state) => ({
      posts: {
        ...state.posts,
        [state.count]: {
          ...post,
          id: state.count,
        },
      },
      count: state.count + 1,
    })),
  decrease: () => set((state) => ({ count: state.count - 1 }))
}));

export default usePostStore;
