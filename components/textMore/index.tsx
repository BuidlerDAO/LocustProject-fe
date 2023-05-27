// import React, { useState } from 'react';
// import { Typography } from 'antd';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';

// interface TextProps {
//   text: string;
//   rows?: number;
// }
// const { Paragraph } = Typography;
// const TextMore: React.FC<TextProps> = ({ text, rows }) => {
//   const [visible, setVisible] = useState(false);
//   return (
//     <div style={{ position: 'relative' }}>
//       <Paragraph
//         style={{
//           color: '#747474',
//           fontSize: '14px',
//           fontStyle: 'italic',
//           textAlign: 'left',
//           fontFamily: 'Inter',
//           fontWeight: 400,
//           lineHeight: '30px',
//           fontStretch: 'normal',
//           textDecoration: 'none'
//         }}
//         ellipsis={
//           visible
//             ? false
//             : {
//                 rows: rows,
//                 expandable: true,
//                 symbol: (
//                   <a style={{ visibility: 'hidden' }}>
//                     <DownOutlined />
//                     More
//                   </a>
//                 )
//               }
//         }
//       >
//         {text}
//         {visible && (
//           <a
//             onClick={() => setVisible(false)}
//             style={{
//               color: 'inherit',
//               textDecoration: 'underline',
//               marginLeft: '10px'
//             }}
//           >
//             Collapse
//             <UpOutlined />
//           </a>
//         )}
//       </Paragraph>
//       {!visible && (
//         <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
//           <a
//             onClick={() => setVisible(true)}
//             style={{ textDecoration: 'underline', color: '#747474' }}
//           >
//             <DownOutlined />
//             More
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextMore;

import { FC, useState } from 'react';

interface Props {
  text: string;
  maxLines: number;
}

export const TextMore: FC<Props> = ({ text, maxLines }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const isTextOverflowed = () => {
    const lineHeight = parseInt(
      getComputedStyle(document.documentElement).lineHeight,
      10
    );
    const maxHeight = maxLines * lineHeight;
    return text.length * 0.6 > maxHeight; // Adjust the threshold as needed
  };

  const getContentHeight = () => {
    const content = document.getElementById('text-content');
    return content?.scrollHeight;
  };

  const calculateMaxHeight = () => {
    if (isExpanded) {
      return `${getContentHeight()}px`;
    } else {
      return `${maxLines * 1.5}em`;
    }
  };

  return (
    <div>
      <div
        className="overflow-hidden duration-300 ease-in-out"
        style={{ maxHeight: calculateMaxHeight() }}
      >
        <p
          id="text-content"
          className={isExpanded || !isTextOverflowed() ? '' : 'line-clamp-2'}
        >
          {text}
        </p>
      </div>
      {!isExpanded && isTextOverflowed() && (
        <button
          className="text-blue-500 hover:underline"
          onClick={handleToggle}
        >
          展开更多
        </button>
      )}
      {isExpanded && (
        <button
          className="text-blue-500 hover:underline"
          onClick={handleToggle}
        >
          收起
        </button>
      )}
    </div>
  );
};

export default TextMore;
