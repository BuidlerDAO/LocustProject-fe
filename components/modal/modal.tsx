import { Button, ConfigProvider, Modal } from 'antd';
import './index.css';

const Modalprop = (props: {
  ModalMaxWidth?: number;
  BodyMaxWidth?: number;
  okButtonPadding?: string;
  cancelButtonPadding?: string;
  cancelButtonMarginRight?: string;
  locate: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}) => {
  let title = '',
    content = '',
    okText = '';
  if (props.locate === 'home') {
    title = 'Registration';
    content = `There are less than 10 days left until the end of
    this month's locust activity. Can you confirm your
    registration?`;
    okText = 'Confirm';
  } else if (props.locate === 'post') {
    title = 'Delete article';
    content = 'Are you sure? This article will be deleted.';
    okText = 'Delete';
  } else if (props.locate === 'twitter') {
    title = 'Disconnect Discord account';
    content =
      'Are you sure？This account will lose every Guild gated access on Discord.';
    okText = 'Disconnet';
  }
  const {
    isModalOpen,
    handleOk,
    handleCancel,
    ModalMaxWidth,
    BodyMaxWidth,
    okButtonPadding = '8px 48px',
    cancelButtonPadding = '8px 48px',
    cancelButtonMarginRight = '2rem'
  } = props;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: '#232425',
          colorText: '#fff'
        }
      }}
    >
      <Modal
        style={{ maxWidth: `${props.ModalMaxWidth}px` }}
        title={title}
        open={isModalOpen}
        centered
        closable={false}
        okText={okText}
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     Cancel
        //   </Button>

        // ]}
        okButtonProps={{
          style: {
            display: 'flex',
            padding: okButtonPadding,
            backgroundColor: '#E0E0E0',
            color: 'black',
            borderRadius: '32px',
            alignItems: 'center',
            height: '34px',
            justifyContent: 'center'
          }
        }}
        cancelButtonProps={{
          style: {
            display: 'flex',
            padding: cancelButtonPadding,
            backgroundColor: 'inherit',
            color: '#E0E0E0',
            borderRadius: '32px',
            border: '1px solid #E0E0E0',
            alignItems: 'center',
            height: '34px',
            marginRight: cancelButtonMarginRight,
            justifyContent: 'center'
          }
        }}
      >
        <div className="h-[1px] w-[100%] bg-[#4d4d4e]"></div>
        <div
          className="mt-4"
          style={{ color: '#B7B7B7', maxWidth: `${props.BodyMaxWidth}px` }}
        >
          {content}
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default Modalprop;
