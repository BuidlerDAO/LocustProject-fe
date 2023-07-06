'use client';
import React, { useEffect, useState } from 'react';

import './index.css';
import { DownloadOutlined } from '@ant-design/icons';
import { ConfigProvider, Select, Spin, Table, Typography } from 'antd';
import { getFullMonth } from '@/utils/time';
import {
  apiGetCampaign,
  apiGetCurrentCampaign,
  apiGetPostData
} from '@/apis/post';
import { convertHexToDecimal } from '@/utils/16to10';

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
  const [Loading, setLoading] = useState(true);

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
  const getData = (value: any = '') => {
    Promise.all([
      apiGetCampaign({ campaignId: value, includeRealBonus: false })
    ]).then((values: any) => {
      //console.log(values[0].items);
      const newData = values[0].items.map((item: any) => {
        //console.log(item);
        return {
          userName: item.user.name,
          walletAddress: item.user.address,
          numContentSubmitted: item.validPostCount,
          numDeletedContent: item.invalidPostCount,
          bonusesReceived: item.bonus,
          registrationTime: item.createdAt
        };
      });
      setData(newData);
      // console.log(newData);
      setLoading(false);
    });
  };
  const getMonthList = async () => {
    Promise.all([apiGetPostData('/api/campaign/detail')]).then(
      (values: any) => {
        const months = new Set(values[0].items.map((item: any) => item.month));
        const newData = Array.from(months).map((month) => {
          return {
            label: month,
            value: month,
            id: values[0].items.find((item: any) => item.month === month).id
          };
        });
        setMonthOptions(newData);
        console.log(newData);
        getData(newData[0].id);
      }
    );
  };

  useEffect(() => {
    getMonthList();
  }, []);
  const handleChange = (value: any) => {
    //在mothOptions中找到value对应的label
    // console.log(value, monthOptions);
    const findMonth = monthOptions.find(
      (item: any) => item.value === value.value
    );
    //console.log(findMonth);
    getData(findMonth.id);
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
          <div className="mt-[-20px] flex items-center justify-center">
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
                defaultValue="2023-06"
                style={{
                  width: 100,
                  borderRadius: '8px',
                  border: '1px solid #29282f',
                  color: 'white',
                  outlineColor: '#29282f',
                  marginRight: '12px'
                }}
                bordered={false}
                labelInValue={true}
                onChange={(value) => handleChange(value)}
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
            loading={Loading}
            columns={columns2}
            dataSource={data}
            pagination={{
              position: ['bottomCenter'],
              pageSize: 4
            }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};
const Table1 = () => {
  const [data, setData] = useState<any>([]);
  const [Loading, setLoading] = useState(true);
  interface CustomColumnItem extends ColumnItem {
    render?: (text: string) => string | React.JSX.Element;
  }
  const columns1: CustomColumnItem[] = [
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
      align: 'center',
      //用convertHexToDecimal把数据转换为10进制
      render: (text: string) => convertHexToDecimal(text)
    }
  ];
  const getData = async () => {
    Promise.all([apiGetPostData('/api/campaign/detail')]).then(
      (values: any) => {
        const newData = values[0].items.map((item: any) => {
          console.log(item);
          return {
            month: item.month,
            enrollment: item.participantsCount,
            numContentSubmitted: item.postCount,
            numValidContent: item.validPostCount,
            numCompletedTasks: item.validParticipantsCount,
            numIncomplete: item.invalidParticipantsCount,
            totalPrizePool: item.totalPledgedAmount
          };
        });
        setData(newData);
        setLoading(false);
      }
    );
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
            loading={Loading}
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
  const [Loading, setLoading] = useState<boolean>(true);
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
  const getData = async (value: any = '') => {
    Promise.all([
      apiGetCampaign({ campaignId: value, includeRealBonus: true })
    ]).then((values: any) => {
      //console.log(values[0].items);
      const newData = values[0].items.map((item: any) => {
        //console.log(item);
        return {
          month: item.campaign.month,
          numArticlesSubmitted: item.postCount,
          numUnsuccessfulArticles: item.invalidPostCount,
          numValidArticles: item.validPostCount,
          bonus: item.bonus,
          totalPrizePool: item.campaign.totalPledgedAmount
        };
      });
      setData(newData);
      //console.log(newData);
      setLoading(false);
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
            loading={Loading}
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
  const [Loading, setLoading] = useState<boolean>(true);
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
    Promise.all([apiGetPostData('/api/post-digest')]).then((values: any) => {
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
      setLoading(false);
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
            loading={Loading}
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
