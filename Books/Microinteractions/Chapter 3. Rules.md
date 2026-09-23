# [[02. Index – Microinteractions]]

---

# Chapter 3. Rules

>[! AI Summary]
>Micro-interactions should have clear, achievable goals that feel intuitive rather than requiring strict instructions. Users should naturally progress through actions without unnecessary friction.
>
>Rules define how triggers activate responses, control user interactions, sequence actions, and determine data usage. Objects within micro-interactions should dynamically change states, ensuring clarity and responsiveness.
>
>Constraints like input methods, data availability, and business limitations influence design choices. Using contextual data, designers can enhance interactions, reducing complexity and improving user experience.
>
>Limited options and smart defaults help users make decisions effortlessly. Controls should balance operational and perceived simplicity, depending on how frequently they are used.
>
>Error-proofing through thoughtful design prevents mistakes, reducing reliance on disruptive error messages. Microcopy, such as labels and instructions, should be concise and helpful.
>
>Algorithms shape interactions using sequences, conditions, repetitions, and variables. Transparency in algorithmic decisions empowers users to adjust parameters when needed, ensuring smooth, efficient digital experiences.

- Save As seems to have begun in the 1980s as Save a Copy as, which let users save a version as a new file without renaming.
- “Things which are different in order simply to be different are seldom better, but that which is made to be better is almost always different,” said Dieter Rams.[

### Designing Rules
- Perhaps the most important part of the rules is the goal. Before designing the rules, you need to determine in the simplest, clearest terms what the goal of the micro-interaction is.
- The best goals are those that are understandable (I know why I’m doing this) and achievable (I know I can do this).
- For example, the goal of a login micro-interaction isn’t to get users to enter their password; the goal is to get them logged in and into the application.
- Users shouldn’t feel like they have to follow — or worse, memorize — a strict set of instructions to achieve the goal. Instead, what you’re striving for is a feeling of naturalness, an inevitability, a flow.
- The rules determine: 
	- How the micro-interaction responds to the trigger being activated. What happens when the icon is clicked?
	- What control the user has (if any) over a micro-interaction in process. Can the user cancel a download, change the volume, or manually initiate what is usually an automatic process like checking for email? 
	- The sequence in which actions take place and the timing thereof. For example, before the Search button becomes active, users have to enter text into the search field. 
	- What data is being used and from where. Does the micro-interaction rely on geolocation? The weather? The time of day? A stock price? And if so, where is this information coming from? 
	- The configuration and parameters of any algorithms. While the rules in their entirety can be thought of algorithmically, often certain parts of a micro-interaction are driven by algorithms.
	- What feedback is delivered and when. The rules could indicate which “steps” should get feedback and which operate behind the scenes. 
	- What mode the micro-interaction is in. A mode is a fork in the rules that, when possible, should be avoided. But sometimes it’s necessary. For example, in many weather apps, entering the cities you want to know the weather for is a separate entry mode from the default mode of viewing the weather.
	- If the micro-interaction repeats and how often. Is the micro-interaction a one-time activity, or does it loop?
	- What happens when the micro-interaction ends. Does the micro-interaction switch to another micro-interaction? Does it vanish? Or does it never end?

#### Generating Rules
- Of course, rules can also benefit from being visualized. Sometimes a logic diagram can be useful
- A rules diagram can help you see the rules in a visual way, which can allow you to notice where actions get (overly) complex. It can also show errors in logic that might be hidden by text alone.

#### Verbs and Nouns
- It can be helpful to think of your entire micro-interaction as a sentence. The verbs are the actions that a user can engage in, while the nouns are the objects that enable those actions. For example, a slider enables the raising or lowering of volume. Verbs are what the users can do (raise or lower the volume), and nouns are what they do them with (the slider).
- Objects that behave differently should look differently.
- The Back button in Android is famous for being seemingly arbitrary about where it takes the user back to: sometimes previous modes, sometimes entirely different applications

#### Screens and States
- It’s much better to make use of state changes instead. In this way, we use progressive disclosure to reveal only what is necessary at that moment to make a decision or manipulate a control without loading an entirely new screen
- As the user steps through the rules, the objects (nouns) inside the micro-interaction can (and likely will) change to reflect those changes in time. Each of these is a state that should be designed.
- Any objects the user can interact with can have (at least) three states: An invitation/default state This is when the user first finds the object. This is also where prepopulated data can be deployed. Activated state What is the object doing while the user is interacting with it? Updated state What happens when the user stops interacting with the object?
- Let’s take a simple drag-and-drop as an example. An object’s initial/default state should look draggable. Or, barring that, the object (and/or the cursor) should have a hover state that indicates the object can be dragged. Then the object should likely have another state while being dragged. (It’s also possible the screen itself [another noun] at this point has a different state, indicating where the object could be dropped.) And finally, a state when it is at last dropped, which might be simply to return to the default state.

#### Constraints
- The rules have to take into account business, environmental, and technical constraints. These can include, but certainly aren’t limited to:
- What input and output methods are available. Is there a keyboard? A speaker? What is the type or range of any input. For example, the number of characters allowed in a password, or the maximum volume a user can turn the sound up to. What is expensive. Not just what costs money (such as access to certain data services, as in Figure 3-14), but also what is expensive from a resources standpoint. Perhaps doing a call to the server every 10 seconds would be a massive hit to the server load and drain the device battery too quickly. What kind of data is available. What can be collected from sensors? What services/APIs can we access to get information about location, news, weather, time, etc. What kind of data can be collected. What personal (behavioral) data can be collected and used?

#### Don’t Start from Zero
- After the trigger has been initiated, the first question for any micro-interaction should be: what do I know about the user and the context? You almost always know something, and that something can be used to improve the micro-interaction
- Some examples of data that could be used: 
	- What platform/device is being used 
	- The time of day 
	- The noise in the room 
	- How long since the micro-interaction was last used Is the user in a meeting Is the user alone 
	- The battery life 
	- The location and/or direction 
	- What the user has done in the past
- The point is to use the context and previous behavior (if any) to predict or enhance the micro-interaction

#### Absorb Complexity
- Tesler’s Law of the Conservation of Complexity. Tesler’s Law, briefly stated, says that all activities have an inherent complexity; there is a point beyond which you cannot simplify a process any further.
- For micro-interactions, you’re going to want to err on the side of removing control and having the micro-interaction handle most of the decision making. One caveat to this is that some micro-interactions are completely about giving control to the user, but even then there is likely to be complexity that the system should handle

### Limited Options and Smart Defaults
- The more options that you give a user, the more rules a micro-interaction has to have, and in general, fewer rules make for better, more understandable micro-interactions. This means limiting the choices you give to the user and instead presenting smart defaults.
- With micro-interactions, a good practice is to emphasize (or perform automatically) the next action the user is most likely to take. This emphasis can be can be done by removing any other options, or just by visual means (making the button large, for instance).
- Every option a user has is at least another rule, so the best way to keep your rules to a minimum is to limit options.
- If you are going to make a default decision for a user, in some instances there should be some indication of what that decision is.
- The most prominent default should be the action that most people do most of the time. Even if you decide that this shouldn’t be automatically done for the user, it should be visually prominent. The most common example of this are OK/Cancel buttons. Cancel is likely pressed considerably less often than OK, so OK should be more easily seen (larger and/or colored).
- If you have to present a choice to the user, remember that how you present that choice can affect what is chosen. Items at the top and bottom of a list are better recalled than those in the middle. A highlighted option is more often selected than one that is not.
- Meaningful choices affect how the user achieves the goal of the micro-interaction — or even what the goal is. An example of a meaningful choice might be to sign in via Facebook or to enter a username/password.
- Ask: is giving this choice to a user going to make the experience more interesting, valuable, or pleasurable? If the answer is no, leave it out.
- The elimination of choice should have one beneficial side effect: the removal of many possible edge cases.
- Edge cases are kryptonite for micro-interactions, and everything possible should be done to avoid them, including revising rules to make them impossible. For example, if a Year of Birth form field is a text box, it’s easy to put in invalid dates, such as those in the future. Remove this edge case by making the field a drop-down menu.

#### Controls and User Input
- With controls, the choice is between operational simplicity and perceived simplicity. Operational simplicity gives every command its own control. In our volume example, this is the three-button solution: one button for Make Louder, one button to Make Quieter, one button for Mute. With perceived simplicity, a single control does multiple actions. For volume, this would mean selecting the slider or scroll-wheel options.
- For micro-interactions that will be done repeatedly, err on the side of perceived simplicity, unless it is an action that needs to be done quickly and with no chance of error — for example, the Mute button on a conference phone; combining it with the Make Quieter action would probably be a disaster.
- For micro-interactions that will only be done once or occasionally, err on the side of operational simplicity; display all the options so that little to no foreknowledge is required.
- Text fields in particular need what system designers call requisite variety — the ability to survive under varied conditions. Often this means “fixing” input behind the scenes in code so that all the varied inputs conform to the format that the code/database needs

#### Preventing Errors
- micro-interactions should follow the Poka-Yoke (“mistake proofing”) Principle, which was created in the 1960s by Toyota’s legendary industrial engineer Shigeo Shingo. Poka-Yoke says that products and processes should be designed so that it’s impossible for users to commit an error because the product/process simply won’t allow one.
- One quick example of Poka-Yoke in action is Apple’s Lightning cable. Unlike their previous 30-pin connector (and every USB cord), the Lightning cable can be plugged into the iPhone’s or iPad’s port facing up or down.
- Ideally, your micro-interaction should be designed so that it does not present an error message when the user has done everything right (because the user shouldn’t be able to do anything wrong), and only presents an error message when the system itself cannot respond properly.
- Pop-up error alerts are the tool of the lazy.
- If an error does occur, the micro-interaction should do everything in its power to fix it first

### Microcopy
- Microcopy — labels, instructions, and other tiny pieces of text — is part of understanding the rules.
- Microcopy is a kind of fixed feedback or feedforward.
- The entirety of a micro-interaction can be a single piece of microcopy: look at Facebook’s Like “button,” which is based entirely on the word Like in blue text.
- A system trigger could cause an essential piece of microcopy to appear when it would be most helpful. For example, on a store’s Contact page, a “Sorry, we’re closed” message could appear beside the phone number during off hours. And that would be the entire micro-interaction right there!
- Never use instructional copy when a label will suffice. Tap Next to Continue is unnecessary if there is a button labeled Next or Continue.
- If a word doesn’t fit, consider an icon instead.
- Avoid labels that could be misinterpreted. On photo-sharing service Flickr, for instance, the two choices to navigate photos are ← Previous and Next →. However, Previous takes you to the next newer photo, while Next takes you to the next older photo
- The best place for most labels is above what is going to be manipulated. The second best place is on or in the object to be manipulated,
- Be careful putting a label inside a text form field. When it disappears (as it must because the user clicks into it to put text there), the user can forget what the field is for, and there is no easy way of going back short of clicking out of the text field. It’s better in some cases to put the label above (Toy Search) or on a button (Search for Toys) alongside, with examples (e.g., “board games, Lego, or dolls”) in the text form field itself.
- Be sure that any instructional copy matches the control exactly. For example, don’t have the instructions read, “Add items to your shopping cart,” then have the button say, Purchase Objects instead of Add Items.
- When possible, make text relational instead of exact, particularly dates and times. “Three hours ago” is much easier to understand than showing a date and time stamp, which causes users to make translations and calculations in their head as to when that was. (Of course, sometimes an exact date or time is necessary and shouldn’t be obscured.)
- Avoid double (or more!) negatives, unless your intention is to confuse or deliberately mislead people. “If you don’t want to unsubscribe to our email newsletter, don’t uncheck this box.”

### Algorithms
- At its core, an algorithm is a set of instructions to be carried out perfunctorily to achieve an ideal result. Information goes into a given algorithm, answers come out.
- There are four major parts to any algorithm:
- Sequence What are the steps in the process? What item comes before what? Are there any conditionals, where an action is dependent on a particular condition? For a device like the Nike FuelBand, this might be something like: for every two steps (as measured by an accelerometer in the hardware), add one to NikeFuel.
- Decisions These are usually in the form of if ... then statements. For example, if the time is 00:00, then reset.
- Repetitions How does the algorithm loop? This can be the whole algorithm, or just a particular sequence. For example, while the user is typing in the search field, update search results every time there is a new letter.
- Variables Variables are containers for the data that powers algorithms. Defining these will allow you to tweak the algorithm without having to rewrite it entirely. Number of Search Results could be a variable, as could Number of Steps Taken. Variables are numeric, alphabetic (text), or logical (true/false).
- let’s say a micro-interaction involves displaying music recommendations. The steps in the sequence are the kinds of music you want to show, and in what order. Are they all from one genre? Does new music take priority over old? Decisions might include: has the user ever listened to this artist before? If so, do not recommend. The algorithm might loop until all the recommendations are filled. And variables could be genre, artist, album, listened to, similar to, tempo, and a whole host of possible characteristics one could use to match music. Variables could also include values such as the percentage of new music to old, and the total number of recommendations to show.
- It can be helpful for users to know what data/variables are being acted upon in an algorithm, so that they can manually adjust them if possible.

---