'use client';
import React, { useEffect, useState } from 'react';

import './index.css';
import { DownloadOutlined } from '@ant-design/icons';
import { ConfigProvider, Select, Table, Typography } from 'antd';
import { getFullMonth } from '@/utils/time';
import { apiGetMonthData, apiGetMonthList, apiGetPostData } from '@/apis/post';
import { get } from 'http';
import { set } from 'nprogress';
type AlignType = 'left' | 'center' | 'right';

const { Text } = Typography;
interface ColumnItem {
  title: string;
  dataIndex: string;
  key: string;
  align?: AlignType;
}
const Table2 = () => {
  const [monthOptions, setMonthOptions] = useState<any>([]);
  const [data, setData] = useState([]);
  const columns2: ColumnItem[] = [
    {
      align: 'center',
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      align: 'center',
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      key: 'walletAddress'
    },
    {
      align: 'center',
      title: 'Number of Content Submitted',
      dataIndex: 'numContentSubmitted',
      key: 'numContentSubmitted'
    },
    {
      align: 'center',
      title: 'Number of Deleted Content',
      dataIndex: 'numDeletedContent',
      key: 'numDeletedContent'
    },
    {
      align: 'center',
      title: 'Bonuses Received',
      dataIndex: 'bonusesReceived',
      key: 'bonusesReceived'
    },
    {
      align: 'center',
      title: 'Registration Time',
      dataIndex: 'registrationTime',
      key: 'registrationTime'
    }
  ];
  //为getdata传入参数
  const getData = (value: string) => {
    Promise.all([apiGetMonthData({ limit: 20, offset: 0, title: value })]).then(
      (values: any) => {
        console.log(values[0].Items);
        const newData = values[0].Items.map((item: any) => {
          //console.log(item);
          return {
            userName: item.Username,
            walletAddress: item.Address,
            numContentSubmitted: item.ContentCount,
            numDeletedContent: item.DeletedCount,
            bonusesReceived: item.BonusReceived
          };
        });
        setData(newData);
        console.log(newData);
      }
    );
  };
  const getMonthList = async () => {
    Promise.all([apiGetMonthList()]).then((values: any) => {
      console.log(values[0].Items);
      const newData = values[0].Items.map((item: any) => {
        console.log(item);
        return {
          value: item,
          label: item
        };
      });
      console.log(newData);
      setMonthOptions(newData);
    });
  };

  useEffect(() => {
    getMonthList();
    console.log(monthOptions);
  }, []);
  const handleChange = (value: string) => {
    //console.log(`selected ${value}`);
    getData(value);
  };
  const onDownload = () => {
    // console.log('download');
  };
  return (
    <>
      <div className="mt-4">
        <div className="flex justify-between">
          <div className="mb-4">
            Schedule
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
          <div>
            <ConfigProvider
              theme={{
                token: {
                  colorBgElevated: 'black',
                  colorText: '#ffffff',
                  colorIconHover: '#ffffff',
                  colorIcon: '#ffffff'
                }
              }}
            >
              <Select
                defaultValue="June"
                style={{
                  width: 80,
                  borderRadius: '8px',
                  border: '1px solid #29282f',
                  color: 'white',
                  outlineColor: '#29282f'
                }}
                bordered={false}
                onChange={handleChange}
                options={monthOptions}
              />
            </ConfigProvider>
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
            }
          }}
        >
          <Table
            columns={columns2}
            dataSource={data}
            pagination={{
              position: ['bottomCenter'],
              pageSize: 4
            }}
          />
        </ConfigProvider>
      </div>
      <style jsx>{`
        .month-border {
          background: #ffffff;
          border: 1px solid #29282f;
          border-radius: 8px;
          padding: 0.5rem 1.5rem;
          gap: 0.25rem;
        }
      `}</style>
    </>
  );
};
const Table1 = () => {
  const [data, setData] = useState<any>([]);
  const columns1: ColumnItem[] = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      align: 'center'
    },
    {
      title: 'Enrollment',
      dataIndex: 'enrollment',
      key: 'enrollment',
      align: 'center'
    },
    {
      title: 'Number of content submitted',
      dataIndex: 'numContentSubmitted',
      key: 'numContentSubmitted',
      align: 'center'
    },
    {
      title: 'Number of valid content',
      dataIndex: 'numValidContent',
      key: 'numValidContent',
      align: 'center'
    },
    {
      title: 'Number of completed tasks',
      dataIndex: 'numCompletedTasks',
      key: 'numCompletedTasks',
      align: 'center'
    },
    {
      title: 'Number of incomplete',
      dataIndex: 'numIncomplete',
      key: 'numIncomplete',
      align: 'center'
    },
    {
      title: 'Total prize pool',
      dataIndex: 'totalPrizePool',
      key: 'totalPrizePool',
      align: 'center'
    }
  ];
  const getData = async () => {
    Promise.all([apiGetPostData('/api/admin/data')]).then((values: any) => {
      //console.log(values);
      //console.log(values[0].Items);
      const newData = values[0].Items.map((item: any) => {
        //console.log(item);
        return {
          month: item.Title,
          enrollment: item.Enrollment,
          numContentSubmitted: item.ContentCount,
          numValidContent: item.ContentValidCount,
          numCompletedTasks: item.CompletedCount,
          numIncomplete: item.UncompletedCount,
          totalPrizePool: item.Prize
        };
      });
      setData(newData);
      //console.log(newData);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onDownload = () => {
    console.log('download');
  };
  return (
    <>
      <div className="mt-3">
        <div className="flex justify-between">
          <div className="mb-4">
            Overview Table
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
            }
          }}
        >
          <Table
            columns={columns1}
            dataSource={data}
            pagination={{
              pageSize: 4,
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};
const TableUserOverview = () => {
  const [data, setData] = useState<any[]>([]);
  //columns含有Month、Number of articles submitted、Number of unsuccessful articles、Number of valid articles、Bonus、Total Prize Pool
  const columns: ColumnItem[] = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      align: 'center'
    },
    {
      title: 'Number of articles submitted',
      dataIndex: 'numArticlesSubmitted',
      key: 'numArticlesSubmitted',
      align: 'center'
    },
    {
      title: 'Number of unsuccessful articles',
      dataIndex: 'numUnsuccessfulArticles',
      key: 'numUnsuccessfulArticles',
      align: 'center'
    },
    {
      title: 'Number of valid articles',
      dataIndex: 'numValidArticles',
      key: 'numValidArticles',
      align: 'center'
    },
    {
      title: 'Bonus',
      dataIndex: 'bonus',
      key: 'bonus',
      align: 'center'
    },
    {
      title: 'Total Prize Pool',
      dataIndex: 'totalPrizePool',
      key: 'totalPrizePool',
      align: 'center'
    }
  ];
  const getData = async () => {
    Promise.all([apiGetPostData('/api/user/campaign/count')]).then(
      (values: any) => {
        console.log(values[0].items);
        const newData = values[0].items.map((item: any) => {
          //console.log(item);
          return {
            month: item.title,
            numArticlesSubmitted: item.posts,
            numUnsuccessfulArticles: item.unSuccessfulPosts,
            numValidArticles: item.validPosts,
            bonus: item.bonus,
            totalPrizePool: item.prize
          };
        });
        setData(newData);
        console.log(newData);
      }
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const data1: readonly any[] | undefined = [
    {
      month: '2021-01',
      numArticlesSubmitted: 10,
      numUnsuccessfulArticles: 2,
      numValidArticles: 8,
      bonus: 100,
      totalPrizePool: 1000
    },
    {
      month: '2021-02',
      numArticlesSubmitted: 10,
      numUnsuccessfulArticles: 2,
      numValidArticles: 8,
      bonus: 100,
      totalPrizePool: 1000
    }
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onDownload = () => {
    console.log('download');
  };
  return (
    <>
      <div className="ml-[3vw] w-[70vw]">
        <div className="mt-[38px] flex justify-between">
          <div className="mb-[24px]">
            Overview
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
              // colorBgDisabled: '#26262675',
            }
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};
const UserArticle = () => {
  const [data, setData] = useState<any[]>([]);
  //columns中有Article Title、Submit Time、Status
  interface CustomColumnItem extends ColumnItem {
    render?: (text: string) => string | React.JSX.Element;
  }
  const columns: CustomColumnItem[] = [
    {
      title: 'Article Title',
      dataIndex: 'articleTitle',
      key: 'articleTitle',
      align: 'center'
    },
    {
      title: 'Submit Time',
      dataIndex: 'submitTime',
      key: 'submitTime',
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text: string) => {
        if (text === 'Audit does not pass') {
          return <Text type="danger">{text}</Text>;
        }
        return text;
      }
    }
  ];
  const getData = async () => {
    Promise.all([apiGetPostData('/api/post/user')]).then((values: any) => {
      //console.log(values[0].items);
      const newData = values[0].items.map((item: any) => {
        // console.log(item);
        if (item.status === 0) {
          item.status = 'Normal';
        } else if (item.status === 1) {
          item.status = 'Audit does not pass';
        }
        return {
          id: item.id,
          articleTitle: item.title,
          submitTime: item.createdAt,
          status: item.status
        };
      });
      setData(newData);
      //console.log(newData);
    });
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onDownload = () => {
    console.log('download');
  };
  return (
    <>
      <div className="ml-[3vw] w-[70vw]">
        <div className="mt-[10px] flex justify-between">
          <div className="mb-[24px]">
            Article Details
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
              // colorBgDisabled: '#26262675',
            }
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export { Table2, Table1, TableUserOverview, UserArticle };
