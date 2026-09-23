# [[02. Index – Microinteractions]]

---

# Chapter 6. Putting It All Together

>[! AI Summary]
>Prototyping and documenting micro-interactions is essential for conveying ideas clearly. Prototyping on the platform is ideal but time-consuming, while movies (either video or animations like HTML5) are fast ways to show timing and flow. Frame-by-frame storyboards can also be helpful to convey movement and context, even though they lack timing details. Often, a mix of these methods is best for capturing different aspects—prototypes for timing, storyboards for context, and wireframes for key rules.
>
>Micro-interactions don’t exist in isolation. They’re often part of a larger feature, so understanding their relationship within the feature is key. For example, does a micro-interaction launch, control, appear within, or end a feature? Additionally, micro-interactions can trigger other micro-interactions in a "daisy chain" effect, where one triggers another.
>
>To ensure a micro-interaction fits into the broader experience, consider how it interacts with other micro-interactions before designing. If a micro-interaction feels dull, reflect on several questions to improve it:
> - Should it be memorable or a signature moment?
> - What do you know about the user and context to improve it?
> - How can you bring important data to the forefront?
> - Is a custom control or shortcut appropriate?
> - How can you prevent user errors?
> - Can you add feedback channels like sound or haptics?
> - How can animation or transitions improve the experience?
> - What happens when the user returns to it after repeated use?

### Prototyping and Documenting micro-interactions
- The reason to document and prototype any product is to communicate an idea: this is how it could (or should) work.
- There are a number of ways to accomplish this goal:
- Prototype on the platform. If you have technical skills or access to them, prototyping on the platform where the micro-interaction will live is probably the best way to really understand how the micro-interaction will work. However, it is also likely the most time-consuming way as well.
- Make a movie. Movies are fast ways to convey timing and flow. They can be actual movies with video (see Figure 6-5) and a post-production tool such as AfterEffects, or they can be animations, such as those created with HTML5.
- Create frame-by-frame storyboards. You can also show the micro-interaction as a set of linked storyboards (see Figure 6-6). While this doesn’t show timing exactly, it at least demonstrates a sense of movement and shows the different states in context.
- It often makes sense to use multiple methods to convey a micro-interaction: a prototype or movie to show timing, frame-by-frame storyboards for detail and context, and wireframes with keyframes to call out any complicated rules.

### Orchestrating micro-interactions
- Unless it’s a distinct app or device, micro-interactions seldom exist alone. More typically, they are found around, inside, or at the center of a larger feature,
- alone, the first action to take is to figure out what the relationship is between the micro-interaction and the feature. Does it launch it (logging in), control it (the pause button on a video player), appear inside it (a formatting tool), or end it (the off switch)?
- Turning micro-interactions into Features
- micro-interactions can also trigger other micro-interactions, so that there is a kind of “daisy chain” effect, where one micro-interaction can be the trigger for another, which is itself a trigger for another. For example, turning on a device or launching an app (a micro-interaction) could be the system trigger to check to see when the user last used the app.
- After crafting each micro-interaction, step back and make sure the piece you just made fits with the other micro-interactions.
- A method to guard against this happening is to note before starting to design a micro-interaction which other micro-interactions touch it.
- How to Fix a Dull micro-interaction
- Ask yourself a series of questions based on the principles outlined in this book:
	- Should this be a Signature Moment? In other words, how memorable should it be? The more memorable, the richer it can be in terms of controls (including custom controls) and feedback. 
	- Am I starting from zero? What do I know about the user or the context that would improve this micro-interaction? 
	- What is the most important piece of data inside this micro-interaction, and can I bring it forward? What does the user need to know at a glance? 
	- Would a custom control be appropriate? A custom piece of UI practically guarantees the micro-interaction will become more prominent. 
	- Am I preventing human errors? If there are any situations where a user can cause an error, what can you do to prevent that automatically? Am I using what is overlooked? Are there pieces of UI chrome or hardware that could be doing more? 
	- Can I make an invisible trigger for advanced users? Is there a place to make a hidden shortcut (via a gesture or a command key) to get deeper into the rules faster? 
	- Are the text and icons human? Does the microcopy sound like something another human would say out loud? Can you add a touch of humor? 
	- Can you add animation to make it less static? Could you have transitions between screens or states, or an (nonintrusive) indicator of what the next step would be? 
	- Can you add additional channels of feedback? Sound or haptics? 
	- Ask what happens when the user returns to the micro-interaction the second time. And the hundredth time. Figure out what the long loop could be.

---