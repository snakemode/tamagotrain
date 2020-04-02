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

The timer that calls our `tick` function is commonly called `the game loop` in game programming.
The loop that draws to the screen, is frequently referred to as the `render loop`

## Game.js

The `Game.js` file is the main control loop for the game, inside the `Game` class, there is a function called `tick()` which is called once per second.

This `tick` steps the simulation forward, `tick`ing any `entities` (`src/entities`) applying any effects (`/src/buffs`) or problems (`src/problems`) forward one tick per second.

An instance of the `Game` object holds all the state - and the UI elements pass messages to the `Game` instance for the simulation to handle.
The only input the user can supply is applying a `Buff` - either `Clean`, `Vent`, or `Music` - and these are wired to the buttons in the UI.

These button presses create small messages (just javascript objects) that are pushed onto an internal array in the `Game` instance, that we use as a queue of actions.

When the game ticks, any unprocessed messages in it's queue are picked up, **first in, first out** (FIFO), and the game acts appropriately, either creating an *instance of the requested buff* and
applying it to the `Platform`.

The `Game` instance is responsible for three core things

* Handling input and train arrival/departure messages, and routing them to the platform
* Creating instances of `Buffs`
* Checking for *game over*

All the rest of the game logic happens in the `tick` functions found on the `entities`, `problems` and `buffs`.

## entities/Platform.js

By default, when an instance of `Game` is created, a `Platform` is created.
This platform has some basic state (an age measured in `ticks`, a `width`, a `height`) along with the three core stats the game is ranked on - `hygiene`, `temperature` and `capacity`.
Combined with it's `contents` array, all the game is won or lost based on the state of these variables, which the game evaluates each tick.

When the `Platform` ticks, the following things happen -

* Any unprocessed messages are read, FIFO.
* If a message for a train arrival or departure is found a train is created on the platform or removed from it.
* All `tickables` are `tick`ed.
* Any completed contents or buffs are removed - an item is deemed complete if a property `completed` is present, and set to true on the object.

The `tickables` that the platform stores are:

* Any present train
* All of the contents of the platform
* All of the buffs applied to the platform

In that order, each of the items present in the platform has it's `tick` method invoked.

On each tick, the thing that is being `ticked` gets handed the current instance of the platform, and based on the logic in that items `class`, it can mutate the properties of the platform.
For instance - every tick, a `Mouse` could reduce the `hygiene` property of our platform.

If any of our `tickables` are deemed complete, and happen to have a function available on them called `onCompletion`, this will be executed before the item is removed from the platforms `contents` array.

## Entities, Buffs and Problems

Entities, Buffs and Problems are all JavaScript classes that can mutate the state of the `Platform` instance in their `tick` method.

* Both `Entities` and `Problems` have `x` and `y` coordinates that are used to move them around the user interface.
* `Problems` all inherit from a `Base Class` called `Problem` which creates these properties by default for them.

A problem looks like this:

```js
class MyRandomProblem extends Problem {
  constructor(x, y) {
    super(x, y);
  }
  
  tick(platform) {   
    // Do something    
    this.ticks++;
  }  

  onCompletion(platform) {
  }
}

module.exports = MyRandomProblem;
```

You can add more problems and logic to spawn them if you like.

There's nothing especially interesting about entities or problems - they just hold state and it is expected they do things during the lifetime of a game.

For example:

* Travellers walk towards the exit by moving 10 pixels closer to the exit each tick
* Travellers have a chance of dropping trash
* Trash has a chance of adding mice to the platform
* Trains add an extra Traveller to the platform every tick

All of this logic exists in the `tick` function of each kind of entity or problem.