import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNoification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNoification && (
        <Notification 
          title={activeNoification.title} 
          message={activeNoification.message} 
          status={activeNoification.status} 
        />
      )}
    </Fragment>
  );
}

export default Layout;
