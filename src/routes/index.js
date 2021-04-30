import App from '../pages/App';
import Calendar from '../pages/Calendar/Calendar';

const Routes = [
  {
    path: '/',
    component: Calendar,
    exact: true
  },
  {
    path: '/challenge-specifications',
    component: App,
    exact: true
  }
];

export default Routes;
