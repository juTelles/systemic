# Game Rules

Systemic is a cooperative serious game in which players act as a technology team responsible for maintaining and evolving a software system.

The team wins when all system components have tests. The team loses if the system remains in Critical state at the end of a Crisis Round.

## System structure

The system is represented by three levels of components:

- Local Components: smaller parts of the system, such as Interface, Logic, and Data.
- Structural Components: larger system areas, such as Frontend, Backend, and Database.
- Request Components: integration components responsible for connecting the system, such as Application Requests and Data Requests.

## Bugs

Bugs represent problems in the system.

Local and Structural Components can become saturated when they accumulate too many Bugs. When this happens, they propagate a Bug to the component above them and reset their own Bug count.

Request Components accumulate Bugs continuously. If they are saturated at the end of a round, they propagate Bugs to all connected components.

## System Health

The global system state is defined by the Request Components:

- Healthy: no Request Component is saturated.
- Warning: one Request Component is saturated.
- Critical: both Request Components are saturated.

When the system reaches Critical state, a Crisis Round is triggered.

## Task Points

Task Points represent the team’s available resources. Players use them to:

- resolve Bugs;
- develop tests;
- keep points for future rounds;
- donate points to other players.

Managing Task Points is one of the main cooperative mechanics of the game.

## Cards

Cards introduce changes to the system during the match. They may:

- add Bugs to specific components;
- trigger Events that affect multiple components;
- grant additional Task Points.

## Tests and Bug absorption

Tests protect components from Bugs and reduce the cost of resolving Bugs.

By default, resolving a Bug in a component with a test costs half of the normal resolution cost.

When a component has a test, the first Bug card affecting that component is absorbed instead of being applied to the component. If another Bug affects the same component later, it is applied normally.

This mechanic represents the preventive role of tests in software systems: tested components are more resilient to failures and cheaper to maintain, but they are not immune to every future problem.


## Crisis Round

A Crisis Round represents a moment of emergency response. During this round, the team receives additional resources to try to recover the system.

If the system is still in Critical state at the end of the Crisis Round, the system collapses and the team loses.

## Victory condition

The team wins when all system components have tests.

## Defeat condition

The team loses if the system is in Critical state at the end of a Crisis Round.