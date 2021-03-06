/* globals firebase */
import React from 'react';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon,
} from 'rmwc/Toolbar';
import { connect } from 'unistore/react';
import { actions } from '../store';
import { Bolt, Exit } from '../svg';

const css = {
  icon: {
    display: 'inline-block',
    position: 'relative',
    top: '2px',
    width: '15px',
    margin: '0 10px',
  },
};

export default connect('currentUser,drawerOpen', actions)(
  ({ currentUser, drawerOpen, setDrawerOpen }) => {
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            {currentUser && (
              <ToolbarMenuIcon
                use="menu"
                onClick={() => setDrawerOpen(!drawerOpen)}
                onFocus={() => setDrawerOpen(true)}
                onBlur={() => setDrawerOpen(false)}
                tabIndex="1"
              />
            )}
            <ToolbarTitle>
              Firelist
              <Bolt style={css.icon} />
            </ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd style={{ alignItems: 'center' }}>
            {currentUser && <div>{currentUser.email}</div>}
            {currentUser && (
              <div>
                <ToolbarIcon onClick={signOut}>
                  <Exit />
                </ToolbarIcon>
              </div>
            )}
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    );
  }
);

function signOut() {
  firebase.auth().signOut();
}
