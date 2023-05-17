import create, { SetState } from 'zustand';

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

const usePostStore = create<PostStore>((set: SetState<PostStore>) => ({
  // 数据
  posts: {
    0: {
      title: '1OSG：从游戏核心乐趣浸谈全链游戏设计',
      link: 'https://foresightnews.pro/article/detail/30448',
      originalText: `Why bring games on-chain?The game asset on-chain represented by game token economy prop NFT is more monetization of the game,while full-
chain game is to achieve the maximum "freedom of play"at the level of game play design,Current use cases for tokens include:1)ownership:tokens give
users digital property rights'and allow for hyper-structured ownership,they also create value that the owner can access and destroy,not necessarly
just monetary value;2)consistency:creator tokens,social tokens and NFIs allow fans to interact directly with their favorite artists and prove their fan
identity,and can be extended to create digital cultural identity.Token holders can also vote on creative decisions in a decentralized collaboration
between creators and the community`,
      personalThoughts: `In the article,the author uses poker as a metaphor for the full chain of games.All the rules to be followed have been designed,but all the gameplay is
waiting to be developed"is a concise summary of the new experience that the full chain of games brings to the game.We can think of the game atoms
of poker as suits,numbers,cards,and through these atoms we see a variety of card games with different levels of popularity and difficulty,and even
"king games"that introduce player behavior.The core logic of the chain is to create an open,transparent and easy-to-use game building environment,
so that users can build their own games more easily.Compared with the traditional UGC game ecology,such as RPG maps in Warcraft,full-chain games
allow creators to get a reasonable and fair distribution,no longer "generating power for love",which is a win-win for the whole ecology.Of course,as of
now,the difficulty of developing full-chain games lies mainly in the performance of the public chain.With the hot topics of various public chain upgrades.
expansion,modularization and other performance topics this year,we can probably look forward to it`,
      time: '2023-05-13'
    }
  },
  count: 0,
  // 修改数据的方法
  increase: (post) =>
    set((state) => ({
      posts: {
        ...state.posts,
        [state.count]: {
          ...post,
          id: state.count
        }
      },
      count: state.count + 1
    })),
  decrease: (title: string) =>
    set((state) => ({
      posts: Object.values(state.posts).filter((post) => post.title !== title),
      count: state.count - 1
    }))
}));

type LoginStore = {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
};

const useLoginStore = create<LoginStore>((set: SetState<LoginStore>) => ({
  isLoggedIn: false,
  username: '',
  login: (username) =>
    set(() => ({
      isLoggedIn: false,
      username: username
    }))
}));
export { usePostStore , useLoginStore};
