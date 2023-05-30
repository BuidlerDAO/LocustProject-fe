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
      return `${maxLines * 1.9}em`;
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
          className="text-moreBtnGrey hover:underline"
          onClick={handleToggle}
        >
          More
        </button>
      )}
      {isExpanded && (
        <button
          className="text-moreBtnGrey hover:underline"
          onClick={handleToggle}
        >
          Collapse
        </button>
      )}
    </div>
  );
};

export default TextMore;
