- Title: [[Information Architecture for the World Wide Web]]
- Author: [[Peter Morville]], [[Louis Rosenfeld]]
- Goodreads: [Seinfeldia: How a Show About Nothing Changed Everything | Goodreads](https://www.goodreads.com/book/show/70132.Information_Architecture_for_the_World_Wide_Web)

---

### Key Ideas
- [[What is Information Architecture?]]
- [[19th and 20th century technology has evolved to manage information]]
- [[the problems that Information Architecture addresses]]
- [[How Information Architecture helps solve the problem of Information Overload and More Ways to Access Information]]
- [[Pervasive information architecture is one that is experienced across different platforms]]
- [[Basic concepts of Information Architecture]]

---

- [ ] The confusion and problems with Apple's music ecosystem across devices (Chapter 1)
- [x] Problems that IA address (Chapter 1)
- [x] How IA helps solve the problems defined above (Chapter 1)
- [x] All the definitions of IA (Chapter 2)
- [x] Defining the basic concepts of IA (Chapter 2)
	- Data, Information, Knowledge
	- Structure, Organisation, Labeling
	- Finding, Managing
	- Art and Science (relate this to heuristics and algorithms)
- [ ] How good IA is defined with users, content and context (explaining all these concepts, add the venn diagram) (Chapter 2)
		- Context
		- Content
		- Users
- [ ] Four common information needs (Chapter 3)
- [ ] Integration and Iteration (Chapter 3)
- [ ] Berry Picking, Pearl Growing and Two-Step approach (Chapter 3)

---

# Part 1 – Introducing Information Architecture
- Information architecture (IA) is a design discipline that is focused on making information findable and understandable.
- IA allows us to think about problems through two important perspectives: that information products and services are perceived by people as places made of information, and that these information environments can be organized for optimum findability and understandability.

---

## Chapter 1 – The Problems That Information Architecture Addresses
### Hello iTunes
- Originally a third-party application called SoundJam, iTunes was acquired by Apple in 2000 to become the default music player included with Macintosh computers.

### The Problems Information Architecture Addresses
#### Information Overload
- The phrase “information overload” was popularized by futurist Alvin Toffler in the 1970s.1 Toffler called out the increased rate and pace of information production, and the resulting reduction in the signal-to-noise ratio, as problems that we’d have to deal with in the future.
- The career of Richard Saul Wurman — originator of the term “information architect” — is based on using design to address information overload. His book Information Anxiety is considered a classic in the field.
- some of the great success stories of the early Web, such as Google and Yahoo!, were companies founded to help users find information online. ^561143

#### More Ways to Access Information
- there was a time when information existed in a tightly coupled relationship with the artifacts that conveyed that information.
- The result is that the information (e.g., the text of the book) is decoupled not only from the artifact that contains it (e.g., the paper book), but also from the contexts in which we access it (e.g., the quiet abbey library).
- Another important difference between physical media (like printed books) and their digital counterparts is that the latter are part of a system that can gather information about their usage, including highlights, annotations, and reading patterns, and provide additional functionality based on this metadata.
- Decoupling information from its physical containers has also made it cheaper to reproduce and distribute, and this in turn has made it more available to more people.

### Enter Information Architecture
- while most software applications are designed to solve very specific problems, the successful ones tend to outgrow their problem-set boundaries to encompass more and more functionality over time.
- What is needed is a systematic, comprehensive, holistic approach to structuring information in a way that makes it easy to find and understand — regardless of the context, channel, or medium the user employs to access it.

#### Places Made of Information
- we interact with these products and services through the use of language: labels, menus, descriptions, visual elements, content, and their relationships with one another create an environment that differentiates these experiences and facilitates understanding (or not!).
- In his book Understanding Context, information architect Andrew Hinton argues that we make sense of these experiences much like we do physical places: by picking up on particular words and images that define what can and can’t be done in the environment
- Digital experiences are new (and very real) types of places made of information; the design challenge lies in making them be coherent across multiple contexts.

#### Coherence Across Channels
- information architecture asks designers to define semantic structures that can be instantiated in multiple ways depending on the needs of different channels.
- pervasive information architecture — that is, one that is experienced across multiple channels and contexts.
- Consistency is the capability of a pervasive information architecture to serve the contexts it is designed for (internal consistency), and to preserve this logic across different media, environments, and uses (external consistency)...Consistency ^72b839
- In other words, when an organization serves its users via multiple channels, the users’ experiences across those channels should be consistent and familiar.

#### Systems Thinking
- information architecture is concerned with defining the semantic systems that the individual artifacts — apps, websites, voice interfaces, etc. — will be working within.
- Effective information environments strike a balance between structural coherence (high-level invariance) and suppleness (low-level flexibility), so well-designed information architectures consider both.

---

## Chapter 2. Defining Information Architecture
### Definitions
- Let’s start by clarifying what we mean by information architecture: ^99fc6b
	- The structural design of shared information environments 
	- The synthesis of organization, labeling, search, and navigation systems within digital, physical, and cross-channel ecosystems 
	- The art and science of shaping information products and experiences to support usability, findability, and understanding 
	- An emerging discipline and community of practice focused on bringing principles of design and architecture to the digital landscape
- Basic concepts of information architecture: ^99e993
	- **Information**
		- Data is facts and figures. Relational databases are highly structured and produce specific answers to specific questions.
		- Knowledge is the stuff in people’s heads. Knowledge managers develop tools, processes, and incentives to encourage people to share that stuff. Information exists in the messy middle.
		- With information systems, there’s often no single “right” answer to a given question. We’re concerned with information of all shapes and sizes: websites, documents, software applications, images, and more. We’re also concerned with metadata: terms used to describe and represent content objects such as documents, people, processes, and organizations.
	- **Structuring, organizing, and labeling**
		- Structuring involves determining the appropriate levels of granularity2 for the information “atoms” in your product or service, and deciding how to relate them to one another.
		- Organizing involves grouping those components into meaningful and distinctive categories, creating the right contexts for users to understand the environment they are in and what they’re looking at.
		- Labeling means figuring out what to call those categories and the navigation structure elements that lead to them.
	- **Finding and managing**
		- Findability is a critical success factor for overall usability. If users can’t find what they need through some combination of browsing, searching, and asking, then the system fails.
		- An information architecture must balance the needs of users with the goals of the business.
	- **Art and science**
		- Disciplines such as usability engineering and methodologies such as ethnography bring the rigor of the scientific method to the analysis of users’ needs and information-seeking behaviors. We’re increasingly able to study patterns of usage and subsequently make improvements to our websites.
		- But the practice of information architecture will never be reduced to numbers; there’s too much ambiguity and complexity. Information architects must rely on experience, intuition, and creativity. We must be willing to take risks and trust our intuition. This is the “art” of information architecture.

### Just Because You Can’t See It, Doesn’t Mean It Isn’t There

### Toward a Damned Good Information Architecture
- Users. Content. Context.
- We use the concept of an “information ecology”3 composed of users, content, and context to address the complex dependencies that exist in these information environments.
- Good information architecture design is informed by all three areas, and all three are moving targets. Users can vary in their attitude, demographics, psychographics, tasks and information needs, information-seeking behaviors, and more. Content can vary in quality, currency, authority, popularity, strategic value, cost, and more. And organizational context can vary based on mission, vision, goals, organizational politics, organizational culture, degree of centralization or autonomy, and more.
- When asked what are the most important qualities that we should bring to the table, the answer becomes quite simple: some knowledge of users and their needs (which might come from exposure to human–computer interaction and a variety of other fields), content (think technical communication and journalism), and context (read a book on organizational psychology).

#### Context
- All digital design projects exist within a particular business or organizational context. Whether explicit or implicit, each organization has a mission, goals, strategy, staff, processes and procedures, physical and technology infrastructure, budget, and culture.
- The vocabulary and structure of your websites and your apps is a major component of the evolving conversation between your business and your customers and employees.
- Your information architecture provides perhaps the most tangible snapshot of your organization’s mission, vision, values, strategy, and culture.
- The key to success is understanding and alignment. First, you need to understand the business context. What makes it unique? Where is the business today, and where does it want to be tomorrow?
- If your service will be used via more than one channel, you need to consider how these channels will overlap and interact with one another. All of these factors form part of the context that will shape your information architecture.

#### Content
- We define “content” very broadly to include the documents, applications, services, schemas, and metadata that people need to use or find in your systems.
- Distinguishing factors of each information ecology:
	- **Ownership**
		- Who creates and owns the content? Is ownership centralized within a content authoring group or distributed among functional departments? How much content is licensed from external information vendors? How much is produced by the users themselves?
	- **Format**
		- Databases, product catalogs, discussion archives, technical reports in MS Word, annual reports in PDF, office supply purchasing applications, and video clips of the CEO are just a few of the types of documents, databases, and applications you’ll find on a given site.
	- **Structure**
		- All documents are not created equal. An important memo may be fewer than 100 words. A technical manual may be more than 1,000 pages.
		- Some information systems are built around the document paradigm, with the fully integrated document as the smallest discrete unit. Other systems take a content component or digital asset approach, leveraging some form of structural markup (e.g., XML or JSON) to allow management and access at a finer level of granularity.
	- **Metadata**
		- To what extent has metadata that describes the content and objects within your system already been created? Have documents been tagged manually or automatically? What’s the level of quality and consistency? Is there a controlled vocabulary in place, or have users been allowed to tag the content?
	- **Volume**
		- How much content are we talking about? A hundred applications? A thousand pages? A million documents? How big is the system?
	- **Dynamism**
		- What is the rate of growth or turnover? How much new content will be added next year? And how quickly will it go stale?

### Users
- We use the word “users” as shorthand to mean “the people who will use your information environment.”
- Differences in customer preferences and behaviors within the physical world translate into different information needs and information-seeking behaviors in the context of websites and apps. For example, senior executives may need to find a few good documents on a particular topic very quickly. Research analysts may need to find all the relevant documents and may be willing to spend several hours on the hunt.

---

## Chapter 3. Design for Finding
- Information architecture starts with people and the reason they come to your site or use your app: they have an information need.
- There is no goal more important to designing information architecture than to satisfy peoples’ needs.
- Seeking something you know is there, like your colleague’s phone number, is quite a different information need than learning about a topic like small-cap mutual funds, and your system’s information architecture should be designed with those differences in mind.
- searching for something you know exists involves a very different behavior than browsing for the unknown.

### The “Too-Simple” Information Model
- Unfortunately, “too simple” is the most common information model, and it’s also the most problematic.
- Input, output, end of story. This is a very mechanistic and ultimately dehumanizing model for how people find and use information.
- Why do we have a problem with this “too-simple” model? Because it rarely happens this way.
- We also dislike the “too-simple” model because it narrowly focuses on what happens while the user is interacting with the information architecture.

### Information Needs
- The perfect catch
	- Sometimes users really are looking for the right answer.
- Lobster trapping
	- What about the times you’re looking for more than just a single answer?
	- You might be happy with a few of these items, and toss out the rest.
- Indiscriminate driftnetting
	- Then there are times when you want to leave no stone unturned in your search for information on a topic.
	- In these cases, you want to catch every fish in the sea, so you cast your driftnets and drag up everything you can.
- I’ve seen you before, Moby Dick...
	- There’s some information that you’d prefer to never lose track of, so you’ll tag it so you can find it again.
- This fishing metaphor is helpful because it illustrates **four common information needs**.
	- When you’re hoping to make the perfect catch, you usually know what you’re looking for, what to call it, and where you’ll find it — this is called known-item seeking.
	- When you’re hoping to find a few useful items in your traps, you’re doing something called exploratory seeking. In this case, you’re not exactly sure what you’re looking for. In fact, whether you realize it or not, you’re looking to learn something from the process of searching and browsing.
		- Exploratory seeking is typically open ended; there is no clear expectation of a “right” answer, nor does the user necessarily know how to articulate what exactly he is looking for.
- When you want everything, you’re performing exhaustive research. You’re looking for everything available on a particular topic, hoping to leave no stone unturned. In this case, the user often has many ways to express what she’s looking for, and may have the patience to construct her search using all those varied terms.
- Finally, our failing memories and busy schedules continually force us to engage in refinding pieces of useful information that we’ve happened upon before.

### Information-Seeking Behaviors
- Searching, browsing, and asking are all methods for finding, and these are the basic building blocks of information-seeking behavior.
- There are two other major aspects to seeking behaviors: integration and iteration. We often integrate searching, browsing, and asking in the same finding session.
- Each iteration of searching, browsing, asking, and interacting with content can greatly impact what it is we’re seeking.
- “berry-picking” model developed by Marcia Bates of the University of Southern California.1 In this model (shown in Figure 3-4), users start with an information need, formulate an information request (a query), and then move iteratively through an information system along potentially complex paths, picking bits of information (“berries”) along the way.
- In the process, they modify their information requests as they learn more about what they need and what information is available from the system.
- If the berry-picking model is common to your users, you’ll want to look for ways to support moving easily from search to browse and back again.
- Amazon.com provides one such integrated approach to consider: you can search within the categories you find through browsing, and you can browse through categories that you find by searching, as shown in Figure 3-5.
- Another useful model is the “pearl-growing” approach. Users start with one or a few good documents that are exactly what they need. They want to get “more like this one.” To meet this need, Google and many other search engines allow users to do just that: Google provides a command called “Similar pages” next to each search result.
- All of these architectural approaches help us find “more like this one.”
- Corporate websites and intranets often utilize a “two-step” model. Confronted with a site consisting of links to perhaps hundreds of departmental subsites, users first need to know where to look for the information they need. They might search or browse through a directory until they find a good candidate or two, and then perform the second step: looking for information within those subsites.

### Learning About Information Needs and Information-Seeking Behaviors
- How can we learn about users’ information needs and seeking behaviors?
- search analytics and contextual inquiry.
- Search analytics involves reviewing the most common search queries on your site (usually stored in your search engine’s logfiles) as a way to diagnose problems with search performance, metadata, navigation, and content.
- Search analytics provides a sense of what users commonly seek, and can help inform your understanding of their information needs and seeking behaviors
- Contextual inquiry, a user research method with roots in ethnography, is a great complement to search analytics because it allows you to observe how users interact with information in their “natural” settings and, in that context, ask them why they’re doing what they’re doing.

---

## Chapter 4. Design for Understanding
