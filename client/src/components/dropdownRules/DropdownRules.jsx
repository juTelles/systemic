import { CONFIG_DEFINITIONS } from '../../../../shared/src/definitions/gameConfigOptions.js';
import styles from './DropdownRules.module.css';
import { useState } from 'react';
import DropdownItem from './DropdownItem';
import { getGameObjectRulesTxt } from '../../texts/gameRulesTxt.js';

function DropdownRules({ txt }) {
  const [isOpen] = useState(false);
  const [playerCountSelected, setPlayerCountSelected] = useState(4);
  const [difficultySelected, setDifficultySelected] = useState('REGULAR');
  const [gameRulesTxt, setGameRulesTxt] = useState(
    getGameObjectRulesTxt(playerCountSelected, difficultySelected),
  );

  const onChangePlayerCount = (e) => {
    const { value } = e.target;
    setPlayerCountSelected(value);
    setGameRulesTxt(getGameObjectRulesTxt(value, difficultySelected));
  };

  const onChangeDifficulty = (e) => {
    const { value } = e.target;
    setDifficultySelected(value);
    setGameRulesTxt(getGameObjectRulesTxt(playerCountSelected, value));
  };

  const { playerCount, difficulty } = CONFIG_DEFINITIONS;

  return (
    <div className={`${styles.dropdownContainer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.configMenuContainer}>
        <DropdownItem key={''} title={'Configuração das regras'}>
          <label
            htmlFor={'selectPlayerCount'}
            className={styles.labelPlayerCount}
          >
            Quantidade de Jogadores:
            <select
              id={'selectPlayerCount'}
              className={styles.selectPlayerCount}
              onChange={onChangePlayerCount}
              value={playerCountSelected}
            >
              {playerCount?.options?.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.value}
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
              value={difficultySelected}
            >
              {difficulty?.options?.map((option) => (
                <option key={option.id} id={option.id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </label>
          <span className={styles.configMenuWarning}>
            {txt.configMenuWarning?.pt}
          </span>
        </DropdownItem>
      </div>
      {Object.keys(gameRulesTxt).map((txtId) => {
        const title = gameRulesTxt[txtId].title.pt;
        const description = gameRulesTxt[txtId].description.pt;
        return (
          <DropdownItem key={txtId} title={title}>
            {description || 'Sem descrição disponível.'}
          </DropdownItem>
        );
      })}
    </div>
  );
}

export default DropdownRules;
