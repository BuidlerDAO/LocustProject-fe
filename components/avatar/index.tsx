import { FC, HTMLAttributes, memo } from 'react';
import Image from 'next/image';
import { AvatarIcon } from '@/components/icons/campaignAvatar';

interface Props extends HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
}

const Avatar: FC<Props> = memo(
  ({ width, height, src, alt, className, ...rest }: Props) => {
    return (
      <div
        className={`flex items-center justify-center rounded-full border-4 border-[#191A27] bg-[#FFFFFF0D] outline outline-2 outline-[#FFFFFF33] ${
          width ? width : 'w-24'
        } ${height ? height : 'h-24'} ${className}`}
        {...rest}
      >
        <Image
          width={64}
          height={64}
          alt={alt as string}
          src={src}
          className="h-[100%] w-[100%] rounded-[50%]"
        />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
