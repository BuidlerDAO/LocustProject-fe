'use client';

import _toast, { Toaster as DefaultToaster } from 'react-hot-toast';
import Delete from '@/components/icons/delete';

const successIcon = (
  <div className="mr-[6px] inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[4px] bg-green-100 text-green-500">
    <svg
      aria-hidden="true"
      className="h-[16px] w-[16px]"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Check icon</span>
  </div>
);

const errorIcon = (
  <div className="ml-[8px] mt-[-14px] inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[4px] bg-black text-red-500">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.192 4.81803C10.4654 4.54466 10.9086 4.54466 11.182 4.81803C11.4553 5.09139 11.4553 5.53461 11.182 5.80798L8.98995 8.00001L11.182 10.192C11.4553 10.4654 11.4553 10.9086 11.182 11.182C10.9086 11.4554 10.4654 11.4554 10.192 11.182L8 8.98996L5.80797 11.182C5.5346 11.4554 5.09139 11.4554 4.81802 11.182C4.54465 10.9086 4.54465 10.4654 4.81802 10.192L7.01005 8.00001L4.81802 5.80798C4.54465 5.53461 4.54465 5.09139 4.81802 4.81803C5.09139 4.54466 5.5346 4.54466 5.80797 4.81803L8 7.01006L10.192 4.81803Z"
        fill="#FF3162"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.300049 8.00005C0.300049 3.74746 3.74746 0.300049 8.00005 0.300049C12.2526 0.300049 15.7 3.74746 15.7 8.00005C15.7 12.2526 12.2526 15.7 8.00005 15.7C3.74746 15.7 0.300049 12.2526 0.300049 8.00005ZM8.00005 1.70005C4.52065 1.70005 1.70005 4.52065 1.70005 8.00005C1.70005 11.4794 4.52065 14.3 8.00005 14.3C11.4794 14.3 14.3 11.4794 14.3 8.00005C14.3 4.52065 11.4794 1.70005 8.00005 1.70005Z"
        fill="#FF3162"
      />
    </svg>

    <span className="sr-only">Error icon</span>
  </div>
);

const warningIcon = (
  <div className="mr-[6px] inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[4px] bg-orange-100 text-orange-500">
    <svg
      aria-hidden="true"
      className="h-[16px] w-[16px]"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
);

const toast = _toast;

type ToastHandler = typeof toast.success;

type Toast = typeof toast & {
  error: ToastHandler;
  warning: ToastHandler;
  success: ToastHandler;
};
const handleClose = () => {
  toast.dismiss();
};

(toast as Toast).error = (...args: Parameters<ToastHandler>) => {
  const [message, options] = args;
  return toast(
    <>
      {message}
      <button onClick={handleClose} className="mt-[-15px]">
        <Delete />
      </button>
    </>,
    {
      position: 'top-center',
      icon: errorIcon,
      ...options
    }
  );
};

(toast as Toast).success = (...args: Parameters<ToastHandler>) => {
  const [message, options] = args;
  return toast(message, {
    position: 'top-center',
    icon: successIcon,
    ...options
  });
};

(toast as Toast).warning = (...args: Parameters<ToastHandler>) => {
  const [message, options] = args;
  return toast(message, {
    position: 'top-center',
    icon: warningIcon,
    ...options
  });
};

export const Toaster = () => {
  return (
    <DefaultToaster
      position="top-center"
      toastOptions={
        {
          style: {
            fontSize: '14px',
            padding: '5px 10px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow:
              '0px 4px 8px rgba(0, 0, 0, 0.06), 0px 8px 16px 1px rgba(0, 0, 0, 0.12)',
            color: '#fff',
            zIndex: '999',
            backgroundColor: 'black'
          },
          success: {
            icon: successIcon
          },
          error: {
            icon: errorIcon
          },
          warning: warningIcon
          // loading: {
          //   iconTheme: {
          //     primary: theme.palette.text.secondary,
          //     secondary: 'transparent'
          //   }
          // }
        } as any
      }
    />
  );
};

export default toast as Toast;
