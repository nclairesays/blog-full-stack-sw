import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  // if we go to any of our existing pages, is essentially, they display whatever component we give it, if the URL matches the route's path, And since we didn't give this route a path, with another react router component called Switch
  
  Switch
} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'
import ArticlesListPage from './pages/ArticlesListPage'
import ArticlePage from './pages/ArticlePage' 
import NavBar from './NavBar'
import NotFoundPage from './pages/NotFoundPage'

class App extends React.Component {
  render() {
      return (
        <Router>
          <div className="App">
            <NavBar />
            {/* Route takes two main props: path and component*/}
            <div id="page-body">
              {/* Switch will make sure we route to first route/one route. So it'll only render the first route that matches the URL */}
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/articles-list" component={ArticlesListPage} />
                <Route path="/article/:name" component={ArticlePage} />
                <Route component={NotFoundPage}/>
              </Switch>
            </div>

          </div>
      </Router>

    );
  }
}
 
export default App;
