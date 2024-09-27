import { Table } from 'antd';
import { usePasswordStore } from '../../stores';

const History = () => {
  const passwordState = usePasswordStore((state) => state.password)

  const columns = [
    {
      title: 'Passwords',
      // dataIndex: (key) => key,
      key: (key) => key,
      render: (text) => <a>{text}</a>,
    },
  ];

  const rowSelection = {
    onChange: (e) => console.log(e),
  };

  return (
    <Table
      size='small'
      rowSelection={rowSelection}
      columns={columns}
      dataSource={passwordState}
    />
  )
}

export default History;