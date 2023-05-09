'use client'
import Link from 'next/link'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Space,Upload,Input } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { url } from 'inspector';
import { PlusOutlined } from '@ant-design/icons'



const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const Post = () => {
  const onFinish = (e) => {
    console.log(e)
  }
  return (
     <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link href="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
           
            name="title"
            rules={[{ required: true, message: 'Enter The Article' }]}
          >
            <Input placeholder="+ Enter The Article" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
           
            name="Link"
            rules={[{ required: true, message: 'Please Enter The Original Link' }]}
          >
            <Input placeholder="Please Enter The Original Link" style={{ width: 400 }} />
          </Form.Item>

          {/* <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item> */}
          <Form.Item      
            name="OriginalText"
            rules={[{ required: true, message: 'Please Enter The Core Content Of The Original Text' }]}
          >
            <TextArea placeholder='Please Enter The Core Content Of The Original Text' style={{ width: 600, height: 400 }} />
          </Form.Item>
          <Form.Item
            name="PersonalThoughts"
            rules={[{ required: true, message: 'Please Enter Personal Thoughts' }]}
          >
            <TextArea placeholder='Please Enter Personal Thoughts' style={{ width: 600, height: 400 }}/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit" style={{color:'#424144'}}>
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Post
