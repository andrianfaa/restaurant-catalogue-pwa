import HomePage from '../views/page/Home';
import DetailPage from '../views/page/Detail';
import SearchPage from '../views/page/Search';
import FavoritePage from '../views/page/Favorite';

const Routes = {
    '/': HomePage,
    '/restaurant': HomePage,
    '/detail/:id': DetailPage,
    '/search/:id': SearchPage,
    '/favorite': FavoritePage,
};

export default Routes;
