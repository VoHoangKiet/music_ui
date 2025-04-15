import React from 'react';
import { Tabs } from 'antd';
import GenreManagement from './GenreManagement';
import ArtistManagement from './ArtistManagement';
import { AdminContainer, AdminHeader } from './styles';

const AdminPage: React.FC = () => {
  const items = [
    {
      key: 'genres',
      label: 'Genres',
      children: <GenreManagement />,
    },
    {
      key: 'artists',
      label: 'Artists',
      children: <ArtistManagement />,
    },
  ];

  return (
    <AdminContainer>
      <AdminHeader>Admin Dashboard</AdminHeader>
      <Tabs items={items} />
    </AdminContainer>
  );
};

export default AdminPage; 