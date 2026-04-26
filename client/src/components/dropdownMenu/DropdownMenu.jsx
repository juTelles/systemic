import { CONFIG_DEFINITIONS } from '../../../../shared/src/definitions/gameConfigOptions.js';
import styles from './DropdownMenu.module.css';
import { useState } from 'react';
import DropdownItem from './DropdownItem.jsx';

function DropdownMenu({
  handleLeaveRoom,
  handleChangeGameConfig,
  isPreGame,
  isLobby,
  txt,
  disabledExit,
  gameConfig,
  players,
}) {
  const [isOpen] = useState(false);
  const playerCountCurrent = gameConfig?.playerCountConfig;
  const difficultyCurrent = gameConfig?.level;

  const onChangePlayerCount = (e) => {
    let { value } = e.target;
    if (value < players?.length) {
      value = players?.length;
    }
    handleChangeGameConfig(value, difficultyCurrent);
  };

  const onChangeDifficulty = (e) => {
    const { value } = e.target;

    handleChangeGameConfig(playerCountCurrent, value);
  };

  const { playerCount, difficulty } = CONFIG_DEFINITIONS;
  return (
    <div className={`${styles.dropdownContainer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.configMenuContainer}>
        <button
          style={{ display: isLobby ? 'none' : 'block' }}
          disabled={disabledExit}
          className={styles.exitGameButton}
          onClick={() => handleLeaveRoom()}
        >
          {txt.exitGameButton?.pt}
        </button>
        {disabledExit ? (
          <span className={styles.configMenuWarning}>
            {txt.leaveGameWarning?.pt}
          </span>
        ) : null}

        <div className={styles.configOptionsContainer}>
          <DropdownItem
            disabled={!isPreGame || isLobby ? true : false}
            key={''}
            title={txt.configTitle?.pt}
          >
            <label
              htmlFor={'selectPlayerCount'}
              className={styles.labelPlayerCount}
            >
              Quantidade de Jogadores:
              <select
                id={'selectPlayerCount'}
                className={styles.selectPlayerCount}
                onChange={onChangePlayerCount}
                value={playerCountCurrent}
              >
                {playerCount?.options?.map((option) => (
                  <option
                    key={option.id}
                    value={option.value}
                    disabled={option.value < players?.length}
                  >
                    {option.label.pt}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor={'selectDifficulty'}
              className={styles.labelDifficulty}
            >
              Dificuldade:
              <select
                id={'selectDifficulty'}
                className={styles.selectDifficulty}
                onChange={onChangeDifficulty}
                value={difficultyCurrent}
              >
                {difficulty?.options?.map((option) => (
                  <option key={option.id} id={option.id} value={option.value}>
                    {option.label.pt}
                  </option>
                ))}
              </select>
            </label>
          </DropdownItem>
          {isLobby ? (
            <span className={styles.configMenuWarning}>
              {txt.lobbyWarning?.pt}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
