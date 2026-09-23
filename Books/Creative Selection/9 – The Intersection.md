# [[Creative Selection – by Ken Kocienda]]

---

# 9 – The Intersection

>[!AI Summary]
>Apple's success in creating exceptional products like the iPhone stems from the intersection of technology and liberal arts, as Steve Jobs often emphasized. This philosophy shaped their approach to product design, aiming for advanced technology that's intuitive and enjoyable for users.
>
>One key challenge was determining the ideal size for tap targets on the iPhone screen, which led to the discovery that 57 pixels square provided optimal accuracy for taps. The team also focused on reducing cognitive load for users, simplifying interactions to make the iPhone intuitive and faster to use. For instance, removing the suggestion bar above the keyboard improved typing speed.
>
>The development process also combined algorithms and heuristics to refine interactions. Heuristics guided decisions based on user experience, while algorithms produced measurable results. This blend of creativity, experimentation, and feedback led to iterative improvements.
>
>Ultimately, Apple's success came from a small, dedicated team applying these principles through continuous creative selection, collaboration, and a commitment to excellence.

- up to something more. “The Intersection,” the title of this chapter, was an idea that helped us. It speaks to the way Apple valued expertise in both technology and liberal arts.
- Steve Jobs told everyone what he thought about this topic himself, on stage, during the keynote presentation to announce the original iPad: The reason that Apple is able to create products like the iPad is because we’ve always tried to be at the intersection of technology and liberal arts, to be able to get the best of both, to make extremely advanced products from a technology point of view, but also have them be intuitive, easy to use, fun to use, so that they really fit the users. The users don’t have to come to them, they come to the user.

#### The First-Ever iPhone Game Was Serious Fun ^d67500
- we started asking each other the same “big” question: How large should we make objects on the screen so they’re easy to tap?
- Tap targets needed to be small enough so that a single screen displayed enough content to be useful but large enough that you could confidently tap what you wanted.
- SpringBoard, the program that displayed the home screen icons.
- their differing user experiences provided us with proof early on in our development process that one of the most important user interactions for the iPhone rested on this question: What’s the best size for a home screen icon?
- Scott Herz, one of my Purple teammates, soon gave us the answer. He wrote an app and circulated it around the Purple team.
- The app launched showing a very large Start button. After tapping that button, the screen would go blank for a moment, then a box would appear somewhere on the display. The goal was to tap the box. After you tapped, whether you succeeded or failed, and after another momentary blank, another box would appear somewhere else. Only this next box would be a different size, maybe larger, maybe smaller. Tap the box. Tap the box. Tap the box.
- Behind the scenes, the software tracked the sizes of the boxes and their location.
- The results of Scott’s game showed that if we placed a box on the screen that was fifty-seven pixels square, then we could put it at any location—high, low, left, or right. If we did that, then everybody could tap the box comfortably, with near 100 percent accuracy.
- The tap targets for home screen icons on the original iPhone were fifty-seven pixels square.

#### Smooth
- One of the key concepts of the iPhone user interface is direct manipulation. This idea refers to giving software objects some of the same attributes and behaviors as physical objects, enabling people to interact with digital bits as if they were real-world items.
- Here’s an example. Picture yourself sitting in an office. You have two objects on your desk, a piece of paper and a manila file folder. If you want to put the paper into the folder, you reach out with your hand, pick up the paper, and move it into the folder, perhaps tipping the folder open a little as you do so to make the filing go more smoothly.
- Back in the 1980s, Apple had helped to change this with the Macintosh. The graphical user interface of the Mac, with its mouse and icons, offered a more direct experience.
- Interacting with an object meant moving the mouse to the object you wanted. Picking it up was done with a click and hold on the mouse button, a gesture that evoked grasping the object with your hand. Dropping the object into a folder meant moving the object on top of an icon of a folder and releasing the mouse button.
- All these conventions made computing friendlier, and they helped to introduce the concept of direct manipulation: You could see icons on the screen that represented the objects available to interact with, and you could point at them with the mouse.
- Apple didn’t invent direct manipulation—a computer scientist named Ben Shneiderman did in 1982
- Imran Chaudhri was one of these early multitouch proponents, and he helped to supply the design inspiration that transformed this new technology into a product.

#### Lightening the Load
- mental load. It’s a fact that our working memory has hard limits, and there has been decades of study to understand the bounds of our cognitive capabilities, extending back to the psychology paper titled The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information, published by George A. Miller of Harvard University in 1956. ^dc0e60
- He found we can hold only around seven items in our working memories at once.
- Trying to handle more than sevenish things in our minds simultaneously requires us to start making chunks or, as Miller puts it, to create “groups of items that go together.” ^80cdf2
- However, if we can’t free up slots in our mind by making chunks when a lot of information is coming at us, we become overloaded, and once our working memory is filled, we begin to make more errors and less accurate judgments. Our ability to function falls off fast.
- To make products more approachable, designers must lighten the load on people trying to use the things they make. Even small simplifications make a difference.
- in November, about six weeks before Steve Jobs stepped on stage to announce the iPhone to everyone, Scott Forstall told me to ditch the suggestion bar, the horizontal area immediately above the keyboard that displayed three or four tappable words the autocorrection system thought you might be trying to type.
- Scott considered the number of places a person might look while typing—around the blinking insertion point was one place, and focusing attention on fingers or thumbs to tap the keyboard itself was a second place. Having the suggestion bar created a third place to look—one too many.
- For the release of the original iPhone, we removed the suggestion bar from above the keyboard. After that, autocorrections only appeared right under the word with the insertion point in it.
- our user tests showed that removing the suggestion bar actually led to a small but statistically significant increase in typing speed.
- Warp: You might think that when you tap the iPhone screen, the tip of your finger touches the screen, but that isn’t so. Given the curved shape of our fingertips, the point of impact is actually lower, and it’s this spot on your finger that contacts the touchscreen first. The software modifies the geometry of your actual touch points, shifting or warping them upward to account for this difference, giving you a sense that your touch targeting is right on.
- The distance between the perception and actual lines may not seem like a lot, but if the software didn’t warp touches, it would feel like the touchscreen isn’t accurate.
	- **Charged Buttons:** The actual geometry for the back button in the top navigation bar is too small to tap comfortably, so the button is charged, which means the active area the software recognizes for tapping is larger than the visual area for the button.
	- **Child’s Play:** The original slide-to-unlock feature helped to prevent you from unintentionally activating features when the phone was in your pocket or bag, and the slider-and-channel user interface to unlock was sufficiently intuitive that when Imran handed an iPhone to his daughter for the first time—she was about three years old—she looked at the screen for a moment and, with no prompting other than what the software showed her, she slid the control and unlocked the phone. No problem.
	- **Can’t Miss:** Tapping within the keyboard rectangle always resulted in a key activation. Since the keys do not touch each other, either visually or at the software level, it was possible to tap within the bounds of the keyboard but not hit a key. However, I decided that if a typist tapped on the keyboard, the goal was to type, so I always gave a result. In the case of a miss, I activated the geometrically closest key to the tap.
- the physical home button had a comforting secondary role as an always-present escape hatch for people who got lost or confused in an app,
- We used the word “heuristics” to describe aspects of software development that tip toward the liberal arts.
- Its counterpart, “algorithms,” was its alter ego on the technical side.
- Algorithms produce quantifiable results, where progress is defined by measurements moving in a predetermined direction,
- Heuristics also have a measurement or value associated with them—the duration for an animation or the red-green-blue values for an onscreen color, but there isn’t a similar “arrow of improvement” that always points the same way.
- Unlike evaluating algorithms, heuristics are harder to nail down. For instance, how quickly should a scrolling list glide to a stop after you’ve flicked it?
- How long should it take for an app icon to animate up from its place on the home screen to fill the entire display? How far should you have to drag your finger on the screen for it to be possible to interpret the touch as a swipe gesture? How much should a two-finger pinch gesture allow you to zoom in on an image in the Photos app? The answers to all of these questions were numbers,
- The values themselves weren’t provably better in any engineering sense. Rather, the numbers represented sensible defaults, or pleasing effects, or a way to give people what they meant rather than what they did.
- It takes effort to find what these things are, which is appropriate, since the etymological root of “heuristic” is eureka, which (of course) comes from the Greek and means “to find.”
- Google used an A/B test to make a color choice. It used a single predetermined value criterion and defined it like so: The best shade of blue is the one that people clicked most often in the test. This is an algorithm.
- Other times we chained algorithms and heuristics together. The output from a heuristic often became the input to an algorithm whose output, in turn, became the input to the next heuristic. For example, swiping to the left to see the next image in the Photos app started with using your finger movement to make a judgment call for whether the swipe should go to the next photo or stay on the current one (a heuristic), which fed into animation code to move the photo display to a specific geometric position to center the next photo (an algorithm) starting from a certain speed, given how fast you swiped (another algorithm), and eased the photo to a gentle stop using a carefully designed animation timing (a heuristic).
- Why do some products, like the iPhone, turn out as well as they do? I’m now ready to offer my complete answer. It comes in three parts.
- The first part is the demo-making creative selection process.
- When we got an idea, we cobbled together a first cut on the algorithms and heuristics we would need to illustrate it. Then we pulled together the supporting resources—code, graphics, animations, sounds, icons, and more—to produce a demo.
- After we showed the demo and shared some feedback with each other, we made decisions about changes that might be an improvement.
- the concrete and specific modifications we chose to make led to the action items that justified making the next demo. Repeat, then repeat again.
- The second part of my answer goes back to the introduction, where I first mentioned the seven essential elements of the Apple development approach.
- This brings me to the third part of my answer. After creative selection and the seven essential elements, we needed one more intersection to make great work: a combination of people and commitment.
- In my experience, this manner of culture formation works best when the groups and teams remain small, when the interpersonal interactions are habitual and rich rather than occasional and fleeting.
- Ten people edited code on the Safari project before we made the initial beta announcement of the software, and twenty-five people are listed as inventors on the ’949 Patent for the iPhone.
- So, here’s my take on the Apple Way, our recipe for making software for products like Safari, WebKit, iPhone, and iPad, my explanation for how we made great products: A small group of people built a work culture based on applying the seven essential elements through an ongoing process of creative selection.
- Expanded out, it reads like this: A small group of passionate, talented, imaginative, ingenious, ever-curious people built a work culture based on applying their inspiration and collaboration with diligence, craft, decisiveness, taste, and empathy and, through a lengthy progression of demo-feedback sessions, repeatedly tuned and optimized heuristics and algorithms, persisted through doubts and setbacks, selected the most promising bits of progress at every step, all with the goal of creating the best products possible.

---