import React from 'react';
import { Typography } from '@alfalab/core-components-typography';
import { List } from '@alfalab/core-components-list';

function App() {
  return (
    <div>
      <Typography.Title tag="h2" view="small">
        Typography.Title
      </Typography.Title>
      <Typography.Text tag="p">Typography.Text с дефолтными пропсами.</Typography.Text>

      <List tag="ul">
        <List.Item>Первый пункт списка</List.Item>
        <List.Item>Второй пункт списка</List.Item>
      </List>
    </div>
  );
}

export default App;
