# Trainagotchi!
 
- Some kind of readme explaination something or another
- Some kind of score board / temp thing
- train timetable in debugger

---

# Trainagotchi!

A love letter to Tamagotchis, and Tube Trains.

Live out your biggest platform controller fantasies, as you regular the temperature of your tube station,
watch out for rabid rodents, clean up after mucky passengers and dance the night (tube) away.

You're the new Tube controller, and you've got to keep your station in fine fettle.
Don't let your station get too hot, don't let your platform fill up, keep ever

* Trains raise the temperature of your station
* As passengers arrive, they also raise the temperature of the station
* If it gets too hot, people will start to faint!
* Unconscious passengers can't leave the platforms.
* Passengers also can be messy.
* Too much mess attracts mice!
* Trash and mice all takes up space at the station.
* If your platforms get too full, your station will crumble!

But don't worry!

* You can vent cold air through the station to keep everyone cool
* Passengers who reach the exit will cool the platforms down a little
* Departing trains cool the platforms slightly too.
* You can charm mice with songs! They'll find their way off the platform if musically stimulated
* Music will wake up fainting passengers
* Cleaning up will wash away trash

---

# How the game works

The game is split into two parts - the simulation, which runs in `ticks`, and the `ui` which runs at 30 frames per second.

**Game.js**

The `Game.js` file is the main control loop for the game, inside the `Game` class, there is a function called `tick()` which is called once per second.

This `tick` steps the simulation forward, `tick`ing any `entities` (`src/entities`) applying any effects (`/src/buffs`) or problems (`src/problems`) forward one tick per second.

An instance of the `Game` object holds all the state - and the UI elements pass messages to the `Game` instance for the simulation to handle.
The only input the user can supply is applying a `Buff` - either `Clean`, `Vent`, or `Music` - and these are wired to the buttons in the UI.

These button presses create small messages (just javascript objects) that are pushed onto an internal array in the `Game` instance, that we use as a queue of actions.

When the game ticks, any unprocessed messages in it's queue are picked up, **first in, first out** (FIFO), and the game acts appropriately, either creating an *instance of the requested buff* and
applying it to the `Platform`, or triggering the arrival or departure of a train.

The `Game` instance is responsible for three core things

* Handling input and train arrival/departure messages, and routing them to the platform
* Creating instances of `Buffs`
* Checking for *game over*

All the rest of the game logic happens in the `tick` functions found on the `entities`, `problems` and `buffs`.

**entities/Platform.js**

By default, when an instance of `Game` is created, a `Platform` is created.
This platform has some basic state (an age measured in `ticks`, a `width`, a `height`) along with the three core stats the game is ranked on - `hygiene`, `temperature` and `capacity`.
