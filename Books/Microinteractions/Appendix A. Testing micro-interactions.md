# [[02. Index – Microinteractions]]

---

# Appendix A. Testing micro-interactions

>[!AI Summary]
>When testing micro-interactions, it is crucial to validate four key aspects. First, ensure the interaction serves its actual purpose rather than just being a process step. For example, a status message exists to communicate, not just to be typed. Second, determine what data is important to bring forward and how contextual information can enhance the experience. Third, check that all microcopy, including labels and instructional text, is clear and necessary. Lastly, evaluate timing and flow—interactions should be neither too long nor too short.
>
>Observational insights can reveal usability issues, such as excessive effort, unclear feedback, or missing actions. If users appear confused or struggle to find what they need, adjustments may be required.
>
>Quantitative testing should measure completion rates, time taken, errors, and user satisfaction. A structured testing process includes pre-test inquiries, unassisted use, guided walkthroughs, and final feedback to refine the interaction for better usability.

### What to Look for During Testing
- The four most important things to validate with testing are these:
	- That you truly understand the goal of the micro-interaction, and not just a step in the process. The point of setting a status message isn’t to type, it’s to communicate. Knowing this allows you to fix any emphasis problems, either in the micro-interaction itself or in the overall product — how important is this micro-interaction to the overall user experience? 
	- That you understand what data is important. This lets you know what data to bring forward and what behavioral-contextual information is valuable to the micro-interaction and could be used over time. 
	- That any microcopy is necessary, and if so, that it’s clear and understood. This means both instructional copy and, especially, labels. 
	- Timing and flow. Does the micro-interaction take too long to perform? Are the loops too long? Too short? Note that long loops that happen over extended periods of time are difficult to test, unless you are doing a longitudinal study, which most developers do not.
- But there are many more things to be learned by observation as well, such as:
	- Are there too many clicks/taps/control presses? In other words, is what the user’s trying to do requiring too much effort? This is not necessarily saying count clicks, although that is one measure of effort. 
	- Any confusion as to why. If a user ever says (aloud or via frowning/puzzled looks) “Why am I doing this?” then something is wrong. Usually a label is misnamed, or instructional copy is missing or too vague. 
	- What just happened? This is an indicator of unclear feedback, possibly paired with an unclear label. 
	- Did anything just happen? There is either missing feedback or else the feedback is too subtle. 
	- I can’t find what I’m looking for. There is a gap between what the user expects to find and what is there. This is probably a labeling problem, but it could also be that a crucial piece of the micro-interaction is missing. 
	- I don’t know where I am. This can be a problem with transitions or modes. 
	- You just did what to my data/content/input? This is another case where expectations didn’t match the outcome. Either adjust the label or copy, or else this is a deeper, overall problem with the micro-interaction in that it might not match what users are trying to accomplish, or else users are uncomfortable with what it does accomplish. 
	- If I click/push/tap this, what happens? This is a case of an unclear label or poor instructional copy. 
	- I didn’t see that button. This is a problem with visual hierarchy. The path through the micro-interaction isn’t visually clear. 
	- I didn’t know I could do that. An action is too hidden. This often happens with any multitouch gestures or an invisible trigger such as a key command.
	- What do I do now? This is the same problem as above: the path isn’t clear, especially the next step.
	- What am I seeing there? This is the result of unclear feedback, usually on a process. Add or clarify with a label, perhaps on a tooltip. This could also mean the data you’re showing isn’t important.

### Using Quantitative Data
- These are some data points you can test: 
	- Completion rate 
		- What percent of users were able to complete the micro-interaction? 
	- Overall duration of the micro-interaction 
		- How long did it take to complete the micro-interaction? (It’s often the case that the slowest users can take five to ten times longer to complete tasks than the fastest, so use a geometric mean instead of the median to lessen the effect of this type of extreme value. 
	- Duration of specific steps 
	- Number of steps 
	- Number of clicks/taps/selects 
		- This is not always instructive but can let you know if something is inefficient. 
	- Number of system errors 
		- Are there places where the micro-interaction fails through no fault of the user? (These are often found when testing on live micro-interactions with actual data/connectivity.) 
	- Number of human errors 
		- These fall into two categories: slips and mistakes. Slips are when the user understands the goal of the action but does something improperly, such as making a typo when entering an email address. A mistake is when a user does not understand the rules and tries something the rules won’t allow, such as clicking a header that isn’t interactive.
- You can also attempt to quantify qualitative data such as by having users rate characteristics like: Satisfaction Difficulty Confidence Usefulness on a rated scale (e.g., 1–7, 1 being low, 7 high). However, especially with a small sample size, this can be far from definitive.

### A Process for Testing micro-interactions
- The following is one possible process for testing micro-interactions that could be followed. It is certainly not the only process, but it could be a starting point: 
	- Before showing participants any prototypes, ask them how they expect the micro-interaction to work. Ask if they’ve ever used anything similar in the past. Ask what the one thing is that they want to accomplish by using this micro-interaction. Check if there is anything they would want to know before using the micro-interaction — if there is one piece of information that would make using the micro-interaction unnecessary. 
	- Have them use the micro-interaction unaided. Any quantitative data should be collected at this point, and/or immediately after. 
	- Go through the micro-interaction with the user step by step, having the participant talk out loud about any impressions and decisions. See if participants can explain how the micro-interaction works (the rules). Note any discrepancies. 
	- Ask if they came back tomorrow, what would they want the micro-interaction to remember about them. 
	- End by asking what one thing should be fixed.


---

### Related: