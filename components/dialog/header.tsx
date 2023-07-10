import { Children, ClassName } from '@/types/components/theme';
import { ComponentProps, forwardRef } from 'react';
import { motion } from 'framer-motion';

import { Close } from '../icons';
import { Typography } from '../typography';

export interface DialogHeaderProps extends ComponentProps<'div'> {
  className?: ClassName;
  children?: Children;
  title?: string;
  subTitle?: string;
  showClose?: boolean;
  onClose?: (e: boolean) => void;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  (
    {
      className,
      children,
      title,
      subTitle,
      showClose,
      onClose = () => null,
      ...rest
    },
    ref
  ) => {
    return (
      <div {...rest} ref={ref} className={`${className}`}>
        {showClose ? (
          <div className="mb-2 flex w-auto justify-end">
            <motion.div whileHover={{ rotate: 360 }} whileTap={{ scale: 0.9 }}>
              <Close
                color="rgba(255,255,255,0.6)"
                fontSize={20}
                className="cursor-pointer"
                onClick={(e: any) => {
                  onClose(false);
                }}
              />
            </motion.div>
          </div>
        ) : (
          ''
        )}
        {children ? (
          children
        ) : (
          <div className="flex flex-col items-center">
            <Typography variant="h4">{title}</Typography>
            {subTitle ? (
              <Typography className="mt-1 text-[#27272A] dark:text-[#A1A1A9]">
                {subTitle}
              </Typography>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
