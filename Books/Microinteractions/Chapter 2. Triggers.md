# [[02. Index – Microinteractions]]

---

# Chapter 2. Triggers

>[! AI Summary]
>Triggers should be recognizable in context and always initiate the same action for consistency. Bring relevant data forward to provide context before engagement. Maintain visual affordance—if it looks interactive, it should be. Frequently used micro-interactions must be highly visible, while rare ones can be hidden. Avoid false affordances that mislead users. Labels should clarify actions concisely and remain consistent. Manual triggers include buttons, toggles, dials, and sliders with distinct states. Invisible triggers, like gestures or voice commands, must be intuitive. System triggers activate via errors, location, or incoming data. Define rules for frequency, visibility, and user control.

- first principle of triggers: make the trigger something the target users will recognize as a trigger in context.

### Manual Triggers
- Manual triggers usually spring from a user want or need: “I want to turn the TV on.” “I want to turn the ringer off on this phone.” “I need to move this text from one place to another.” “I want to buy a MetroCard.”
- The second principle of triggers, although it seems incredible to even have to say this, is have the trigger initiate the same action every time.
- This is so users can create an accurate mental model of how the micro-interaction works. This is violated more frequently than one might imagine. Tech reviewer David Pogue on the Samsung S Note: Some of the icons in S Note actually display a different menu every other time you tap them. I’m not making this up.

#### Bring the Data Forward
- The third principle of manual triggers is to bring the data forward.
- Ask yourself, what can I show about the internal state of the micro-interaction before it is even engaged or while a process is ongoing? What are the most valuable pieces of information I can show?
- A simple example is a stock market app. Perhaps it indicates (via color or an arrow) the current state of the market or a stock portfolio, which could prompt the user to launch the micro-interaction — or not. The trigger becomes a piece of ambient information available at a glance that might lead to using the trigger.
- The trigger can also indicate where in a process a product is (see Figure 2-3 for an example). The button you use to start a process (making toast, for example) could indicate how long it is until the toast is ready.

#### The Components of a Trigger
- Manual triggers can have three components: the control itself, the states of the control, and any text or iconographic label.
- Controls
	- The kind of control you choose can be determined by how much control you want to give:
	- For a single action (e.g., fast-forward), a button or a simple gesture is a good choice. The “button” in some cases could be an icon or menu item, while the gesture could be a movement like a tap, swipe, or wave. A button could also be (or be paired with) a key command or a gesture.
	- For an action with two states (e.g., on or off), a toggle switch makes sense.
	- For an action with several defined states, a dial is a good choice. Aside from having detents, dials can have a push/pull toggle state as well. Alternatively, a set of buttons could be used, one for each choice.
	- For an action along a continuum (e.g., adjusting volume) with a defined range, a slide or dial (particularly a jog dial, which can spin quickly) are the best choices.
	- Some manual triggers are made up of multiple controls or elements such as form fields (radio buttons, checkboxes, text-entry fields, etc.).
	- The goal for micro-interactions is to minimize choice and instead provide a smart default and a very limited number of choices. The control you select for the trigger should reflect this philosophy.
	- Controls are tightly coupled with visual affordances — what users expect can be done, based on sight.
	- The fourth principle of triggers is don’t break the visual affordance: if your trigger looks like a button, it should work like a button and be able to be pushed.
	- Making manual triggers discoverable
	- The fifth principle of triggers is that the more frequently the micro-interaction is used, the more visible it should be.
	- Author Scott Berkun has a golden rule for discoverability that I’ve adapted for micro-interactions. It’s this: micro-interactions that most people do, most often, should be highly discoverable. micro-interactions that some people do, somewhat often, should be easily discoverable. micro-interactions that few people do, infrequently, should take some searching to find.
	- There are two ways we as humans become aware of anything in our environment. The first is that the item, either through movement or sound, causes our attention to involuntarily attune to it.
	- The second way we pay attention to anything is when we’re actively seeking to find something — when we’re goal-based.
	- However, it should be noted that our reaction time to sound is faster than visual; auditory stimulus takes 8–10 milliseconds to reach the brain but visual stimulus takes 20–40 milliseconds. Reaction time to sound is also faster: 140–160 milliseconds for sound versus 180–200 milliseconds for visual.[
	- Again, this makes evolutionary sense. The human eye is limited to about 180 degrees horizontal and 100 degrees vertical, while hearing is 360 degrees.
	- it’s easier to find a target when we’re looking for a single characteristic rather than a combination of characteristics, so it’s best to keep your triggers visually simple — especially if they are going to live in a crowded environment such as among other icons.
	- The sixth principle of manual triggers is don’t make a false affordance.
	- If an item looks like a button, it should act like a button. With micro-interactions, the least amount of cognitive effort is the goal. Don’t make users guess how a trigger works.
	- As Charles Eames said, “Innovate as a last resort.”
- Invisible triggers
	- Manual triggers can also be invisible — there might be no label or affordance to let the user know there’s a micro-interaction to be triggered. Invisible triggers are often sensor-based, made possible via touchscreens, cameras, microphones, and other sensors such as accelerometers (as in Figure 2-5).
	- Voice input is another example of an invisible control. There are three kinds of voice controls:
	- Always listening
	- Dialogue
	- Combined with a control
	- Gestural controls such as hand waves to turn something on, or a shake to shuffle are also often invisible.
	- Making everything visible and discoverable will often mean an incredibly cluttered, complicated, and not easily scannable screen. Hiding items makes the screen or object visually simpler, while not jettisoning functionality (Figure 2-8). Invisible controls allow for an emphasis on what is visible, and creates a hierarchy of what’s important.
	- Invisible triggers should be learnable.
- Control states
	- when designing a trigger, you should consider them:
	- Default The idle state when there is no activity.
	- Active If there is an activity working in the background — for example, downloading an update or syncing — the trigger could be used to indicate that.
	- Hover Can be used to bring up a tool-tip-style description, expand the size of the trigger to reveal more controls or form fields, or simply indicate that an item is clickable. Even more useful, a hover can display a piece of data that is contained within the micro-interaction
	- Rollover Often used to indicate presence or activity, or just an added indicator that the cursor is positioned correctly to engage (see Figure 2-11).
	- On click/tap/in process
	- What happens when the trigger is clicked, tapped, or begun. This can mean the trigger disappears, opens, changes color, or becomes a progress indicator as the micro-interaction loads
	- Toggle Switches and buttons can indicate their current setting (left/right, up/down, or pressed/unpressed, respectively).
	- Setting Dials, switches, and sliders can show what setting or stage the micro-interaction is currently at
	- These indicators of state are usually the trigger itself — the trigger changes its appearance or animates — but it can also be an indicator light such as an LED positioned near the trigger.
- Labels
	- The purpose of a label is clarity: is what I’m about to do the thing I want to be doing? Labels put a name on an action and create understanding where there could otherwise be ambiguity.
	- The seventh principle of manual triggers is to add a label only if it provides information that the trigger itself cannot.
	- In general, labels need to be short yet descriptive and in clear language. “Submit” as a button label may be short, but it doesn’t clearly indicate in nontechnical language what action the user is about to take. In micro-interactions, specificity matters. Being vague is the enemy of a good label. Be specific.
	- Consistency is also important. Since labels can be names, be sure you title anything you’re labeling (the micro-interaction, a state, a setting, a piece of data) the same name throughout the micro-interaction. Don’t call it an “alert” in one part of the micro-interaction and a “warning” in another part.
	- The best way to ensure that your labels are successful is to write them in the language of those who will use it. If you’re using technical terms, your audience had best be technical as well; otherwise, use casual, plain language.

### System Triggers
- System triggers are those that engage when certain condition(s) are met without any conscious intervention by the user,
- These common conditions that can initiate a trigger:
- Errors When a system encounters an error, it often addresses the problem via a micro-interaction, such as asking what to do or simply indicating something untoward has happened
- Location Location can be on many scales: from within a country, to a particular city or neighborhood, to a particular part of a room. A user in any of these settings can cause a micro-interaction to fire.
- Incoming data Email, status messages, software updates, weather, brightness, and a host of other data that enter networked devices and apps can be triggers for micro-interactions such as “You’ve Got Mail!” alerts.
- Internal data Likewise internal data such as time and system resources can be triggers (see Figure 2-22). An example is dimming the screen after a set amount of time.
- Other micro-interactions One particular kind of system trigger is when one micro-interaction triggers another. A simple example of this is a wizard-style interface. The end of step one (a micro-interaction) is the trigger for step two (another micro-interaction), and so on.
- Every system-initiated trigger should have some manual means of managing or disabling it. Ideally, this is at the point of instantiation, when the micro-interaction has been triggered (“Stop showing me these alerts”), but at a minimum in a settings area.
- System Trigger Rules
- System trigger rules should answer the following questions:
	- How frequently should this trigger initiate? 
	- What data about the user is already known? How could that be used to make this trigger more effective, more pleasurable, or more customized? For example, knowing it is the middle of the night could reduce the number of times the system trigger initiates.
	- Is there any indicator the trigger has initiated? Is there a visible state change while this is happening? After it’s happened? When it is about to happen? 
	- What happens when there is a system error (e.g., no network connection, no data available)? Stop trying, or try again? If the latter, what is the delay until trying again?

---