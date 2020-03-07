import React from 'react';
import { Typography } from 'antd';

const H2 = props => <Typography.Title level={2} {...props}></Typography.Title>;
const H3 = props => <Typography.Title level={3} {...props}></Typography.Title>;
const H4 = props => <Typography.Title level={4} {...props}></Typography.Title>;
const STRONG = props => <Typography.Text strong {...props}></Typography.Text>;
const DELETE = props => <Typography.Text delete {...props}></Typography.Text>;

const ComponentMap = {
  h1: Typography.Title,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Typography.Paragraph,
  strong: STRONG,
  delete: DELETE
};

export { ComponentMap };
