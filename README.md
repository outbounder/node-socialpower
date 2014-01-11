# Social Power - the game -

the repo of project related to collaborative learn & do effort, been
held in [varnalab](http://varnalab.org) during 01.2014.

## Goals

* fun
* practice
* new knowledge
  + javascript :)
  + nodejs under-the-hood
  + distributed architectures
  + async control flow, functional programming & continuation style passing primitives
  + streams :)
  + AMD, UMD, CommonJS asset pipe lines, frontend development of single page apps
  + facebook api
  + twitter api
  + mongoose и MongoDB
  + shell-like scripting
  + project life-cycle and best practices from bootstrap to continuous integration development
  + git и още 101 инструмента най-добри приятели на програмиста :)
* twisted point of view

## How

### schedule

#### седмица 1
* [practice 1/ project setup](http://slid.es/outbounder/node-socialpower-class-1)
  * git
  * nvm
  * nodejs
  * npm
  * team up
* practice 2/ api development
  * project api implementation
  * testing
  * documentation

#### седмица 2
* practice 3/ frontend (single-page app) development
  * project frontend implementation
  * testing
  * documentation
* practice 4/ project management
  * deploys & releases
  * continuous integrations

#### седмица 3
* practice 5/ project improvements
* practice 6/ challenges and team highscores, real live testing party :)

### project scope

Simple web based multiplayer game involving all the mentioned above buzz words in soup of fun and glorious hacking. 

#### How it is played

Every registered player should be able to gain points.

Points are collected once the player sends something interesting via the game UI and someone else from the game UI reshare it.

As many reshares there are as many points are given to the player who originally send the interesting message. Every player who sends or reshares recieve points.

Every day on midnight the game room is closed and a player with the top score wins. If there is equality among two or more players, they all are promoted as winners. 

Then highscores table of top winning players are kept up to date.
Optionally messages can be broadcasted to authorized 3rd party apps - twitter/facebook.

All in one:

    -> start

    time0) playerA -send-> messageA

    time1) playerB -send-> messageA
      -then-> points -given-> playerA

    time2) playerC -send-> messageA
      -then-> points -given-> playerA && playerB
    time2) playerD -send-> messageA
      -then-> points -given-> playerA && playerB

    time3) playerF -send-> messageA
      -then-> points -given-> playerA && playerB && playerC && playerD

    -> ...


### Tech details

#### Facebook
https://github.com/criso/fbgraph

#### Twitter
https://github.com/AvianFlu/ntwitter