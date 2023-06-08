import { create, SetState } from 'zustand';
import usePostStore from './PostStore';
import { persist } from 'zustand/middleware';
// type PostStore = {
//   posts: {
//     [id: number]: {
//       title: string;
//       link: string;
//       originalText: string;
//       personalThoughts: string;
//       time: string;
//     };
//   };
//   count: number;
//   increase: (post: {
//     title: string;
//     link: string;
//     originalText: string;
//     personalThoughts: string;
//     time: string;
//   }) => void;
//   decrease: (title: string) => void;
// };

// const usePostStore1 = create<PostStore>((set: SetState<PostStore>) => ({
//   // 数据
//   posts: {
//     0: {
//       title: '1OSG：从游戏核心乐趣浸谈全链游戏设计',
//       link: 'https://foresightnews.pro/article/detail/30448',
//       originalText: `Why bring games on-chain?The game asset on-chain represented by game token economy prop NFT is more monetization of the game,while full-
// chain game is to achieve the maximum "freedom of play"at the level of game play design,Current use cases for tokens include:1)ownership:tokens give
// users digital property rights'and allow for hyper-structured ownership,they also create value that the owner can access and destroy,not necessarly
// just monetary value;2)consistency:creator tokens,social tokens and NFIs allow fans to interact directly with their favorite artists and prove their fan
// identity,and can be extended to create digital cultural identity.Token holders can also vote on creative decisions in a decentralized collaboration
// between creators and the community`,
//       personalThoughts: `In the article,the author uses poker as a metaphor for the full chain of games.All the rules to be followed have been designed,but all the gameplay is
// waiting to be developed"is a concise summary of the new experience that the full chain of games brings to the game.We can think of the game atoms
// of poker as suits,numbers,cards,and through these atoms we see a variety of card games with different levels of popularity and difficulty,and even
// "king games"that introduce player behavior.The core logic of the chain is to create an open,transparent and easy-to-use game building environment,
// so that users can build their own games more easily.Compared with the traditional UGC game ecology,such as RPG maps in Warcraft,full-chain games
// allow creators to get a reasonable and fair distribution,no longer "generating power for love",which is a win-win for the whole ecology.Of course,as of
// now,the difficulty of developing full-chain games lies mainly in the performance of the public chain.With the hot topics of various public chain upgrades.
// expansion,modularization and other performance topics this year,we can probably look forward to it`,
//       time: '2023-05-13'
//     }
//   },
//   count: 0,
//   // 修改数据的方法
//   increase: (post) =>
//     set((state) => ({
//       posts: {
//         ...state.posts,
//         [state.count]: {
//           ...post,
//           id: state.count
//         }
//       },
//       count: state.count + 1
//     })),
//   decrease: (title: string) =>
//     set((state) => ({
//       posts: Object.values(state.posts).filter((post) => post.title !== title),
//       count: state.count - 1
//     }))
// }));

// export type Post = {
//   id: number;
//   title: string;
//   link: string;
//   originalText: string;
//   personalThoughts: string;
//   time: string;
//   avatar: string;
//   username: string;
// };
// export type PostData = {
//   items: [
//     {
//       id: number;
//       title: string;
//       body: string;
//       link: string;
//       thought: string;
//       userAddress: string;
//       avatar: string;
//       username: string;
//       status: number;
//       createdAt: string;
//       deletedAt: string;
//       updatedAt: string;
//     }
//   ];
//   total: number;
// };

type Post = {
  id: number;
  title: string;
  link: string;
  originalText: string;
  personalThoughts: string;
  time: string;
  username: string;
  avatar: string;
};

type SiderStore = {
  isExplore: boolean;
  isDataView: boolean;
  isPost: boolean;
  setIsExplore: (isExplore: boolean) => void;
  setIsDataView: (isDataView: boolean) => void;
  setIsPost: (isPost: boolean) => void;
};

const useSiderStore = create<SiderStore>((set: SetState<SiderStore>) => ({
  isExplore: false,
  isDataView: false,
  isPost: false,
  setIsExplore: (isExplore: any) =>
    set(() => ({
      isExplore: isExplore
    })),
  setIsDataView: (isDataView: any) =>
    set(() => ({
      isDataView: isDataView
    })),
  setIsPost: (isPost: any) =>
    set(() => ({
      isPost: isPost
    }))
}));

//存储登录用户状态和信息
// type UserStore = {
//   isAdmin: boolean;
//   isLogin: boolean;
//   isSignUp: boolean;
//   isConnectTwitter: boolean;
//   username: string;
//   avatar: string;
//   twitter: string;
//   setIsAdmin: (isAdmin: boolean) => void;
//   setIsLogin: (isLogin: boolean) => void;
//   setIsSignUp: (isRegister: boolean) => void;
//   setIsConnectTwitter: (isConnectTwitter: boolean) => void;
//   setUsername: (username: string) => void;
//   setAvatar: (avatar: string) => void;
//   setTwitter: (twitter: string) => void;
// };

const useUserStore = create<any>(
  persist(
    (set) => ({
      isAdmin: false,
      isLogin: false,
      isSignUp: true,
      isConnectTwitter: false,
      username: '',
      twitter: '',
      avatar: '',
      setIsAdmin: (isAdmin: boolean) =>
        set(() => ({
          isAdmin: isAdmin
        })),
      setIsLogin: (isLogin: boolean) =>
        set(() => ({
          isLogin: isLogin
        })),
      setIsSignUp: (isSignUp: boolean) =>
        set(() => ({
          isSignUp: isSignUp
        })),
      setIsConnectTwitter: (isConnectTwitter: boolean) =>
        set(() => ({
          isConnectTwitter: isConnectTwitter
        })),
      setUsername: (username: string) =>
        set(() => ({
          username: username
        })),
      setAvatar: (avatar: string) =>
        set(() => ({
          avatar: avatar
        })),
      setTwitter: (twitter: string) =>
        set(() => ({
          twitter: twitter
        }))
    }),
    {
      name: 'user-store' // name of the key in localStorage
    }
  )
);

type SearchStore = {
  searchValue: Post;
  setSearchValue: (searchValue: Post) => void;
};

const useSearchStore = create<SearchStore>((set: SetState<SearchStore>) => ({
  searchValue: {
    id: 0,
    title: '',
    link: '',
    originalText: '',
    personalThoughts: '',
    time: '',
    username: '',
    avatar: ''
  },
  setSearchValue: (searchValue: Post) =>
    set(() => ({
      searchValue: searchValue
    }))
}));

export { usePostStore, useSiderStore, useUserStore, useSearchStore };
