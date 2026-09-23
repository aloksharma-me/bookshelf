# [[Creative Selection – by Ken Kocienda]]

---

# 8 – Convergence

>[!AI Summary]
>The final phase of product development at Apple, called "convergence," focused on fixing bugs and refining features before launch. A key challenge was creating an effective autocorrection system for the iPhone keyboard. The software needed to prioritize more common words and handle misspelled words intelligently. This was achieved by developing the "pattern skew algorithm," which adjusted for typing errors by considering neighboring keys and their frequency.
>
>In 2006, the team’s focus shifted to finalizing the software, using tools like Radar to track bugs. While convergence helped polish the product, it was the iterative process of demos, feedback, and creative selection that truly shaped the iPhone. This approach emphasized design over data-driven decisions, contrasting with methods like A/B testing used by companies like Google. Apple’s iterative, demo-driven approach allowed the team to refine their vision and create a product that felt cohesive and well-integrated. By January 2007, the iPhone was ready for launch, with the final autocorrection dictionary even adding the word “iPhone.”

- Convergence was the term we used to describe the final phase of making an Apple product, after the features had been locked down and the programming and design teams spent the last three or four months fixing bugs and polishing details.
- usage frequency value. This was a measure of the popularity of a word in normal text.
- The software had to know which words were more popular than others—for example, that it’s more likely for people to type “good” than “goof.” Hence, “good” had a higher usage frequency value than “goof.”
- We found we had to add a complete collection of hate speech to the dictionary and explicitly mark those words to prevent the software from ever offering them as autocorrections—imagine trying to type “nugget” but narrowly mistyping the first vowel or the last consonant.
- I started by imagining a picture of my single-letter QWERTY keyboard, and I made a guess about the way I might miss a key I was aiming for.
- I supposed that if I wanted to tap the G key but missed it to the left and tapped the F key instead, I probably meant G or F more often than I meant H. In other words, if I missed the exact key I was aiming for, the one I intended to tap was most likely the next closest key, not some other key farther away. I built the direction of these misses into my algorithm.
- During the keyboard derby, we learned that the visual of the key appearing under your finger when you tapped was the keyboard’s way of telling you what it saw. It was exactly the kind of feedback that can connect people and software.
- The stream of pop-ups let a person know the keyboard was following along, that it was listening.
- Touches to type the word “blog” form a key-tap constellation, a pattern of touches superimposed on top of the letters on the keyboard.
- gave a name to this operation of comparing patterns and summing nudges: the pattern skew algorithm. ^f3cbf8
- the autocorrection algorithm became this: Arrange typed keys in a set of tumblers with their neighboring keys. Spin the tumblers to check every letter combination. Note the dictionary words found by spinning the tumblers. Calculate the pattern skew for every found word. Multiply the usage frequency value for each found word with the reciprocal of its pattern skew. From all the found words, suggest the one with the greatest multiplied total of usage frequency and pattern skew.1 This was the final autocorrection algorithm.
- Time passed, and by the autumn of 2006, our Purple software started to converge. We were getting closer to a software system Apple could ship in a product.
- On the tenth of January 2007, the day after the big product introduction, I edited the autocorrection dictionary to add a new word: iPhone.
- We used a program called Radar to monitor our bugs, and this flexible, internally developed bug tracker was like our convergence Swiss Army knife.
- Don Melton often told a story about convergence at Netscape.
- Netscape’s engineering leaders knew that no sophisticated piece of software was ever truly devoid of defects.
- Instead, they shot for zarro boogs, an intentional mispronunciation of “zero bugs.” It was a humorous recognition that they were calling their project “finished” on the ship date,
- If convergence was the primary focus of the Purple team in the last few months before the iPhone was announced, does convergence methodology explain why the iPhone turned out so well?
- Bug squashing might help to make a decent product, but it’s not the secret for making a great one.
- Douglas Bowman, a designer with a résumé that includes stints at Twitter and Wired. He also started at Google in 2006, becoming one of its early visual design leaders.* Here’s how he justified his departure from the web search firm almost three years later: Without a person at (or near) the helm who thoroughly understands the principles and elements of Design, a company eventually runs out of reasons for design decisions . . . Without conviction, doubt creeps in. Instincts fail . . . When a company is filled with engineers, it turns to engineering to solve problems. Reduce each decision to a simple logic problem. Remove all subjectivity and just look at the data. Data in your favor? Ok, launch it. Data shows negative effects? Back to the drawing board. And that data eventually becomes a crutch for every decision . . . Yes, it’s true that a team at Google couldn’t decide between two blues, so they’re testing 41 shades between each blue to see which one performs better.3
- In this kind of test, commonly referred to in the high-tech industry as an A/B test, the choices are already laid out.
- In this Google pick-a-blue experiment, the result was always going to be one of those forty-one options.
- the opportunity cost of running all the trials meant there was less time available for everyone on the development team to dream up a design that people might like two, or three, or ten times more.
- A/B tests might be useful in finding a color that will get people to click a link more often, but it can’t produce a product that feels like a pleasing and integrated whole.
- Google factored out taste from its design process.
- As a whole, a succession of demos, feedback, and follow-up demos created a progression of variation and selection that shaped our products over time.
- I’ve given a name to this continuing progression of demo feedback next demo: creative selection. ^0d2004
- We always started small, with some inspiration. We made demos. We mixed in feedback. We listened to guidance from smart colleagues. We blended in variations. We honed our vision. We followed the initial demo with another and then another.
- We improved our demos in incremental steps. We evolved our work by slowly converging on better versions of the vision. Round after round of creative selection moved us step by step from the spark of an idea to a finished product.

---