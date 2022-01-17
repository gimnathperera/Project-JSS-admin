import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Card } from '@mui/material';
import WorkerTable from './WorkerTable';

import { fetchWorkerList } from '../../../store/actions/worker.actions';

function RecentOrders() {
  const dispatch = useDispatch();
  const workerList = useSelector(({ worker }: RootStateOrAny) => worker.list);
  useEffect(() => {
    dispatch(fetchWorkerList());
  }, []);

  return (
    <Card>
      <WorkerTable workers={workerList} />
    </Card>
  );
}

export default RecentOrders;
