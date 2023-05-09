import {
  MdDarkMode,
  MdOutlineClose,
  MdOutlineComment,
  MdOutlineLightMode
} from 'react-icons/md';
import { FaDev } from 'react-icons/fa';
import { CgCommunity } from 'react-icons/cg';
import { RxArrowRight } from 'react-icons/rx';
import { AiOutlineScan } from 'react-icons/ai';
import LogoIcon from './logoIcon';
import AmountIcon from './amount';
import HookIcon from './hook';
import TwitterIcon from './twitter';
import MetamaskIcon from './metamask';
import CoinbaseIcon from './coinbase';
import AddIcon from './add';
import WalletConnectIcon from './walletConnect';
import LockFilledIcon from './lockFilled';
import LockStrokedIcon from './lockStroked';
import DatabaseIcon from './database';
import RankIcon from './rank';
import VerifiedIcon from './verified';
import WebIcon from './web';
import DiscordIcon from './discord';
import TelegramIcon from './telegram';
import CheckIcon from './check';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
/**
 * 自定义统一参数
color	undefined (inherit)
size	1em
className	undefined
style	undefined	Can overwrite size and color
attr	undefined	Overwritten by other attributes
title	undefined	Icon description for accessibility
 */
const DarkMode = MdDarkMode;
const LightMode = MdOutlineLightMode;
const OutlineComment = MdOutlineComment;
const DevIcon = FaDev;
const CommunityIcon = CgCommunity;
const Close = MdOutlineClose;
const ArrowRight = RxArrowRight;
const OutlineScan = AiOutlineScan;

export {
  ArrowRight,
  DarkMode,
  LightMode,
  OutlineComment,
  DevIcon,
  CommunityIcon,
  LogoIcon,
  AmountIcon,
  HookIcon,
  TwitterIcon,
  Close,
  MetamaskIcon,
  CoinbaseIcon,
  WalletConnectIcon,
  OutlineScan,
  AddIcon,
  LockFilledIcon,
  LockStrokedIcon,
  DatabaseIcon,
  RankIcon,
  VerifiedIcon,
  WebIcon,
  DiscordIcon,
  TelegramIcon,
  CheckIcon
};
