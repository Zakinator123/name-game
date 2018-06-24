import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GitHubLogo from './GitHub_Logo_White.png';
import './BottomBar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
};

export const BottomBar = () => {
    return (
            <div className="App-footer">
                <a href="https://github.com/Zakinator123/name-game/" ><div className="Author-text">Name Game by Zakey Faieq</div></a>
                <a href="https://github.com/Zakinator123/name-game/"> <img className="Github" src={GitHubLogo} alt="Github"/></a>
            </div>
    )
};

export default withStyles(styles)(BottomBar);