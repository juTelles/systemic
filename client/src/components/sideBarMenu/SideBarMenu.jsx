import styles from './SideBarMenu.module.css';
import { sideBarTxt } from '../../texts/sideBarTxt.js';
import DropdownRules from '../dropdownRules/DropdownRules';
import DropdownMenu from '../dropdownMenu/DropdownMenu';

function SideBarMenu({
  isSideBarOpen,
  handleCloseSideBar,
  menuTypeOpen,
  handleChangeGameConfig,
  handleLeaveRoom,
  isPreGame,
  isLobby,
  disabledExit,
  gameConfig,
  players,
}) {
  return (
    <>
      <div className={`${styles.sidebar} ${isSideBarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <button
            className={styles.closeBtn}
            onClick={() => handleCloseSideBar()}
          >
            ✕
          </button>
          <span className={styles.sidebarTitle}>
            {sideBarTxt?.sideBarTitle?.[menuTypeOpen]?.pt}
          </span>
        </div>
        <div className={styles.sidebarContent}>
          {menuTypeOpen === 'RULES' ? (
            <DropdownRules txt={sideBarTxt.dropdownRulesTxt} />
          ) : (
            <DropdownMenu
              handleChangeGameConfig={handleChangeGameConfig}
              handleLeaveRoom={handleLeaveRoom}
              isPreGame={isPreGame}
              isLobby={isLobby}
              txt={sideBarTxt.dropdownMenuTxt}
              disabledExit={disabledExit}
              gameConfig={gameConfig}
              players={players}
            />
          )}
        </div>
      </div>
      {isSideBarOpen && (
        <div
          onClick={() => handleCloseSideBar()}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        />
      )}
    </>
  );
}

export default SideBarMenu;
