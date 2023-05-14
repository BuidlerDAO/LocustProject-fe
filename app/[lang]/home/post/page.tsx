'use client';
import Link from 'next/link';
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Space,
  Upload,
  Input
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { url } from 'inspector';
import { PlusOutlined } from '@ant-design/icons';
import { create } from 'zustand';
import usePostStore from '@/store';
import PostComponent from '@/components/postComponent/postComponent';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Post = () => {
  const increase = usePostStore((state) => state.increase);
  
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const onFinish = (e: {
    title: string;
    link: string;
    originalText: string;
    personalThoughts: string;
  }) => {
    console.log(getCurrentDate());

    Object.assign(e, { time: getCurrentDate() });
    console.log(e);
    increase(e);
    console.log(usePostStore.getState());
  };
  return (
    <div>
      <PostComponent />
      {/* <Card>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 34 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Enter The Article' }]}
          >
            <Input
              placeholder="+ Enter The Article"
              className="text-white rounded-2xl"
              style={{ width: '75vw', height: '5vh' }}
            />
          </Form.Item>
          <Form.Item
            name="Link"
            rules={[
              { required: true, message: 'Please Enter The Original Link' }
            ]}
          >
            <Input
              className="text-white rounded-2xl"
              placeholder="Please Enter The Original Link"
              style={{ width: '75vw', height: '5vh' }}
            />
          </Form.Item>
          <div className="text-white text-base mb-2">Orginal Summary</div>
          <Form.Item
            name="OriginalText"
            rules={[
              {
                required: true,
                message: 'Please Enter The Core Content Of The Original Text'
              }
            ]}
          >
            <TextArea
              className="text-white rounded-2xl"
              placeholder="Please Enter The Core Content Of The Original Text"
              style={{ width: '75vw', height: '15vh' }}
              rows={10}
            />
          </Form.Item>
          <div className="text-white text-base mb-2">Personal Thoughts</div>
          <Form.Item
            name="PersonalThoughts"
            rules={[
              { required: true, message: 'Please Enter Personal Thoughts' }
            ]}
          >
            <TextArea
              className="text-white rounded-2xl"
              rows={10}
              placeholder="Please Enter Personal Thoughts"
              style={{ width: '75vw', height: '15vh' }}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-center">
              <Button
                className="flex items-center px-16 py-6 rounded-full text-base text-white bg-purple3 hover:bg-purple1 hover:text-white outline-none justify-center"
                htmlType="submit"
                style={{ fontFamily: 'fantasy' }}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card> */}
    </div>
  );
};
export default Post;
