# [[02. Index – Microinteractions]]

---

# Chapter 1. Designing Micro-interactions

>[! AI Summary]
>Micro-interactions are small, focused moments in a product that enhance usability and create a seamless user experience. Unlike complex features, they are simple, brief, and nearly effortless—such as adjusting volume or turning a setting on and off. Thoughtful micro-interactions can distinguish a product users love from one they merely tolerate.
>
>The history of micro-interactions dates back to innovations like cut-and-paste functionality and scrolling. As interfaces evolved, micro-interactions became more refined, incorporating intuitive triggers, clear feedback, and contextual automation. For example, Apple’s iPhone mute switch silences calls but allows alarms, following a rule designed for user intent.
>
>Micro-interactions can be integrated in three ways: refining each one individually, designing entire products around them, or viewing a product as a collection of micro-interactions working together. Attention to these details, as Dieter Rams emphasized, defines quality and ultimately shapes user experience.

- As the New York Times reported in January 2012, Patron X had just gotten the iPhone the day before; his company had replaced his Blackberry for it. Before the performance began, he had flipped the mute switch, turning silent mode on. But what he didn’t know was that one of the iPhone’s rules was that alarms still go off even when the phone is silenced. So when the alarm went off, he didn’t even realize it was his phone for an excruciatingly long time. By the time he knew it was his phone and had turned the alarm off, it was too late: the performance was ruined.
- Andy Ihnatko wrote, “My philosophy is ‘It’s much better to be upset with yourself for having done something stupid than to be upset with a device that made the wrong decision on its own initiative.’”
- Apple’s own iOS Human Interface Guidelines gives its rationale for why muting the phone works the way it does: For example, in a theater users switch their devices to silent to avoid bothering other people in the theater. In this situation, users still want to be able to use apps on their devices, but they don’t want to be surprised by sounds they don’t expect or explicitly request, such as ringtones or new message sounds. The Ring/Silent (or Silent) switch does not silence sounds that result from user actions that are solely and explicitly intended to produce sound.
- A micro-interaction is a contained product moment that revolves around a single use case — a tiny piece of functionality that only does one thing.
- The difference between a product you love and a product you tolerate is often the micro-interactions you have with it.

### Micro-interactions Are Not Features ... But Still Matter
- Features tend to be complex (multiuse case), time consuming, and cognitively engaging. micro-interactions on the other hand are simple, brief, and should be nearly effortless.
- A music player is a feature; adjusting the volume is a micro-interaction inside that feature.
- micro-interactions are good for: Accomplishing a single task Connecting devices together Interacting with a single piece of data, such as a stock price or the temperature Controlling an ongoing process, such as changing the TV channel Adjusting a setting Viewing or creating a small piece of content, like a status message Turning a feature or function on or off

#### micro-interactions Can Be Big
- If the micro-interactions are poor, the main features, no matter how nicely done, are surrounded by pain and frustration.
- The design of your product is only as good as its smallest part.
- micro-interactions force designers to work simply, to focus on details. They challenge designers to see how lightweight they can design, to reduce complexity and streamline features that could otherwise be burdensome.

### The Secret History of micro-interactions
- In 1974, a young engineer named Larry Tesler began working on an application called Gypsy for the Xerox Alto computer. Gypsy was one of the first word-processing applications ever, and the successor to the groundbreaking Bravo, the first true WYSIWYG word-processing program and the first program that could have the ability to change fonts.
- Gypsy was a different kind of application altogether: it made use of a mouse and a graphical user interface (GUI). Larry’s mission — and what would become his rallying cry for decades to come — was to reduce the modality of the interface, so that users wouldn’t have to switch to a separate mode to perform actions. (His
- One of those functions was moving text from one part of the document to another. In Bravo (see Figure 1-9), users had to first select the destination, then press the “I” or “R” keys to enter Insert or Replace modes, then find and select the text to move, then finally press the Escape key to execute the copy. Larry knew there was a better way to perform this action, so he designed one that not only made use of the mouse, but radically simplified this micro-interaction. In Gypsy, the user could select a piece of text, press the “Copy” function key, then select the destination, and finally press the “Paste” function key. No mode required. And thus, cut and paste was born.
- Take scrolling, for instance. Bravo had a primitive version of scrolling, but scrolling really became more refined when Alan Kay, Adele Goldberg, and Dan Ingalls introduced scrollbars in another Xerox PARC product, SmallTalk, sometime between 1973 and 1976. SmallTalk’s scrolling could be smooth, pixel-by-pixel, instead of line-by-line.
- As documents got longer, scrollbars added arrows to jump to the end without scrolling. Tooltip-style indicators would appear to indicate where you were in the document. But the real change came with touchscreen technology on trackpads and mobile devices. Do you slide up or down to scroll down? Apple famously changed directions (from down to up) in OS X Lion after the introduction of its iPhones in order to align its laptops and mobile devices to “natural scrolling.” See, for example, “Apple’s Mousetrap: Why did Apple reverse the way we scroll up and down?” by Michael Agger in Slate. Apple has also (to the ire of many) hidden scrollbars except when scrolling is in process or the cursor nears the right edge of a scrollable window. The micro-interaction keeps evolving.
- As DeRouchey says in “The History of the Button”, “The button meant for the first time the result of the human motion could be completely different from the motion it creates itself.”
- Input methods are also drastically changing micro-interactions. Not only do we have physical controls like buttons, switches, keyboards, and mice, we also have touchscreens, sensors, voice, and gestural means of triggering micro-interactions.

### The Structure of micro-interactions
- These four parts — the trigger that initiates the micro-interaction, the rules that determine how the micro-interaction works, the feedback that illuminates the rules, and loops and modes, the meta rules that affect the micro-interaction — are a way to design and dissect micro-interactions.
- many micro-interactions begin with an understanding of user need: what the user wants to accomplish, when they want to do it, and how often.
- In our silencing-the-phone example, turning off the ringer is a very common action that users want to perform all the time, rapidly. Thus the trigger (the Ringer/Silent switch) is available all the time, instantly able to be turned on and off no matter what application is running. It was so important, it’s one of only five physical controls on the iPhone. Controls — digital and/or physical — are the most important part of user-initiated triggers. They provide not only the ability to engage with a micro-interaction (and sometimes the ability to adjust it while in progress), but also usually the visual affordance that the micro-interaction is even there (see Figure 1-14). If there were no ringer on/off switch on the iPhone, you might expect the phone had that functionality, but have to guess at where to find it. In many older mobile phones (and even in some phones still), silencing the phone was buried under several layers of a settings menu. Even for users who knew where the setting was, it took as much as 10 seconds to turn the ringer on or off. It takes less than a second to flip the physical Ringer/Silent switch.
- On Windows Phones, the trigger is a pressable rocker button (which also controls volume) that, when pressed, presents users with a screen overlay that lets users choose ringer status as “vibrate” or “ring + vibrate.”
- But triggers need not be user-initiated. Increasingly, triggers are system-initiated — when the device or application itself detects that certain conditions have been met and begins a micro-interaction.
- For silencing the phone, one could easily imagine that function integrating with your calendar, so that it automatically silences the phone whenever you’re in a meeting. Or by knowing your location, it automatically goes silent whenever you’re in a movie theater or symphony hall.
- As our applications and devices become more sensor-full and context-aware, the more ability they could have to make decisions on their own about how they operate.
- unless there is a specific piece of feedback (and we’ll get to that next), rules are themselves invisible.
- Anything you see, hear, or feel that helps you to understand the rules of the system is feedback, the third part of micro-interactions.
- Even more than with triggers, feedback is the place to express the personality of the product. Indeed, feedback could be said, along with the overall form, to completely define the product’s personality.
- Feedback can have its own rules as well, such as when to appear, how to change colors, how to rotate the screen when the user turns a tablet on its side. These rules may themselves become their own micro-interactions, as users might want to adjust them manually as a setting.

### Micro-interactions as a Philosophy
- There are three ways of incorporating micro-interactions into products.
	- The first is to think about them on a case-by-case basis. During the course of a design project or when simply refining your product, try to identify any possible micro-interactions. Make a list of them, then treat each as such. For each one, deliberately consider the structure as outlined in this book, and see if you can polish each individual component.
		- Signature Moments are those micro-interactions that are product differentiators.
		- A custom trigger control (such as the original iPod’s scroll wheel) or an elegant “loading” animation or a catchy sound (“You’ve Got Mail!”) can be marketed as though they are features and used cross-platform or in other products by the same organization.
		- The Like button on Facebook is now so well known that it’s part of the brand.
	- A second way to think about micro-interactions is to reduce more complex applications to individual products that are each built around one micro-interaction. This is micro-interactions as product strategy: your product does one thing and one thing well.
		- The “minimum viable product” can be one micro-interaction.
		- But there is a third way to think about micro-interactions, and that is that most complex digital products, broken down, are made up of dozens, if not hundreds, of micro-interactions. You can view a product as the result of all these micro-interactions working in harmony.
	- As Dieter Rams said: I have always had a soft spot in my heart for the details. I consider details more important than a great draft. Nothing works without details. Details are the essentials. The standard to measure quality by.

### Summary
- There are three ways of working with micro-interactions: look for them and focus on each individually, reduce a complicated feature to a core micro-interaction, or treat every feature as a set of linked micro-interactions.

---