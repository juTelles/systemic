# Playtests Summary

This document summarizes the main technical tests, pre-playtest, and playtests conducted during the development of Systemic.

The goal of these sessions was to validate technical viability, user experience, game flow, difficulty, cooperation, and overall stability of the digital prototype.

## Technical smoke test

A multiplayer smoke test was conducted with two clients running on different computers after deployment on Render.

The goal was to validate the minimum online multiplayer scenario, including room creation, room joining, HTTP polling, action submission, state synchronization, and shared state updates.

The test confirmed that the deployed application could support multiple clients connected to the same match. Some issues were identified, including session instability, page language configuration, browser tab title, and slow image loading. These issues led to improvements in session handling, HTML configuration, and image optimization.

## Pre-playtest

A pre-playtest was conducted locally using two browser instances.

At this stage, the prototype did not yet support a complete match due to missing GameWin and GameOver conditions and issues related to the Crisis Round. However, it already allowed the execution of turns and rounds until one of these conditions occurred.

The main goal was to observe how players interacted with the interface and whether the game provided enough guidance for the available actions.

The session revealed several UX issues, including unclear instructions, difficulty identifying the current turn, confusion about decision modes, unclear component selection, and lack of control during card application.

After this test, the instruction panel, visual highlights, decision flow, and card application flow were improved.

## Playtest 1

The first complete playtest was conducted with the researcher and one participant from the technology field.

The session was intentionally informal, since the prototype was still in an early playable version and could present technical issues.

At the beginning of the session, the researcher was removed from the match due to a session cleanup issue. A fix was deployed, and the test continued. The match was completed, but the team lost. A possible bug was observed near the end of the match, although it was not confirmed.

After this playtest, session handling was improved, room exit flows were refactored, turn instructions were adjusted, and more detailed logging was introduced.

## Playtest 2

The second playtest was conducted with four participants, including people who had already played the physical prototype.

The session was conducted remotely while all participants played the online version and discussed the match through a call.

Two matches were played, and the team lost both. No major stability problems or apparent bugs were observed. However, the main feedback was that the game felt too difficult.

This session led to balance adjustments, especially related to Task Point cards and Event cards.

## Playtest 3

The third playtest was conducted after initial balance adjustments, with participants from the previous session.

One expected participant could not attend, so the match was played with three players. The session was interrupted before completion due to participant availability.

The goal was to observe whether the balance changes improved the perception of difficulty. However, the game was still considered too difficult. Some possible bugs were reported, especially related to round propagation, but they could not be confirmed.

After this session, additional balance changes were made. Logs were also refactored into a JSON download feature, and the Bug application logic was refactored to improve stability and maintainability.

## Playtest 4

The fourth playtest was conducted with four participants who had never played Systemic and had not participated in the development process.

The researcher acted mainly as an observer and tried to interfere as little as possible.

The match was completed successfully. No apparent bugs, crashes, or major performance issues were observed. The players won without entering a Crisis Round. Even though they won, the game was not perceived as too easy, and the difficulty was considered appropriate.

One of the most relevant observations was the emergence of collaboration. At the beginning of the match, players were quieter and acted more individually. As they understood the risks of the system entering a worse state, they started discussing strategies, sharing resources, coordinating decisions, and cooperating more actively.

A questionnaire was applied after the session. Participants highlighted that the scoring mechanics encouraged strategic thinking, that testing earlier reduces Bugs, and that communication is essential for team success.

## General outcome

The playtests showed an iterative improvement of the prototype in terms of stability, UX, difficulty balance, and cooperative dynamics.

The final observed playtest indicated that Systemic was able to support a complete online multiplayer match and stimulate collaboration, communication, strategic thinking, and collective decision-making.