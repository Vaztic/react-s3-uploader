import React from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import Uppy from "@uppy/core";
import {
  Dashboard,
  DashboardModal,
  DragDrop,
  ProgressBar,
  StatusBar
} from "@uppy/react";
import AwsS3Multipart from "@uppy/aws-s3-multipart";

const users = [
  {
    id: '21559',
    firstname: 'Andrew',
    lastname: 'PANG',
    noc: 'USA',
    rank: 'Black Belt',
    discipline: 'Sport Poomsae',
    division: 'Under 30',
    category: 'Men\'s Individual',
    poomsae1: 'Koryo',
    poomsae2: 'Keumgang',
    poomsae3: 'Taeback',
    poomsae4: 'Pyongwon',
    poomsae5: 'Shipjin',
    poomsae6: 'Jitae',
  },
];

const IndexPage = () => {
  return <h3>Home Page</h3>;
};

const AboutPage = () => {
  return <h3>About Page</h3>;
};

/* const uppy = Uppy({
  meta: {},
  restrictions: { maxNumberOfFiles: 7 },
  autoProceed: true,
})

uppy.use(AwsS3Multipart, {
  limit: 4,
  companionUrl: 'https://vaztic.com/'
})

uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL
  store.dispatch({
    type: 'SET_USER_VIDEO_URL',
    payload: { url: url }
  })
}) */

// const VideoPicker = ({ })

const UsersPage = () => {
  return (
    <>
      {users.map((user, index) => (
        <h5 key={index}>
          <Link to={`/user/${index + 1}`}>{user.id}'s Page</Link>
        </h5>
      ))}
    </>
  );
};

const UserPage = ({ match, location }) => {
  const {
    params: { userId }
  } = match;

  return (
    <>
      <p>
        <strong>{users[userId - 1].firstname} {users[userId - 1].lastname} ({users[userId - 1].noc})</strong>
      </p>
      <p>
        <strong>Belt Rank: </strong>
        {users[userId - 1].rank}
      </p>
      <p>
        <strong>Discipline: </strong>
        {users[userId - 1].discipline}
      </p>
      <p>
        <strong>Division: </strong>
        {users[userId - 1].division}
      </p>
      <p>
        <strong>Category: </strong>
        {users[userId - 1].category}
      </p>
      <p>
        <strong>Poomsae 1: </strong>
        {users[userId - 1].poomsae1}
      </p>
      <p>
        <strong>Poomsae 2: </strong>
        {users[userId - 1].poomsae2}
      </p>
      <p>
        <strong>Poomsae 3: </strong>
        {users[userId - 1].poomsae3}
      </p>
      <p>
        <strong>Poomsae 4: </strong>
        {users[userId - 1].poomsae4}
      </p>
      <p>
        <strong>Poomsae 5: </strong>
        {users[userId - 1].poomsae5}
      </p>
      <p>
        <strong>Poomsae 6: </strong>
        {users[userId - 1].poomsae6}
      </p>
    </>
  );
};

const SearchPage = ({ match, location }) => {
  return (
    <p>
      <strong>Query Params: </strong>
      {location.search}
    </p>
  );
};

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const PropsPage = ({ title }) => {
  return <h3>{title}</h3>;
};

const RedirectPage = () => {
  return <h3>Redirect Page</h3>;
};

const AuthPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <h3>User not loggedin</h3>;
  }
};

const DashboardPage = () => {
  return <h3>Dashboard Page</h3>;
};

const TabPage = ({ match }) => {
  // we get the params - userName and tabName from match props
  const {
    params: { userName, tabName },
  } = match;

  // find the tab using both the params
  const tab = users
    .find(({ name }) => name === userName)
    .tabs.find(({ name }) => name === tabName);

  // Show the content for that particular tab
  return (
    <div>
      Tab Name: <strong>{tab.name}</strong>
      <h6>Tab content: </h6>
      <ul>
        {Object.keys(tab.content).map((key, index) => {
          return (
            <li key={index}>
              <span>{key} : </span>
              <strong>{tab.content[key]}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <section className="App">
      <Router>
        <div style={{ marginBottom: "10px" }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/users">Users</Link>
          <Link to="/search?q=react">Search</Link>
          <Link to="/404-not-found">404</Link>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Link to="/props-through-component">Props through component</Link>
          <Link to="/props-through-render">Props through render</Link>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Link to="/old-route">Redirecting to New page</Link>
          <Link to="/auth-not-loggedin">Not Loggedin</Link>
          <Link to="/auth-loggedin">User Loggedin</Link>
        </div>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/user/:userId" component={UserPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route
            exact
            path="/props-through-component"
            component={() => <PropsPage title={`Props through component`} />}
          />
          <Route
            exact
            path="/props-through-render"
            render={props => (
              <PropsPage {...props} title={`Props through render`} />
            )}
          />
          <Redirect from="/old-route" to="/new-route" />
          <Route exact path="/new-route" component={RedirectPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route
            exact
            path="/auth-not-loggedin"
            render={props => <AuthPage {...props} isLoggedIn={false} />}
          />
          <Route
            exact
            path="/auth-loggedin"
            render={props => <AuthPage {...props} isLoggedIn={true} />}
          />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
      <a href="/about">about with browser reload</a>
    </section>
  );
};

export default App;