import { MdOutlineClose } from 'react-icons/md';
import LogoIconTop from './logoIconTop';
import WalletConnectIcon from './walletConnect';
import TwitterIcon from './twitter';
import MetamaskIcon from './metamask';
import CoinbaseIcon from './coinbase';
import { TimeIcon } from './time';
import LinkIcon from './link';
import DollarIcon from './dollarIcon';
import ArrowRight from '@/components/icons/arrowRight';

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
const Close = MdOutlineClose;

export {
  ArrowRight,
  LogoIconTop,
  TwitterIcon,
  Close,
  MetamaskIcon,
  CoinbaseIcon,
  WalletConnectIcon,
  TimeIcon,
  LinkIcon,
  DollarIcon
};
