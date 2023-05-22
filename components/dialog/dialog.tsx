'use client';

import { ComponentProps, FC, forwardRef } from 'react';

// @floating-ui
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useMergeRefs,
  useRole
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { tv } from 'tailwind-variants';
import merge from 'deepmerge';
import type {
  Animation,
  Children,
  ClassName,
  DismissType,
  NewAnimatePresenceProps
} from '@/types/components/theme';

export interface DialogProps extends ComponentProps<'div'> {
  open: boolean;
  handler?: (e: any) => void;
  dismiss?: DismissType;
  animate?: Animation;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  className?: ClassName;
  backdropClass?: ClassName;
  children: Children;
}

const backdropCSS = tv({
  base: 'fixed left-0 top-0 grid h-screen w-screen place-items-center  bg-transparent bg-opacity-60 backdrop-blur-sm'
});

const dialogTV = tv({
  base: 'dialog rounded-2xl border-2 border-zinc-800 bg-black shadow-[0px_4px_8px_0_rgba(0,0,0,0.06),_0px_8px_16px_1px_rgba(0,0,0,0.12)]',
  variants: {
    type: {
      modal: '',
      dialog: ''
    },
    size: {
      sm: 'w-[85%] md:w-[400px]',
      md: 'w-[90%] md:w-[592px]',
      lg: 'w-[95%] md:w-[680px]',
      fullscreen: 'h-screen w-screen'
    }
  },
  compoundVariants: [
    {
      size: ['sm', 'md', 'lg'],
      class: 'p-3'
    }
  ],
  defaultVariants: {
    type: 'dialog',
    size: 'md'
  }
});

const animation = {
  unmount: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3
    }
  },
  mount: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};
const backdropAnimation = {
  unmount: {
    opacity: 0,
    transition: {
      delay: 0.2
    }
  },
  mount: {
    opacity: 1
  }
};

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      handler,
      dismiss,
      animate,
      size,
      className = '',
      backdropClass,
      children,
      ...rest
    },
    ref
  ) => {
    // set animation
    const appliedAnimation = merge(animation, animate ?? {});

    // 4. set @floating-ui
    const { context } = useFloating({
      open,
      onOpenChange: handler ?? undefined
    });

    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { getFloatingProps } = useInteractions([
      useClick(context),
      useRole(context),
      useDismiss(context, dismiss)
    ]);

    // const mergedRef = useMergeRefs([ref, floating]);

    // 5. Create an instance of AnimatePresence because of the types issue with the children
    const NewAnimatePresence: FC<NewAnimatePresenceProps> = AnimatePresence;

    return (
      <FloatingPortal>
        <NewAnimatePresence>
          {open && (
            <FloatingOverlay
              style={{
                zIndex: 998,
                background: 'rgba(0, 0, 0, 0.06)'
              }}
              lockScroll
            >
              <FloatingFocusManager context={context}>
                <motion.div
                  className={backdropCSS({
                    class: backdropClass
                  })}
                  initial="unmount"
                  exit="unmount"
                  animate={open ? 'mount' : 'unmount'}
                  variants={backdropAnimation}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    {...getFloatingProps({
                      ...rest,
                      // ref: mergedRef,
                      className: `
                        ${dialogTV({
                          type: 'dialog',
                          size,
                          class: className
                        })}`,
                      'aria-labelledby': labelId,
                      'aria-describedby': descriptionId
                    })}
                    initial="unmount"
                    exit="unmount"
                    animate={open ? 'mount' : 'unmount'}
                    variants={appliedAnimation}
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </NewAnimatePresence>
      </FloatingPortal>
    );
  }
);

Dialog.displayName = 'Dialog';

export default Dialog;
