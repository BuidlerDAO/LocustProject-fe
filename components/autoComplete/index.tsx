import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames';
interface AutoComplete {
  className?: string;
  options?: any;
  placeholder?: string;
  onSearch: (e: any) => void; //用户自定义搜索结果
  style?: React.CSSProperties;
}
/**
 * 1.输入框防抖，避免多次请求
 * 2.非输入框点击关闭下拉框
 */
const AutoComplate = (props: AutoComplete) => {
  const { options, className, placeholder, onSearch, style } = props;
  const [list, setList] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isDownShow, setIsDownShow] = useState(false);
  const [activedIndex, setActivedIndex] = useState(0); //当前选中的列表
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: any) => {
      const isOutside = !divRef.current?.contains(e.target as Node);
      if (isOutside) setIsDownShow(false);
    };
    document.addEventListener('click', handle);
    return () => {
      document.removeEventListener('click', handle);
    };
  }, []);
  //input change
  const onInputChange = (e: any) => {
    Promise.resolve(onSearch(e.target.value)).then((msg: any) => {
      setList(msg);
      setActivedIndex(0);
      setIsDownShow(true);
    });
  };
  //防抖处理
  const debunleInput = useCallback(debounce(onInputChange, 500), []);

  //classname
  const classes = classNames('auto-complete', className);

  //选择下拉列表某一项
  const choseItem = (e: any) => {
    setInputVal(e);
  };

  //键盘事件监听
  const handleKeyDown = (e: any) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 13: //enter
        //选择
        setInputVal(list[activedIndex]);
        setIsDownShow(false);
        break;
      case 38: //↑
        if (activedIndex !== 0) {
          setActivedIndex(activedIndex - 1);
        }
        break;
      case 40: //↓
        if (activedIndex !== list.length - 1) {
          setActivedIndex(activedIndex + 1);
        }
        break;
      case 27: //esc
        //关闭并退出
        setActivedIndex(0);
        setIsDownShow(false);
        break;
      default:
        break;
    }
  };
  return (
    <div className={classes} ref={divRef}>
      <input
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onInput={(e: any) => {
          setInputVal(e.target.value);
          debunleInput(e);
        }}
        value={inputVal}
      />
      <div className="auto-complete-lists">
        {isDownShow &&
          list.length > 0 &&
          list.map((item, index) => (
            <div
              key={item + '' + Math.random()}
              className={
                activedIndex === index
                  ? 'auto-complete-lists-item auto-complete-lists-item-actived'
                  : 'auto-complete-lists-item'
              }
              onClick={() => {
                setIsDownShow(false);
                choseItem(item);
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AutoComplate;
