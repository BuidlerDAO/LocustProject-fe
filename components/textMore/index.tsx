import React, { useState } from 'react';
import { Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface TextProps {
  text: string;
  rows?: number;
}
const { Paragraph } = Typography;
const TextMore: React.FC<TextProps> = ({ text, rows = 2 }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <Paragraph
        ellipsis={
          visible
            ? false
            : {
                rows: rows,
                expandable: true,
                symbol: (
                  <a style={{ visibility: 'hidden' }}>
                    <DownOutlined />
                    展开
                  </a>
                )
              }
        }
      >
        {text}
        {visible && (
          <a onClick={() => setVisible(false)}>
            <UpOutlined />
            收起
          </a>
        )}
      </Paragraph>
      {!visible && (
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <a onClick={() => setVisible(true)}>
            <DownOutlined />
            展开
          </a>
        </div>
      )}
    </div>
  );
};

export default TextMore;
