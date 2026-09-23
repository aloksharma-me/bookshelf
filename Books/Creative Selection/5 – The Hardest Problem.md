# [[Creative Selection – by Ken Kocienda]]

---

# 5 – The Hardest Problem

>[!AI Summary]
>The development of Safari and WebKit highlights Apple’s culture of accountability, where individuals take ownership of critical features. After Safari’s beta revealed a major bug, the focus shifted to new possibilities, such as Scott’s vision to adapt WebKit for rich email editing. This ambitious project tasked a programmer with creating a word processor-like experience for web-based emails, despite their limited WebKit expertise.
>
>The programmer faced challenges like fixing elusive “heisenbugs,” unpredictable glitches that resisted straightforward debugging. Yet, the project underscored a vital lesson: while technical skill is essential, collaboration and the human element are key to overcoming challenges and driving innovation.

- We initially released Safari as a beta, and within a day or two, we discovered a nasty bug that could delete data from people’s computers.
- As promised, Scott called me in to his office a few weeks later. He began by describing how email was evolving—it was expanding beyond its origins as a text-only medium.
- Browser-based email services like Hotmail were fast becoming more popular, and Mac users were getting more and more email with web pages as the body of the message.
- Scott said that more and more of these “rich” messages were coming through using web technology as the means to style the text and lay out the images.
- He suggested we could use WebKit, the core of our new browser code, to improve the email experience on the Mac.
- he wanted me to enhance and adapt our browser code so people could treat the entirety of an emailed web page like it was a word processing document, editing the text and pictures in all the usual ways: typing new text, selecting passages with the mouse, deleting with the keyboard, cutting, copying, pasting, and so on.
- This conversation illustrates an important aspect of how Apple software development worked: Leaders like Scott offered project opportunities to programmers like me.
- Steve and Scott wanted this new feature. If Apple was going to deliver it, someone had to “sign up” for the work and get it done.
- I first encountered the term “signing up” in Tracy Kidder’s Soul of a New Machine, a Pulitzer Prize–winning book on the quest to develop a new minicomputer at Data General Corporation in the late 1970s.
- Kidder used the term to describe the moment one of the company’s young and harried engineers took on the personal responsibility for delivering a project.
- The closest term we had in the Apple lexicon was more management speak: directly responsible individual (we pronounced it as D-R-I in conversation), the person who has to do whatever is necessary to develop a piece of hardware or software, some technology, some critically needed thing—the DRI was the person with their butt on the line. ^b2e92f
- That’s how I became responsible for adding web page editing to WebKit, a technology I knew next to nothing about.
- My insertion point woes were the worst kind of bugs a coder can have, since the bad behavior didn’t always recur if I backed up and took the same steps again. Programmers have a name for such defects. We evoke the uncertainty principle from quantum mechanics and the man, Werner Heisenberg, who developed it. My insertion point glitches were “heisenbugs.” And fixing insertion point heisenbugs was the hardest programming problem I ever tried to solve.
- People matter more than programming. This may sound trite, but many coders find it easier to get along with computers than colleagues,

---