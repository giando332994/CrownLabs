import { FC } from 'react';
import { Space, Menu, Dropdown, Typography, Popconfirm, Tooltip } from 'antd';
import Button from 'antd-button-color';
import {
  DeleteOutlined,
  MoreOutlined,
  DesktopOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import Badge from '../../common/Badge';

export interface ITableTemplateRowProps {
  text: string;
  persistent: boolean;
  gui: boolean;
  nActive: number;
  destroyAll: () => void;
}

const TableTemplateRow: FC<ITableTemplateRowProps> = ({ ...props }) => {
  const { text, persistent, nActive, gui, destroyAll } = props;
  const { Text } = Typography;
  return (
    <div className="w-full flex justify-between pr-2">
      <Space size={'middle'}>
        {gui ? (
          <DesktopOutlined
            className={'primary-color-fg'}
            style={{ fontSize: '24px' }}
          />
        ) : (
          <CodeOutlined
            className={'primary-color-fg'}
            style={{ fontSize: '24px' }}
          />
        )}
        <Badge size="small" value={nActive} className="mx-0" />
        <Text className="font-bold sm:w-max" ellipsis={true}>
          {text}
        </Text>
        {persistent && (
          <Tooltip title="Persistent">
            <SafetyCertificateOutlined
              className="text-green-500 flex items-center"
              style={{ fontSize: '18px' }}
            />
          </Tooltip>
        )}
      </Space>

      <Popconfirm
        placement="left"
        title="You are about to delete all VMs in this. Are you sure?"
        okText="Yes"
        cancelText="No"
        onConfirm={e => {
          e?.stopPropagation();
          destroyAll();
        }}
        onCancel={e => e?.stopPropagation()}
      >
        <Button
          type="danger"
          shape="round"
          size="middle"
          icon={<DeleteOutlined />}
          className="hidden lg:inline-block border-0"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          Destory All
        </Button>
      </Popconfirm>

      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            <Menu.Item icon={<DeleteOutlined className="text-lg" />} danger>
              Destory All
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          className="lg:hidden flex justify-center"
          type="default"
          with="link"
          shape="circle"
          size="middle"
          icon={
            <MoreOutlined
              className={'flex items-center'}
              style={{ fontSize: '20px' }}
            />
          }
        />
      </Dropdown>
    </div>
  );
};

export default TableTemplateRow;
