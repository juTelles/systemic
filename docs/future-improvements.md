# Future Improvements

Systemic is currently a functional high-fidelity prototype. Although the current version supports complete online multiplayer matches, several improvements remain planned for future development.

## Automated tests

Unit tests and integration tests should be expanded to cover the main game rules, including:

- action validation;
- Bug application;
- Bug propagation;
- Task Point handling;
- test development;
- system health updates;
- Crisis Round behavior;
- win and loss conditions.

## Engine refactoring

Some parts of the game engine can be refactored to improve readability, maintainability, and long-term evolution.

Future refactoring may include clearer separation between processors, validators, game flow control, and state update logic.

## React component refactoring

The frontend contains several interactive panels and board elements. Some components can be refactored to improve readability, reduce duplication, and simplify future UI changes.

## Game logs

The current version includes game log generation and JSON download. Future improvements should include a more readable format for analysis, filtering, and possibly a structured report view.

## Persistent storage

The current prototype stores match state in memory on the server. A future version should include database integration to support persistence, match history, and more robust recovery.

## UX improvements

Although several UX improvements were made after playtests, additional refinements are still possible, especially related to:

- rule clarity;
- player guidance;
- visual hierarchy;
- responsive layout;
- error feedback;
- onboarding for new players.

## Accessibility and responsive layout

Future improvements should also include accessibility and responsive layout refinements, especially because the game board contains many simultaneous visual elements.

This includes better support for different screen sizes, improved visual hierarchy, keyboard accessibility, and clearer contrast for important game states.

## Onboarding and tutorial

Future versions should include a more guided onboarding experience for first-time players, reducing the need for external explanation during the first match.

This may include an interactive tutorial, contextual hints, or a simplified first-round guidance flow.

## Additional playtesting

More playtests should be conducted with larger and more diverse groups of participants.

Future evaluations should include more structured data collection, comparison between configurations, and deeper analysis of learning and collaboration outcomes.

## Playtest analytics

Future versions could improve the analysis of playtests by generating structured reports from game logs, including round duration, decision frequency, Bug propagation, absorbed Bugs, Crisis Rounds, and win/loss patterns.

## Game balance

The current balance was improved through playtests, but additional sessions are needed to refine:

- Task Point distribution;
- test costs;
- Event card frequency;
- Bug card distribution;
- Crisis Round difficulty;
- different player count configurations.

## Bug absorption improvements

In the current version, components with tests absorb the first Bug affecting them, while subsequent Bugs are applied normally.

A future improvement would be to make Bug absorption less deterministic, using a random or probabilistic rule to decide whether a tested component absorbs an incoming Bug. This could make the game less predictable and increase tension during later rounds.

## English version and internationalization

The project already includes partial English support, and most interface texts have an English version available.

Future work includes completing the remaining translations, reviewing existing English texts, and implementing or finalizing the language selection feature. This would make Systemic more accessible to international players, evaluators, and development teams.

## Documentation

The documentation should continue to evolve as the project becomes more stable, including more detailed API documentation, setup instructions, architecture diagrams, and contribution guidelines.