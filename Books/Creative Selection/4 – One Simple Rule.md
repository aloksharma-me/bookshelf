# [[Creative Selection – by Ken Kocienda]]

---

# 4 – One Simple Rule

>[!AI Summary]
>Apple’s Safari browser was born out of Steve Jobs’ vision for a faster, more efficient alternative to Internet Explorer. Speed was the top priority, shaping the team’s definition of success. Don, a key team member, developed the Page Load Test (PLT) to measure browser performance and ensure continuous optimization. Strict code review processes further reinforced this focus on speed, with a system of trade-offs to maintain performance even as new features were added.
>
>The browser’s development culminated in its official name, “Safari,” which conveyed exploration and originality. Steve Jobs meticulously prepared for the product’s unveiling, rehearsing extensively to deliver a flawless keynote. During the January 2003 Macworld Expo, he announced Safari, emphasizing its speed—loading web pages three times faster than Internet Explorer—and the vision behind creating Apple’s own browser. This disciplined approach to design, performance, and storytelling underscored Apple’s commitment to excellence and innovation.

- Steve wanted our browser to be fast, really fast at loading web pages from the internet, much faster than Microsoft Internet Explorer, the default browser on the Mac, the product we aimed to replace.
- Steve thought speed was the long-term key to better browsing, so making a high-performance browser became our top priority, our definition for greatness.
- By the late spring of 2002, our web browser was still only capable of crawling. We couldn’t use it for our daily browsing—or anything close.
- Don was the one who figured out how we would make our code quick. One day, a month or two after the Black Slab Encounter, he called me into his office and asked me to create a test program to measure browser speed.
- He envisioned an automated tool that would launch our browser app and command it to load a suite of web pages, one after the other, in rapid succession. Over the next couple days, I wrote the code to do just that. I named it the Page Load Test, but we soon took to calling the PLT.
- On our browser team, as in most serious software development efforts, we followed an editorial process to make changes to our source code. Whenever I finished editing some code, I would write a detailed summary of what my edits did, what feature it implemented or what bug it fixed, and how well I thought my code change accomplished these goals. Then I would find a teammate to review the work with me.
- The code review process often led to round after round of reviewer feedback, improvements, and requests for re-review. Once everything passed muster in the peer review, and only then, was I allowed to commit my change to our repository, the central server that stored all the revisions to all our source code.
- Don held that if we heeded the PLT without fail and rejected any code changes that made our code slower, only two things could happen. Either the browser would stay the same speed . . . or it would get faster.
- Optimization is the process where programmers try to make code execute faster.
- The PLT helped us to understand what our programming instructions were doing along the essential axis of speed and showed us precisely when and where we were introducing slowness to our source code.
- It’s common for programming teams to make their code work correctly first and then turn to speeding it up only once most of the bugs are fixed.
- Front-loading feature work and back-loading performance optimizations are typical.
- Yet, when features take longer to complete than expected and the delivery schedule can’t be shifted, management might have no choice but to drop performance work entirely.
- When we deemed such features too important to skip but couldn’t figure out how to add them without causing such slowdowns, we instituted a trading scheme, where we found speedups in unrelated parts of our existing source code to “pay for” the performance cost of the new features.
- As we got close to the release date for our project, Apple’s marketing department set out to pick an official name for our browser.
- Within a month before the worldwide announcement of our app, planned for Macworld Expo SF in early 2003, we were still calling it either WebBrowser or Alexander, the latter a code name evoking the great Macedonian king, a famous “Konqueror.”
- Steve Jobs had some name ideas, and when I first heard them, I cringed. Early on, Steve liked “Thunder,” but he soon got over that in favor of “Freedom.”
- It was Scott who ultimately came up with the name that stuck: Safari. It conveyed the same world-traveler feel as other well-known browsers—Navigator, Explorer, Konqueror—but it wasn’t a slavish knock-off. It was fresh. Don liked it too and, more important, so did Steve. ^f78e29
- Don’s seat-of-the-pants plan was that if Steve ran into some glitch during the Safari demo rehearsal, he would be there to say “Yes sir, Steve, we’ll get everything fixed up right away,” and then he and I would figure out what was wrong, as The Man, a supremely restless audience, watched and waited.
- In later years, I would learn more about how Steve prepared for these big-splash product announcements.
- Three weeks or a month before the keynote itself, Steve would start rehearsing with portions of his slide deck in some venue at Apple, often in Town Hall, the auditorium on the Infinite Loop campus. Slowly, day by day, he would build the show by stepping through it as he wanted to present it at the keynote.
- This was one of Steve’s great secrets of success as a presenter. He practiced. A lot. He went over and over the material until he had the presentation honed, and he knew it cold.
- Steve ran through his entire presentation, from start to finish, twice each on the Saturday and Sunday preceding the keynote itself, which was planned for Tuesday, January 7, 2003.
- In this pre-iPod/iPhone/iPad era, Apple, Inc. was still Apple Computer, a PC company trying to drum up customers to raise its single-digit market share.
- Part of the strategy to increase sales had been the opening, two years earlier, of the first Apple Stores, retail locations that aimed to provide better customer service and an improved buying experience for Macs.
- Steve also announced that Safari not only loaded web pages faster than Internet Explorer . . . it loaded web pages three times faster.
- Steve felt the need to say why Apple had made its own browser, and his explanation led with speed.
- In any complex effort, communicating a well-articulated vision for what you’re trying to do is the starting point for figuring out how to do it.
- a significant part of attaining excellence in any field is closing the gap between the accidental and intentional,

---