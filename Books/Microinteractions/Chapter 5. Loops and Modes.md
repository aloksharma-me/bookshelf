# [[02. Index – Microinteractions]]

---

# Chapter 5. Loops and Modes


>[! AI Summary]
>Modes should be used sparingly in micro-interactions, as they can lead to confusion and errors. A mode changes the rules of interaction, making actions different based on the current mode. For instance, a settings mode can help avoid clutter, but if users are unsure about which mode they’re in, it can cause problems. Ideally, only one mode should be used, or none at all, to reduce confusion. When switching back and forth between modes, users expect the state to remain the same as they left it.
>
>There are two primary types of modes: spring-loaded and one-off. Spring-loaded modes activate during a specific action, like pressing a key, and deactivate when the action stops. One-off modes last for the duration of a single action, such as a double-tap to enable cut-and-paste.
>
>Loops are cycles that repeat for a set duration or condition. There are different loop styles, like count-controlled or condition-controlled, but infinite loops should be avoided. Loops can also be used to improve long-term interactions, revealing new features or simplifying as users become more skilled.

### Modes
- A mode is a fork in the rules, and for micro-interactions, modes should be used very, very sparingly.
- The best reason to have a mode is when there is an infrequent action that would otherwise clutter the micro-interaction’s main purpose. One common mode is a settings mode, wherein the user specifies something about the micro-interaction.
- The reason to avoid modes in general is that they can cause errors, especially if the mode is just an invisible state the screen is in. Turning on an edit mode, for example, makes a once-familiar screen something the user has to relearn. An action, such as clicking an item, could do drastically different tasks: selecting the item in default mode, deleting it in delete mode. The fewer modes — and in micro-interactions, there should be no more than one, and zero if possible — the less chance of users being confused about what mode they are in, and the less they have to learn about how the micro-interaction works.
- When a user goes to one mode and comes back to the previous mode, they expect the original mode to be in the same state as they left it, although perhaps any changes performed while in the other mode will be reflected in the default mode. For example, in a weather app, if I add another city in the Add a City mode, when I return to looking at weather data, I should see the new city there.

#### Spring-Loaded and One-off Modes
- Spring-loaded modes (sometimes called quasimodes) are only active when a physical action such as pressing a key or holding down a mouse button is occurring. As soon as the action stops, so does the mode. The classic example is pressing the Shift key on your keyboard, which turns on caps lock mode, but only while pressing the Shift key. The Alt, Option, and Command keys also often turn on a spring-loaded mode.
- The drawback is that it doesn’t work well for actions that take some time to execute or require complex input.
- Spring-loaded modes can also be an invisible trigger that brings users to a micro-interaction. Autofill in a search field is an example of this. Autofill only appears when there is text in the field, so it's a type of sprint-loaded mode.
- One-off modes are when a user initiates a mode that lasts for the duration of a single action, then the mode turns off. For example, double-tapping on text in iOS brings up its cut-and-paste features, which disappear after one command has been selected.
- One-off modes are most useful for rapid task switching (as in OmniGraffle) or for contextual use (as in Office and iOS).
- One-off modes can also be helpful for gestural and voice micro-interactions. For example, in some voice interfaces, such as on the Xbox with Kinect, a command word (in this case “Xbox” being it), could be the trigger, which initiates a one-off mode in which another command could be issued. “Lights! Dim!” or “TV! Off!” (A fictional version of this is in Star Trek: “Computer, Locate Commander Riker!”) Riker!”) Similarly, with gestural interfaces, one gesture such as a wave could trigger the microinteraction, putting it into one-off mode in which another gestural command could be issued.

### Loops
- A loop (in micro-interaction parlance) is a cycle that repeats, usually for a set duration.
- A loop is something indicated (directly or indirectly) via the rules. “Get data every 30 seconds” or “Run for three minutes, then stop” or “Send a reminder in 10 days” are all example indicators that a loop is involved.

#### Styles of Loops
- Count-Controlled (For) Loop
	- This repeats for a set number of times before ending. For example, check if there is network connectivity 10 times before giving an error message. 
- Condition-Controlled (While) Loop
	- This repeats while a certain set of conditions is met. If the conditions change or end, so does the loop. If there is a network connection, check for new Twitter messages every minute.
- Collection-Controlled Loop
	- Similar to a Count-Controlled loop, this loop runs through everything in a set, then stops. Example: for each unread email, add one to the unread counter.
- Infinite Loop
	- A loop that begins and never ends until there is an error or someone shuts it down. As with the story of the Spirit rover, these are generally to be avoided, but a microinteraction like turning on a light basically starts an infinite loop: the light doesn’t turn off again until the whole microinteraction is turned off or the light bulb burns out.
- Additionally, there are two kinds of loops:
	- Open loops do not respond to feedback; they execute and end. (“Every day at 10pm, turn on a light.”) 
	- Closed loops have a feedback mechanism built in and are thus self-adjusting. For example, a closed loop could be one that, while the car is running, checks the engine noise level and adjusts the car stereo volume accordingly.
- Loops can be used to recognize behavior as well. For example, if a user has paused at one part of the micro-interaction for too long, the micro-interaction could prompt them with help
- Long Loops
- When designing micro-interactions, you can use what I’m calling long loops and focus not only on doing an individual task, but also on a longer timescale. What can be done to make the micro-interaction better the second time it’s used? The tenth? The ten thousandth?
- Loops can deliver what design strategist and CEO of design consultancy Adaptive Path Brandon Schauer calls The Long Wow. The Long Wow is about delivering new experiences or features over time instead of all at once, and by doing so building customer loyalty
- Progressive disclosure or reduction
- Another use of long loops is progressive disclosure over long periods of time. As users become used to a product, they don’t need as much handholding, and instead can be treated as a more skilled user. For example, shortcuts could be added to a micro-interaction after it’s been used a few times, or more advanced features added.
- Another option is progressive reduction, where the micro-interaction becomes simpler over time, as the user becomes skilled and doesn’t need items such as labels for guidance

---