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
    const fontSize = 14;
    const width = contentRef.current?.offsetWidth ?? 500;
    return (text.length * fontSize) / width > maxLines;
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
    if (contentRef.current) {
      if (isExpanded) {
        const contentHeight = getContentHeight();
        if (contentHeight) {
          contentRef.current.style.maxHeight = `${contentHeight}px`;
        }
      } else {
        contentRef.current.style.maxHeight = `${maxLines * lineHeight}px`;
      }
    }
  }, [isExpanded, maxLines]);

  return (
    <div>
      <div
        className="overflow-hidden duration-300 ease-in-out"
        style={{ maxHeight: calculateMaxHeight() }}
      >
        <p
          ref={contentRef}
          className={
            isExpanded || !isTextOverflowed()
              ? ''
              : `line-clamp-${maxLines.toString()}`
          }
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
