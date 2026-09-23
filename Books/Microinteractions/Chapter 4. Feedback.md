# [[02. Index – Microinteractions]]

---

# Chapter 4. Feedback

>[! AI Summary]
>Feedback in micro-interactions shapes user experience by providing clarity and personality. Effective feedback should be intuitive, timely, and meaningful, ensuring users understand what is happening without being overwhelmed.
>
>Feedback occurs when users trigger actions, system states change, or errors arise. It can be visual, audible, or haptic, depending on the hardware. Designers should use appropriate formats, keeping feedback clear, concise, and placed near user interaction points.
>
>Animations enhance engagement by maintaining context, explaining actions, and improving perceived performance. Visual elements like progress bars, tooltips, and transitions provide subtle yet effective cues.
>
>Messages should be direct, avoiding anxiety-inducing terms like “error.” Audio feedback, including earcons and speech, must be purposeful and non-intrusive. Haptics offer additional cues, especially when visual or audio feedback is impractical.
>
>Designers must define feedback rules considering context, duration, intensity, and repetition. Thoughtful feedback ensures a seamless, intuitive, and engaging user experience.

- Slot machines teach us that feedback is extremely powerful and can make or break a micro-interaction.
- lesson is the same: feedback provides the character, the personality, of the micro-interaction.

### Feedback Illuminates the Rules
- Along with the affordances of the trigger, feedback should let users know what they can and cannot do with the micro-interaction.
- The first principle of feedback for micro-interactions is to not overburden users with feedback.
- Feedback should be driven by need: what does the user need to know and when (how often)? Then it is up to the designer to determine what format that feedback should take: visual, audible, or haptic, or some combination thereof.
- Feedback should occur:
- Immediately after a manual trigger or following/during a manual adjustment of a rule. All user-initiated actions should be accompanied by a system acknowledgment (see Figure 4-6). Pushing a button should indicate what happened.
- On any system-initiated triggers in which the state of the micro-interaction (or the surrounding feature) has changed significantly.
- An example is an email client checking to see if there are new messages. Users might not need to know every time it checks, but will want to know when there are new messages.
- Whenever a user reaches the edge (or beyond) of a rule.
- when a user enters a wrong value (e.g., a password) into a field. Another example is reaching the bottom of a scrolling list when there are no more items to display.
- Whenever the system cannot execute a command.
- Showing progress on any critical process, particularly if that process will take a long time. If your micro-interaction is about uploading or downloading, for example, it would be appropriate to estimate duration of the process
- Feedback could occur:
- At the beginning or end of a process. For example, after an item has finished downloading. At the beginning or end of a mode or when switching between modes.

#### Feedback Is for Humans
- For micro-interactions, that message is usually one of the following: Something has happened You did something A process has started A process has ended A process is ongoing You can’t do that
- The kind of feedback you can provide depends entirely upon the type of hardware the micro-interaction is on. On a mobile phone, you might have visual, audible, and haptic feedback possible. On a piece of consumer electronics, feedback could only be visual, in the form of LEDs.
- Once we move past actual words — and let’s not forget that a substantial portion of the planet’s population is illiterate: 793 million adults, according to the Central Intelligence Agency — we have to convey messages via other means: sound, iconography, images, light, and haptics.
- The second principle of feedback is that the best feedback is never arbitrary: it always exists to convey a message that helps users, and there is a deep connection between the action causing the feedback and the feedback itself.
- Arbitrary feedback makes it harder to connect actions to results, and thus harder for users to understand what is happening.

#### Less Is More
- The third principle for micro-interactions feedback is to convey the most with the least.
- The more important the feedback is, the more prominent (and multichannel) it should be.
- The fourth principle of feedback is to use the overlooked as a means of message delivery.
- Many micro-interactions contain conventional parts of any interface — as they should. These overlooked parts of the UI — scrollbars, cursors, progress bars, tooltips/hovers, etc. — can be used for feedback delivery.
- For example, a cursor could change color to gray if the user is rolling over an inactive button.

### Feedback as a Personality-Delivery Mechanism
- Feedback can be the moment to inject a little edge or a touch of humor into your micro-interaction
- Designers can use this human tendency to our advantage by deliberately adding personality to products.
- errors or moments that could be frustrating for users such as a long download are the perfect place to show personality to relieve tension

### Feedback Methods

#### Visual
- most feedback is visual.
- Visual feedback can take many forms, from the blinking cursor that indicates where text should go, to text on a screen, to a glowing LED, to a transition between screens.
- Almost every user-initiated action (with the exception of actions users cannot do, such as clicking where there is no target) should be accompanied by visual feedback.
- Any visual feedback must add to clarity, not to clutter.
- Visual feedback should also ideally occur near or at the point of user input. Don’t have an error message appear at the top of the screen when the Submit button is on the bottom.
- If you need to place visual feedback away from the locus of attention, adding movement to it (e.g., having it fade in) can draw attention to it.
- Animation
	- tiny, brief animations can add interest and convey meaning if done well
	- The best animations communicate something to the user: about the structure of the micro-interaction, what to look at, what process is happening, etc.
	- Google’s Android engineers Chet Haase and Romain Guy have devised a set of UI characteristics for animation. Animations should be: Fast Do not delay the activity Smooth Stuttering or choppy movements ruin the effect and make the micro-interaction seem broken Natural They seemingly obey natural laws, such as gravity and inertia Simple Meaningful, understandable Purposeful Not just as eye candy
	- On this last point, designer and engineer Bill Scott outlines the reasons for using animation:
		- Maintaining context while changing views. Scrolling a list or a flipping through a carousel allows you see the previous and next items. 
		- Explaining what just happened. That poof of smoke means the item was deleted. 
		- Showing relationships between objects. For example, animating one item going into another at the end of a drag-and-drop. 
		- Focusing attention. As an item changes value, an animation can make that change more obvious. 
		- Improving perceived performance. Progress bars don’t decrease the time needed for a download to happen, but they do make the time seem less grating. 
		- Creating an illusion of virtual space. How (and where) panels slide in and out, for example. Transitions can be an important part of micro-interaction animations as users move from one state to another, or from one mode to another. Transitions help give a sense of location and navigation, letting users know where they are and where they are going to. 
		- Encouraging deeper engagement. Interesting animations invite interaction.
- Messages
	- Avoid words like “error” and “warning” that provide no information and serve to only increase anxiety.
	- Feedback text for any error messages should not only indicate what the error was, but also how to correct it.
	- would even provide a mechanism for correcting the error alongside the message. For example, don’t tell a user only that an entered password is wrong, provide the form field to re-enter it and/or a means of retrieving it.
	- While any text should be direct (and human), it’s best to avoid using personal pronouns such as “you.” “You entered the wrong password” is far more accusatory and off-putting than “Password incorrect.”

#### Audio
- audio can be particularly useful on devices with no screens, or as part of micro-interactions that work in the background when the user isn’t fully paying attention to them. It can also be useful in situations where looking at a screen can be unsafe, such as while driving.
- In general, there are two ways to use audible feedback: for emphasis and for alerts.
- Audio for emphasis is typically for reinforcing a user-initiated action, as a confirmation that what the user thought happened actually did. Clicking a button and hearing a click is an example.
- The other kind of audio feedback — alerts — are typically indicators of system-initiated actions: a process has ended, a condition has changed, or something is wrong. A voice telling you to turn left in a navigation app is an example of an audio alert.
- Any audio cue for a micro-interaction should pass the Foghorn Test: is this action important enough that users would want to become aware of it when they cannot see it? Even if you think the answer is yes, you should possibly provide a mechanism to turn the sound off.
- Earcons
	- There are two kinds of audio feedback: earcons and words.
	- Earcons — a play on the word “icons” (“eye-cons”) — are short, distinct sounds meant to convey information.[
	- Words are recorded (spoken) or computer-generated text. Words are particularly useful for instructions or directions, although if your product has to be in many languages, localization of the text could be nontrivial.
	- For micro-interactions, the best earcons are those that users (consciously or unconsciously) can relate to other sounds they have heard and make associations. For example, the click of a latch closing can be the earcon for the micro-interaction ending, or an upward whoosh can accompany an item moving to the top of a list.
	- If you want your earcon to be iconic and memorable (a Signature Sound), it should contain two to four pitches (notes) played in succession. As you don’t necessarily want your micro-interaction to be memorable, this trick should be used only once per micro-interaction, if at all. Most micro-interaction earcons should be a single-pitch sound, played once. Beware of playing any earcon in a loop, as even the softest, gentlest sound can be irritating played over and over and over.
	- Just as you want to avoid using the same visual feedback for different actions, you shouldn’t use the same — or even similar-sounding — earcons for dissimilar events.
- Speech
	- If you’re going to use words as audio feedback, keep the spoken message brief and clear.
	- With speech, your choice is to use actors to record the messages, or to use text-to-speech (TTS).
	- The minus is that any time you change the message, it has to be rerecorded.

#### Haptics
- Haptics, or as they are technically known, “vibrotactile feedback.”
- Compared to the decades of visual and audio feedback, haptics is relatively new, with the majority of people only having experienced it with the advent of pagers and mobile phones.
- Faces and hands (particularly fingertips) are the most sensitive to haptics, while legs and torso are much less so.
- There are four kinds of fibers known as mechanoreceptors that convey cutaneous sense, each of which can detect different frequencies.
- One researcher claims the amount of information we can get from touch is 1% that of hearing. Most people can only easily detect three or four levels of vibration. Thus, complex messages are not readily conveyed with haptics.
- Haptics have three main uses for micro-interaction feedback. The first is to enhance a physical action, such as by simulating the press of a button on a touchscreen, or by giving an added jolt when the ringer of your phone is turned off. The second (and currently most common) use of haptics is as an alert when audio isn’t available or is undesirable. The vehicle-initiated vibration of the steering wheel to wake a sleepy driver is an example of this use. The third (and thus far rarest) use is to create an artificial texture or friction on surfaces such as touchscreens. This can be used to slow down scrolling, for instance.

### Feedback Rules
- Feedback rules define: Contextual Changes Does the feedback change based on the known context? For instance, if it is night, does the volume increase? Decrease? Duration How long does the feedback last? What dismisses it? Intensity How bright/fast/loud/vibrating is the effect? Is it ambient or noticeable? Does the intensity grow in time, or remain constant? Repetition Does the feedback repeat? How often? Does the effect remain forever, or just for a few seconds?

---