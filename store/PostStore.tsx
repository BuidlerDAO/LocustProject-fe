import create from 'zustand';
import { apiPostData } from '@/apis/post';

type PostStore = {
  posts: {
    [id: number]: {
      title: string;
      link: string;
      originalText: string;
      personalThoughts: string;
      time: string;
    };
  };
  count: number;
  increase: (post: {
    title: string;
    link: string;
    originalText: string;
    personalThoughts: string;
    time: string;
  }) => void;
  decrease: (title: string) => void;
};

const usePostStore = create<PostStore>((set, get) => ({
  // 从localStorage中获取数据
  //posts: JSON.parse(localStorage.getItem('posts') || '{}'),
  //count: parseInt(localStorage.getItem('count') || '0'),
  posts: {},
  count: 0,
  // 设置数据的方法
  increase: (post) => {
    const newCount = get().count + 1;
    // 更新posts和count
    set({
      posts: {
        ...get().posts,
        [newCount]: {
          ...post
        }
      },
      count: newCount
    });
    // 保存数据到localStorage并传输到后端
    //localStorage.setItem('posts', JSON.stringify(get().posts));
    //localStorage.setItem('count', newCount.toString());
    apiPostData(get().posts);
  },
  decrease: (title: string) => {
    // 过滤掉标题为title的文章
    const newPosts = Object.values(get().posts).filter(
      (post) => post.title !== title
    );
    // 更新posts和count
    set({ posts: newPosts, count: newPosts.length });
    // 保存数据到localStorage并传输到后端
    //localStorage.setItem('posts', JSON.stringify(newPosts));
    //localStorage.setItem('count', newPosts.length.toString());
    apiPostData(newPosts);
  }
}));

export default usePostStore;
