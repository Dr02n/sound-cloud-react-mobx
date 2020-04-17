import React, { useContext } from 'react';
import { AppContext } from '../../app-context';
import useDataLoader from '../../hooks/use-data-loader';
import { User } from '../../models/user';
import DataGrid from '../DataGrid';

const UserFollowings = ({ user }: { user: User }) => {
  const { api } = useContext(AppContext);
  const dataLoaderProps = useDataLoader<User[]>(
    api.endpoints.userFollowings(user.id),
    api.paginationParams
  );

  return <DataGrid {...dataLoaderProps} />;
};

export default UserFollowings;
