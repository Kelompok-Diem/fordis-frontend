import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/navbar';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';
import Post from './pages/post';
import PostForm from './pages/post_form';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route exact path="/register" render={(props) => <Register {...props} />}>
        </Route>
        <Route exact path="/login" render={(props) => <Login {...props} />}>
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/post/:id" render={(props) => <Post {...props} />}>
        </Route>
        <Route exact path="/edit-post/:id" render={(props) => <PostForm {...props} />}>
        </Route>
        <Route exact path="/add-post" render={(props) => <PostForm {...props} />}>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
