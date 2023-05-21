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
        style={{
          color: '#747474',
          fontSize: '14px',
          fontStyle: 'italic',
          textAlign: 'left',
          fontFamily: 'Inter',
          fontWeight: 400,
          lineHeight: '30px',
          fontStretch: 'normal',
          textDecoration: 'none'
        }}
        ellipsis={
          visible
            ? false
            : {
                rows: rows,
                expandable: true,
                symbol: (
                  <a style={{ visibility: 'hidden' }}>
                    <DownOutlined />
                    More
                  </a>
                )
              }
        }
      >
        {text}
        {visible && (
          <a
            onClick={() => setVisible(false)}
            style={{
              color: 'inherit',
              textDecoration: 'underline',
              marginLeft: '10px'
            }}
          >
            Collapse
            <UpOutlined />
          </a>
        )}
      </Paragraph>
      {!visible && (
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <a
            onClick={() => setVisible(true)}
            style={{ textDecoration: 'underline' }}
          >
            <DownOutlined />
            More
          </a>
        </div>
      )}
    </div>
  );
};

export default TextMore;
