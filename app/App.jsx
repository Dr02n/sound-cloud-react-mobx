import key from 'keymaster';
import {observer, Provider} from 'mobx-react';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AppBar from './components/AppBar';
import Callback from './components/Callback';
import Explore from './components/Explore';
import PageNotFound from './components/PageNotFound';
import playerStore from './stores/player-store';
import sessionStore from './stores/session-store';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Player from './components/Player/Player';
// import ScrollToTopBtn from './components/ScrollToTopBtn';
import viewStore from './stores/view-store';

class App extends React.Component {
  componentDidMount() {
    key('space', (e) => { e.preventDefault(); playerStore.playTrack() });
    key('right', () => playerStore.stepForward());
    key('left', () => playerStore.stepBackward());
    key('shift+right', () => playerStore.playNext());
    key('shift+left', () => playerStore.playPrev());
    key('shift+up', () => { playerStore.increaseVolume(); this.showVolumeControl(); });
    key('shift+down', () => { playerStore.decreaseVolume(); this.showVolumeControl(); });
    key('shift+l', () => playerStore.toggleLoop());
    key('m', () => { playerStore.toggleMuted(); this.showVolumeControl(); });
    key('s', () => playerStore.toggleShuffle());
    key('l', () => sessionStore.toggleLike(playerStore.track));
    key('p', () => viewStore.togglePlaylist());
  }

  showVolumeControl() {
    viewStore.volumeControlOpen = true;
    clearTimeout(this._timerId);
    this._timerId = setTimeout(() => viewStore.volumeControlOpen = false, 1000);
  }

  render() {
    return (
      // <MuiThemeProvider>
        // TODO: refactor to use context
        <Provider playerStore={playerStore} viewStore={viewStore} sessionStore={sessionStore}>
          <div style={{paddingBottom: playerStore.track ? 64 : 0}}>
            <AppBar />

            <Route exact path="/" render={() => (<Redirect to="/explore" />)} />
            <Switch>
              <Route path='/callback' component={Callback} />
              {/*<Route path='stream' component={Stream} />*/}
              <Route path='/explore'>
                <Explore/>
              </Route>
              {/*<Route path='search' component={Search} />*/}
              {/*<Route path='users/:user' component={User}>*/}
              {/*  <Route path='tracks' component={UserTracks} />*/}
              {/*  <Route path='playlists' component={UserPlaylists} />*/}
              {/*  <Route path='likes' component={UserLikes} />*/}
              {/*  <Route path='followings' component={UserFollowings} />*/}
              {/*  <Route path='about' component={UserAbout} />*/}
              {/*</Route>*/}
              {/*<Route path='users/:user/tracks/:track' component={Track} />*/}
              {/*<Route path='users/:user/playlists/:playlist' component={Playlist} />*/}
              <Route path='*'>
                <PageNotFound/>
              </Route>
            </Switch>

            {/*<Player />*/}
            {/*<ScrollToTopBtn />*/}
          </div>
        </Provider>
      // </MuiThemeProvider>
    );
  }
}

export default observer(App);
