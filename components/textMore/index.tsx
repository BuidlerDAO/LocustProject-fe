import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  maxLines: number;
}

export const TextMore: FC<Props> = ({ text, maxLines }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

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
    return contentRef.current?.scrollHeight;
  };

  const calculateMaxHeight = () => {
    const lineHeight = 30;

    if (isExpanded) {
      return `${getContentHeight()}px`;
    } else {
      return `${maxLines * lineHeight}px`;
    }
  };

  useEffect(() => {
    const lineHeight = 30;
    if (isExpanded) {
      const contentHeight = getContentHeight();
      if (contentHeight) {
        contentRef.current!.style.maxHeight = `${contentHeight}px`;
      }
    } else {
      contentRef.current!.style.maxHeight = `${maxLines * lineHeight}px`;
    }
  }, [isExpanded]);

  return (
    <div>
      <div
        className="overflow-hidden duration-300 ease-in-out"
        style={{ maxHeight: calculateMaxHeight() }}
      >
        <p
          ref={contentRef}
          className={isExpanded || !isTextOverflowed() ? '' : `line-clamp-4`}
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
