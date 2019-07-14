import React from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'
import ArticlesList from './pages/ArticlesList'
import ArticlePage from './pages/ArticlePage' 

class App extends React.Component {
  render() {
      return (
        <Router>
          <div className="App">
            {/* Route takes two main props: path and component*/}
            <div id="page-body">
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/articles-list" component={ArticlesList} />
              <Route path="/article" component={ArticlePage} />
            </div>

          </div>
      </Router>

    );
  }
}
 
export default App;
