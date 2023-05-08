'use client'
import Link from 'next/link'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'


const { Option } = Select
const { RangePicker } = DatePicker

const Post = () => {
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link href="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={submitHandler}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )

async function submitHandler() {
  try {
    // handle submit logic here
  } catch (err) {
    console.error(err);
  }
}

}
export default Post
