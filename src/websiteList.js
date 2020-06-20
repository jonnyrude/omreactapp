import React, { useState } from 'react';
import { Table, Tag, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Data from './content/resources/websites';

// Reference: https://ant.design/components/table
// TODO: edit column width
// TODO: make expandable with added notes

export default function () {
  // Company | Name (url linked OR serachable?) | Notes | Tags | Firm Account

  const [data, setData] = useState(Object.create(Data.sites));
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            // this.searchInput = node;
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            //this.handleSearch(selectedKeys, confirm, dataIndex)
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <div>
          <Button
            type="primary"
            //onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            //onClick={() => this.handleReset(clearFilters)}
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        //setTimeout(() => this.searchInput.select());
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      //this.state.searchedColumn === dataIndex ? (
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          //searchWords={[this.state.searchText]}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (text) => <strong>{text}</strong>,
      ...getColumnSearchProps('company'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={record.url}>{text}</a>,
      ...getColumnSearchProps('name'), // TODO: Remove?
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: [
        // TO ADD TAG FILTERS, add objects to this array
        {
          text: 'Medical',
          value: 'medical',
        },
        {
          text: 'Records',
          value: 'records',
        },
      ],
      onFilter: (value, record) => record.tags.indexOf(value) === 0,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      ...getColumnSearchProps('notes'),
    },
    {
      title: 'Firm Account',
      dataIndex: 'firmAccount',
      key: 'firmAccount',
      ...getColumnSearchProps('firmAccount'),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
