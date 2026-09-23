# [[Creative Selection – by Ken Kocienda]]

---

# 7 – QWERTY

>[!AI Summary]
>The development of the iPhone’s keyboard was fraught with challenges. The team initially tested a large-key design with dictionary-based suggestions, but it didn’t work well for uncommon words or names. They also struggled with users losing track of their typing progress, known as the “Where am I?” problem.
>
>After feedback from executives and the team, a new approach emerged: a single-letter QWERTY layout. This resolved the confusion, as each key displayed only one letter, making it easier for users to track their typing. The autocorrection feature was also improved, ensuring the device suggested the best word based on the letters typed.
>
>These improvements were crucial in making the keyboard user-friendly, transforming it from a potential product flaw into a key feature of the iPhone. Ultimately, the keyboard’s design exemplified how good design isn’t just about appearance but about how well the product works and meets users’ needs.

- all the responsibility for developing the keyboard, which had been shared collectively among the Purple software team for a few weeks, landed squarely in my lap.
- All along, I worried that my keyboard had product-killing potential.
- Indeed, there was a well-known precedent in Apple’s own history. Apple once made a product that was torpedoed by its poor text entry technology—the Newton, the handheld personal digital assistant the company created in the 1990s.
- The Newton was groundbreaking in concept and form factor, but it was sunk by its problematic handwriting recognition. ^07aaf9
- I told him about our decisions to make big keys that were easy to target and couple them with suggestions from a dictionary. Phil wasn’t satisfied, and he said so. Then that was it. I was surprised we were done so fast. The demo was over in about two minutes.
- While I had been working hard on it, for Phil it was brand new, and he was indifferent to it. He expected the software to win him over, and apparently, it didn’t.
- his reaction was just like a prospective customer evaluating a product from scratch.
- The derby-winning keyboard with some modifications to make it more full-featured. The shift and delete keys made way for a return key and a key to display numbers and punctuation.
- A couple days later, Scott and I repeated the demo performance for Tony Fadell, the executive in charge of the iPod division.
- Then he tried my software, but he couldn’t have typed more than a word or two. The demo with him was even shorter
- Two demos with less-than-positive responses.
- This scheme worked well for common words, and every new word I added to the dictionary made it work even better. Typing people’s names was another matter.
- My keyboard had no trouble with finding paths for ordinary English words, but the software couldn’t find a path through a succession of keys for a name like Teemu, since his name wasn’t in the dictionary.
- Over time, I came to the conclusion that designing an excellent user experience was as much about preventing negative experiences as facilitating positive ones.
- Great products make people happy almost all the time and do the opposite rarely, if at all.
- As my teammates on the Purple project used my keyboard in their daily routine in the months following the demo derby, they found they were getting confused in the midst of the tapping through words letter by letter.
- My teammates reported how they would start to type a word but then lose track of their progress somewhere in the middle.
- After a little study, I figured out what was going on. The derby winner suggested only those words with the exact number of letters you’d typed. My dictionary lookup software didn’t predict longer words.
- Here’s an example. I start typing the word “aluminum” but then get distracted momentarily—perhaps a colleague invites me to get a cup of coffee. Let’s say I typed five letters before my attention was diverted. When I want to refocus and continue typing, I have to ask myself “Where am I? What letter comes next?” I look up to the suggestion bar, the narrow rectangle situated directly above the keyboard that displayed candidates from the dictionary, hoping for some assistance.
- with this latest difficulty, the issues with the derby-winning keyboard were piling up: We couldn’t type uncommon personal names like “Teemu.” We couldn’t type uncommon words like “Arrr!” We were getting lost while typing—the “Where am I?” problem.
- There’s a common high-tech term for a daily regimen of using and evaluating your own product while you’re trying to develop it: dogfooding. ^752937
- “Aww . . . come on, Ken! Can’t you just put one letter on every key?”
- In my new, Greg-inspired layout, each letter appeared by itself on a key but was given a new set of neighbors as far as the autocorrection code was concerned.
- For example, the letter F was no longer locked in a DF set. For the person typing, there was a clearly defined F key, but the autocorrection code saw F as part of a custom group, FDGRTC, with F in the center and all its neighbors to the left and right, above and below.
- changing over to single-letter keys definitively solved the “Where am I?” problem. Since I always displayed the specific sequence of keys you actually tapped, you could always look up and find your place.
- When I switched away from this automatic-word-choosing on the Greg-inspired, single-letter QWERTY keyboard, tapping space now entered the exact characters you typed, the ones you saw pop up as you tapped. Dictionary suggestions continued to be visible in the suggestion bar, and I placed the best dictionary suggestion in the left position. Your exact typing appeared in the right position. However, getting dictionary assistance required tapping the word bubble in the suggestion bar rather than tapping space. You needed to pause at the end of typing a word, look up at the letters you had actually typed, tap space if you had typed accurately, or tap a bubble to change to a software suggestion. ^e58426
- I wrote some code, and in about a half hour, I had a new demo of the QWERTY keyboard, one that automatically picked the best dictionary word suggestion when you tapped space.
- Touchscreen keyboard autocorrection was born in that moment,
- The Black Slab Encounter was one of only two Eureka! moments I ever had at Apple. This was the other one.
- Taste is developing a refined sense of judgment and finding the balance that produces a pleasing and integrated whole.
- Most people make the mistake of thinking design is what it [a product] looks like. People think it’s this veneer—that the designers are handed this box and told, “Make it look good!” That’s not what we think design is. It’s not just what it looks like and feels like. Design is how it works.

---