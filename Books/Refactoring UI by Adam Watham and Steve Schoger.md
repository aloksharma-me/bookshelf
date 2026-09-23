**Title**: [[Refactoring UI by Adam Watham and Steve Schoger]]
**Author**: [[Adam Wathan]], [[Steve Schoger]]
**Tags**: #book #PDF #GoodNotes

---

## Embedded Book (PDF)
![[Refactoring UI.pdf]]

---

## 1. Starting from Scratch
### Start with a feature, not a layout
- The easiest thing to find yourself frustrated and stuck when working on a new design is to start by trying to "design the app." When most people thing about "designing the app", they're thinking about the shell.
- **An "app" is a collection of features.**
- When starting a design, we may not have all the information needed to design the entire app.
- Instead of starting with the shell, **start with a piece of actual functionality.**	
	- Eg. for designing a flight booking app, start with designing a feature like "searching for a flight". The interface will need fields for departure city, destination, city, departure date, return date, CTA for search
- **Then, break down designs into smaller features, components and design patterns.**

### Detail comes later
- In the earliest stages of designing a new feature, it's important that you **don't get hung up making low-level decisions about things like typefaces, shadows, icons, etc.**
- **Design [rough sketches with pen and paper](https://www.smashingmagazine.com/2021/09/power-pen-paper-sketching/) (or Notability in my case).** This helps in getting rough ideas on to a paper, that involves only the rough layout without obsessing over details.
	- ![[Pasted image 20210220214141.png]]

#### Hold the color
- Resist the temptation to introduce color right away.
- **By designing in grayscale, you're forced to use spacing, contrast, and size to do all of the heavy lifting.**
	- *This is the phase of the design process where the **Information Architecture (IA)** of the feature/product is designed before moving onto more concrete details, edge cases, interactions etc.*
- This is what wireframing is all about. I used to do that in Balsamiq to start with but eventually moved to Figma to start wireframing.
	- ![[Pasted image 20210220214646.png]]

#### Don't over-invest
- Sketches and wireframes are disposable – users can't do anything with static mockups. **Use them to explore your ideas, and leave them behing when you're made a decision.**

### Don't design too much
- You don't need to design every single feature in an app before you move on to implementation.
- Figuring out how every feature in a product should interact and how every edge case should look is really hard, especially in the abstract.
	- *The trouble is, most designers, including me stop at this step. Figuring out edge cases is left for later, but never get around to working on those apart from some low-hanging fruits.*

#### Work in cycles
- Instead of designing everything up front, work in short cycles. Start by designing a simple version of the next feature you want to build. Once you're happy with the basic design, make it real.
- It's a lot easier to fix design problems in an interface you can actually use than it is to imagine every edge case in advance.
- Iterate on the working design until there are no more problems left to solve.

#### Be a pessimist
- **Don't imply functionality in your design that you aren't ready to build.**
	- *In some cases, tech limitation become the constraints. In those cases, keep the designs simple by designing the MVP first – absolutely necessary interface first, before adding more features or complexities.* ^7ca50c
- When you're designing a feature, expect it to be hard to build. Designing the smallest useful version  you can ship reduces that risk considerably.

### Choose a personality
- Every design has some sort of personality. Eg. banking sites – secure and professional, while startups – fun and playful.
- The personality of a design is determined by a few solid, concrete factors:
	- **Font choice**
		- Serif typeface for elegant or classic looks
		- Rounded sans serif for playful looks
		- Neutral sans for plain look and when relying on other elements to provide the personality.
	- **Color**
		- While trying to choose colors using only psychology isn't super practical – a lot of it is just about what looks good to you. ^2a66bd
	- **Border radius**
		- A small border radius is pretty neutral, and doesn't really communicate much of personality on its own.
		- A larger border radius starts to feel more playful.
		- No border radius at all feels a lot more serious or formal.
	- **Language**
		- The words you use in an interface have a massive influence on the overall personality.
	- **Deciding what you actually want**
		- A great way to simplify the decision is to take a look at other sites used by the people who you want to reach.
		- Just try not to borrow too much from direct competitors.

### Limit your choices
- When you're designing without constraints, decision-making is torture because there's always going to be more than one right choice.
	![[Pasted image 20210221143932.png]]
	
#### Define systems in advance
- Don't reach for the color picker every time you need to pick a new shade of blue – choose from a set of **8-10 shades picked out ahead of time**. ^022ff6
- **Define a restrictive type scale in advance** and use that to make any turure font size decisions.
- When you build systems like this, you only have to do the hard work of picking the initial values once instead of every time you're designing a new piece of the UI.
- A bit of work up front will save a ton of decision fatigue down the road.

#### Design by the process of elimination
- When designing using a constrained set of values, decision-making is a lot easier because there are a lot fewer "right" choices.
	- *From a limited set of options, we can even toggle through the options to pick one, or eliminate a few options until we are left with the best option.*

#### Systemise everything
- **The more systems you have in place, the faster you'll be able to work** and the less you'll second guess your own decisions.
- **Create systems for things like font-size, font-weights, line-height, color, margins, paddings, width, height, box-shadows etc.**
	- *Some of these systems can be a part of a bigger design sytem. In addition, it also helps in creating a consitency across the platform.*
- **Look for opportunities to introduce new sytems** as you make new decisions, and try to avoid having to make the same minor decisions twice.

---

## 2. Hierarchy is Everything
### Not all elements are equal
- **Visual hierarchy** refers to how important the elements in an interface appear in relation to one another.
- When everything in an interface is competing for attention, it feels noisy and chaotic.
- When you **deliberately de-emphasize secondary and tertiary information**, and make an effort to **highlight the elements that are most important**, the result is immediately more pleasing.

### Size isn't everything
- Relying too much on font size to control your hierarchy is a mistake – it often leads to primary content that's too large, and secondary content that's too small.
- Try using **font-weight or color to control the hierarchy**.
- Eg. make primary text elements bolder.
		![[Pasted image 20210221153307.png]]	
- **Try and stick to 2-3 colors:**
	- A dark color for primary content
	- A grey for secondary content
	- A lighter grey for tertiary content
- Similarly, **2 font-weights are usually enough for UI work:**
	- A normal font-weight (400/500)
	- Heavier font-weight (600/700 or bold/black)
- Stay away from font-weights under 400 for UIs, they are too hard to read at smaller scales.

### Don't use grey text on colored backgrounds
- Making text a **lighter grey doesn't look so great on colored backgrounds**. That's because the effect is **reduced contrast**.
- Making the **text closer to the background color** is what actually helps create hierarchy, not making it light grey.
- Adding opacity to white text to match the background doesn't work on top of an image or background patterns. The background will show throught the text in those cases.
- Instead, hand-pick a new color, based on the background color.
- **Choose a color with the same hue, and adjust the saturation and lightness.**

### Emphasize by de-emphasizing
- Instead of trying to further emphasize the element you want to draw attention to, figure out how you can **de-emphasize the elements that are competing with it**.
- In this example, give inactive items a softer color.
	![[Pasted image 20210221155814.png]]
	
### Labels are a last resort
- Displaying data using **label:value** format makes it difficult to present the data with any sort of heirarchy – every piece of data is given equal emphasis.

#### You might not need labels at all
- In a lot of situations, **you can tell what a piece of data is just by looking at the format.**
	- Eg. janedoe@example.com – email, +91 9878964324 – phone number, $19.99 – price
- When the format isn't enough, the context often is.

#### Combine labels and values
- You can often **avoid adding a label by adding clarifying text to the value**.
	![[Pasted image 20210221160442.png]]
- When you're able to **combine labels and values into a single unit**, it's much easier to give each piece of data meaningful styling without sacrificing on clarity.
	- *This way is also closer to natural language, so it feels more human*

#### Labels are secondary
- When labels are necessary, **add the label but treat it as a supporting content**. The data is what matters, the label is just there for clarity.
- De-emphasize the label by making it **smaller, reducing the contrast, using a lighter font-weight** or some combination of all three.

#### When to emphasize a label
- **If you're designing an interface where you know the user will be looking for the label, it might make sense to emphasize the label instead of the data.**
- This is often the case on **information-dense pages**, eg. tech specs of a product (mobile phone)
- Don't de-emphasize the data too much, simply using a **darker color for the label** and a **slightly lighter color for the value** is often enough.

### Separate visual hierarchy from document hierarchy
- ==Semantic markup **(explore more)**==
- **A lot of the times, section title act more like labels than headings** – they are supportive content, they shouldn't be stealing all the attention.
- Usually, the content in that section should be the focus and not the title.
- You might even include section title in your markup for accessibility reasons but completely hide them visually because the content speaks for itself.

### Balance weight and contrast
- The reason bold text feels emphasized compared to regular text is that bold text covers more surface area.
- ==Relation between surface area and hierarchy **(explore more)**==

#### Using contrast to compensate for weight
- Icons (especially solid ones) are generally pretty "heavy" and cover a lot of surface area. When we put an icon next to some text (eg. labels), the icon tends to feel emphasized.
- A simple and effective way to do this – lower the contrast of the icon by giving it a softer color.
	![[Pasted image 20210221162541.png]]
- Reducing the contrast works like a counterbalance, making heavier elements feel lighter even though the weight hasn't changed.

#### Using weight to compensate for contrast
- Increasing the weight is a great way to add a bit of emphasis to low contrast elements.
	- Eg. making the border 2px instead of 1px to add weight without losing the softer look

### Semantics are secondary
- Every action on a page sits somewhere in a pyramid of importance. Most pages only have one true primary action, action, a couple of less important secondary actions, and a few seldom used tertiary actions.
	- **Primary actions should be obvious** – solid, high contrast background.
	- **Secondary actions should be clear but not prominent** – outline styles, lower contrast background
	- **Tertiary actions should be discoverable but unobtrusive** – styling like links

#### Destructive actions
- If a destructive action is not the primary action on the page, it might be better to give it a secondary or tertiary button treatment.
- Combine this with a confirmation step where the destructive action actually is the primary action, style it accordingly.
	![[Pasted image 20210221163752.png]]
	
---

## 3. Layout and Spacing
### Start with too much white space
- One of the easiest ways to clean up a design is to simply **give every element a little more room to breathe.**

#### White space should be removed, not added
- To make something actually look great, you usually need more white space.
- A better approach is to start by giving something way too much space, then remove it until you're happy with the result.

#### Dense UIs have their place
- There are certainly situations where it makes sense for a design to be much more compact.
	- Eg. designing a dashboard where a lot of information needs to be visible at once.
- The important thing is to make this a deliberate decision instead of just being the default. It's a lot more obvious when you need to remove white space than it is when you need to add it.

### Establish a spacing and sizing system
- You shouldn't be nitpicking between 120px and 125px when trying to decide on the perfect size for an element in your UI.
- Painfully trialing arbitrary values one pixel at a time will drastically slow you down at best, and create ugly, inconsistent designs at worst.
- Instead, **limit yourself to a constrained set of values, defined in advance.**

#### A linear scale won't work
- For a system to be truly useful, it needs to take into consideration the relative difference between adjacent values.
- At the small end of the scale (icon, padding inside a button), a couple of pixels can make a big difference.
- But at the large end, (width of a card etc), a couple of pixels is basically imperceivable.
- **Make sure no two values in the scale are ever closer than about 25%.**

#### Defining the system
- A simple approach is to **start with a sensible base value, then build a scale using factors and multiples of that value.**
- 16px is a great number to start with because it divides nicely, and also happens to be the default font size in every major web browser.
- Here's an example of a fairly practical scale built using this approach ... ![[Pasted image 20210222163904.png]]

#### Using the system
- Once you've defined your spacing and sizing system, you'll find that you're able to design a hell of a lot faster.
- While the workflow improvements are probably the biggest benefit, you'll start to notice a subtle consistency in your designs that wasn't there before, and things will look just a little bit cleaner.
- **A spacing and sizing system will help you create better designs, with less effort, in less time.**

### You don't have to fill the while screen
- We give ourselves 1200-1400px of space to fill. But just because you have the space, doesn't mean you need to use it.
- If you only need 600px, use that much. Spreading things out or making things unnecessarily wide just makes an interface harder to interpret, while a little extra space around the edges never hurt anyone.
- You don't need to make everything full-width just because something else is full-width.
- **Give each element just the space it needs – don't make something worse just to make it match something else.**

#### Shrink the canvas
- A lot of the time it's easier to design something small when the constraints are real.
- If you're building a responsive web application, try starting with a ~400px canvas and designing the mobile layout first.

#### Thinking in columns
- If you're designing something that works best at a narrower width but feels unbalanced in the context of an otherwise wide UI, see if you can split it into coloumns instead of just making it wider.
	- Eg. in case of form layouts, breaking supporting text and form fields into different columns makes much more sense ![[Pasted image 20210222170519.png]]

### Grids are overrated
- Using a system like a 12-column grid is a great way to simplify layout decisions, and bring a satisfying sense of order to your designs.

#### Not all elements should be fluid
- Fundamentally, **a grid system is just about giving elements fluid, percentage-based widths.**
- The problem with this approach is that there are a lot of situations where it makes much more sense for an element to have a fixed width instead of a relative width.
	- Eg. a traditional sidebar layout – in this case, it's better to make the sidebar with a fixed width and make the content area fluid ![[Pasted image 20210222170909.png]]
- This applies within components too – don't use percentages to size something unless you actually want it to scale.

#### Don't shrink an element until you need to
- **Instead of sizing elements based on a grid, give them a max-width so they don't get too large, and only force them to shrink when the screen gets smaller than the max-width.**

### Relative sizing doesn't scale
- It's tempting to believe that every part of an interface should be sized relative to one another, and that if element A needs to shrink by 25% on smaller screens, that element B should shrink by 25% too.
	- Eg. in an article, 2.5em might be the perfect headline size on desktop but there's no guarantee that it'll be the right size on smaller screens. A 2.5em for 14px on translates to 35px which is too big for a smaller screen.
- There isn't any real relationship at all, and that there's no real benefit in trying to define the headline size relative to the body copy size.
- **The difference between small elements and large elements should be less extreme at small screen sizes.**

#### Relationships within elements
- **The idea that things should scale independently doesn't just apply to sizing elements at different screen sizes**, it applies to the properties of a single component too. Eg. buttons.

### Avoid ambigous spacing
- When groups of elements are explicitly separated – usually by a border or background color – it's obvious which elements belong to which group. But when there is no visible separator, it's not always so obvious.
- The fix is to increase the space between groups (eg. form group) so it's visibly clear which label belongs to which input. ![[Pasted image 20210222172105.png]]
- The same principles can be applied in section headings, bulleted lists etc.
- **Whenever you're relying on spacing to connect a group of elements, always make sure there's more space around the group than there is within it.**

---

## 4. Designing Text
### Establish a type scale
- Choosing sizes without a system is a bad idea for two reasons:
	- It leads to annoying inconcistencies in your designs
	- It slows down your workflow

### Choosing a scale
- A linear scale doesn't work. Smaller jumps between font sizes are useful at the bottom of the scale, but not at large headline level scale.

#### Modular scale
- One approach is to calculate your [type scale using a ratio](https://type-scale.com) (major, third, perfect fifth, golden ration etc.). This is often called a "modular scale".
- You start with a base value (eg. 16px) and apply the ratio to get the next value.
- In practice, this approach is not perfect for a couple of reasons ...
	- You end up with fractional values (eg. 31.25px, 39.063px etc). Browsers handle subpixel rounding a little bit differently, so it's best to avoid fractional sizes. Make sure to round the values when defining the scale.
	- You usually need more sizes. for UI Design, the jumps you get using a modular scale are often a bit too limiting. We might need a 14px size which can not be derived from a modular scale.

#### Hand-crafted scales
- A more practical approach is to simply pick values by hand.

#### Avoid em units
- When building a type scale, don't use the 'em' units to define  your sizes.
- Because 'em' units are relative to the current font size, the computed font size of nested elements is often not actually a value in your scale.
- Stick to 'px' or 'rem' units.

### Use good fonts
#### Play it safe
- For UI Design, the safest bet is a fairly neutral sans-serif – eg Helvetica.
- Another great option is to rely on the system font stack.

#### Ignore typefaces with less than 5 weights
- As a general rule, typefaces that come in a lot of differenet weights tend to be crafted with more care and attention to detail than typefaces with fewer weights.
- There is a filter on Google Fonts (number of styles). Crank it up to 10+.

#### Optimise for legibility
- Fonts meant for headlines usually have tightre letter-spacing and shorter lowecase letters (shorter x-height), while fonts meant for smaller sizes have wider letter-spacing and taller lowercase letters.

#### Trust the wisdom of the crowd
- If a font is popular, it's probably a good font. Sort by popularity on font directories. This makes it easier to pick the better fonts.

#### Steal from people who care
- Inspect some of your favourite sites and see what typefaces they are using.

#### Developing your intuition
- Once you start paying closer attention to the typography on well-designed sites, it's not long before you feel pretty comfortable labelling a typeface as awesome or terrible.

### Keep your line length in check
- For the best reading experience, make your paragraphs wide enough to fit between **45 and 75 characters per line**. A width of **20-35em** will get you in the right ballpark.

#### Dealing with wider content
- If you’re mixing paragraph text with images or other large components, you should still limit the paragraph width even if the overall content area needs to be wider to accommodate the other elements.

### Baseline, not center
- A better approach is to align mixed font sizes by their baseline, which is the imaginary line that letters rest on.
	![[Pasted image 20210228085444.png]]
	
### Line-height is proportional
- Choosing the right line-height for your text is a bit more complicated than just using the same value across the board in all situations.

#### Accounting for line length
- The reason we add space between lines of text is to make it easy for the reader to find the next line when the text wraps.
- Your line-height and paragraph width should be proportional — narrow content can use a shorter line-height like 1.5, but wide content might need a line-height as tall as 2.

#### Accounting for font size
- Line length isn’t the only factor in choosing the right line-height — font size has a big impact as well.
- When text is small, extra line spacing is important because it makes it a lot easier for your eyes to find the next line when the text wraps.
- For large headline text you might not need any extra line spacing, and a lineheight of 1 is perfectly fine.
- Line-height and font size are inversely proportional — use a taller line-height for small text and a shorter line-height for large text.

### Not every link needs a color
- When you’re designing an interface where almost everything is a link, using a treatment designed to make links “pop” in paragraph text can be really overbearing.
- Instead, emphasize most links in a more subtle way, like by just using a heavier font weight or darker color.
- If you’ve got links in your interface that are really ancillary and not part of the main path a user takes through the application, consider adding an underline or changing the color only on hover.
	![[Pasted image 20210228090005.png]]
	
	
### Align with readability in mind
- In general, **text should be aligned to match the direction of the language it’s written in**. For English (and most other languages), that means that the vast majority of text should be left-aligned.

#### Don’t center long form text
- Center-alignment can look great for headlines or short, independent blocks of text.
- But if something is longer than two or three lines, it will almost always look better left-aligned.

#### Right-align numbers
- If you’re designing a table that includes numbers, right-align them. When the decimal in a list of numbers is always in the same place, they’re a lot easier to compare at a glance.

#### Hyphenate justified text
- Justified text looks great in print and can work well on the web when you’re going for a more formal look, but without special care, it can create a lot of awkward gaps between words. To avoid this, **whenever you justify text, you should also enable hyphenation.**

### Use letter-spacing effectively
- As a general rule, you should trust the typeface designer and leave letterspacing alone. That said, there are a couple of common situations where adjusting it can improve your designs.

#### Tightening headlines
- If you want to use a family with wider letter-spacing for headlines or titles, it can often make sense to decrease the letter-spacing to mimic the condensed look of a purpose-built headline family.
- Headline fonts rarely work well at small sizes even if you increase the letter spacing.

#### Improving all-caps legibility
- Lowercase letters have a lot of variety visually. Letters like n, v, and e fit entirely within a typeface’s x-height, other letters like y, g, and p have descenders that poke out below the baseline, and letters like b, f, and t have ascenders that extend above.
- It often makes sense to **increase the letter-spacing of allcaps text** to improve readability.

---

## 5. Working with Color
### Ditch hex for HSL
- HSL represents colors using attributes the human-eye intuitively perceives: hue, saturation, and lightness.
- **Hue** is a color’s position on the color wheel. Hue is measured in degrees, where 0° is red, 120° is green, and 240° is blue.
- **Saturation** is how colorful or vivid a color looks. 0% saturation is grey (no color), and 100% saturation is vibrant and intense.
- **Lightness** is just what it sounds like — it measures how close a color is to black or to white. 0% lightness is pure black, 100% lightness is pure white, and 50% lightness is a pure color at the given hue.

#### HSL vs HSB
- lightness in HSL is not the same than brightness in HSB.
- browsers only understand HSL, so if you’re designing for the web, HSL should be your weapon of choice.

### You need more colors than you think
#### What you actually need
- You can’t build anything with five hex codes. To build something real, you need a much more comprehensive set of colors to choose from.
- You can break a good color palette down into three categories.
	- **Greys:**
		- Text, backgrounds, panels, form controls — almost everything in an interface is grey.
		- In practice, you want 8-10 shades to choose from (more on this in “Define your shades up front”). Not so many that you waste time deciding between shade #77 and shade #78, but enough to make sure you don’t have to compromise too much.
	- **Primary color(s):**
		- Most sites need one, maybe two colors that are used for primary actions, active navigation elements, etc.
		- Just like with greys, you need a variety (5-10) of lighter and darker shades to choose from.
	- **Accent colors:**
		- On top of primary colors, every site needs a few accent colors for communicating different things to the user.
- All in, it’s not uncommon to need as many as ten different colors with 5-10 shades each for a complex UI.

### Define your shades up front
- Define a fixed set of shades up front that you can choose from as you work.

#### Choose the base color first
- Start by picking a base color for the scale you want to create — the color in the middle that your lighter and darker shades are based on.
- There’s no real scientific way to do this, but for primary and accent colors, a good rule of thumb is to pick a shade that would work well as a button background.

#### Finding the edges
- Pick your darkest shade and your lightest shade.
- The **darkest shade of a color is usually reserved for text**, while the lightest shade might be used to tint the background of an element. 
- A simple **alert component is a good example that combines both of these use cases**, so it can be a great place to pick these colors.

#### What about greys?
- With greys the base color isn’t as important, but otherwise the process is the same. Start at the edges and fill in the gaps until you have what you need.

#### It’s not a science
- As tempting as it is, you can’t rely purely on math to craft the perfect color palette.
- Just try to avoid adding new shades too often if you can avoid it.

### Don’t let lightness kill your saturation
- In the HSL color space, as a color gets closer to 0% or 100% lightness, the impact of saturation is weakened — the same saturation value at 50% lightness looks more colorful than it does at 90% lightness.
- you need to increase the saturation as the lightness gets further away from 50%.

#### Use perceived brightness to your advantage
- every hue has an inherent perceived brightness due to how the human eye perceives color.
- You can calculate the perceived brightness of a color by plugging its RGB components into this formula:
	![[Pasted image 20210301081308.png]]
- perceived brightness doesn’t simply change linearly from the darkest hue to the lightest hue

#### Changing brightness by rotating hue
- Since different hues have a different perceived brightness, another way you can **change the brightness of a color is by rotating its hue**.
- To make a color lighter, rotate the hue towards the nearest bright hue — 60°, 180°, or 300°.
- To make a color darker, rotate the hue towards the nearest dark hue — 0°, 120°, or 240°.
- **Don’t rotate the hue more than 20-30°** or it will look like a totally different color instead of just lighter or darker.

### Greys don’t have to be grey
- By definition, true grey has a saturation of 0% — it doesn’t have any actual color in it at all. But in practice, a lot of the colors that we think of as grey are actually saturated quite heavily.

#### Color temperature
- If you want your greys to feel cool, saturate them with a bit of blue.
- To give your greys a warmer feel, saturate them with a bit of yellow or orange.
- To maintain a consistent temperature, don’t forget to increase the saturation for the lighter and darker shades.

### Accessible doesn’t have to mean ugly
- To make sure your designs are accessible, the Web Content Accessibility Guidelines (WCAG) recommend that normal text (under ~18px) has a contrast ratio of at least 4.5:1, and that larger text has a contrast ratio of at least 3:1.

#### Flipping the contrast
- You can solve this problem (unintended attention grabbing) by flipping the contrast. Instead of using light text on a dark colored background, use dark colored text on a light colored background.

### Don’t rely on color alone
- Color can be a fantastic way to enhance information and make it easier to understand, but be careful not to rely on it, or users with color blindness will have a hard time interpreting your UI.
- Also communicate that information in some other way, like by adding icons to indicate if the change is positive or negative.
- In situations like this, try relying on contrast instead of using completely different colors. It’s much easier for someone who’s colorblind to tell the difference between light and dark than it is for them to tell the difference between two distinct colors.
- Always use color to support something that your design is already saying; never use it as the only means of communication.

---

## 6. Creating Depth
### Emulating a light source
- This chapter explains the 3D feel of some elements – when they appear to be raised above the page.

#### Light comes from above
- Top edge of the panel is lighter? That’s because it’s angled towards the sky and receives more light. Similarly, the bottom edge is darker because it’s angled away from the sky, receiving less light.
	![[Pasted image 20210302204241.png]]
	
#### Simulating light in a user interface
- If you want an element to appear raised or inset, first figure out what profile you want that element to have, then mimic how a light source would interact with that shape.
- Choose the lighter color by hand instead of using a semi-transparent white for best results — simply overlaying white can suck the saturation out of the underlying color.

#### Don’t get carried away
- Borrowing some visual cues from the real world is a great way to add a bit of depth, but there’s no need to try and make things look photo-realistic.

### Use shadows to convey elevation
- Shadows let you position elements on a virtual z-axis to create a meaningful sense of depth.
- Small shadows with a tight blur radius make an element feel only slightly raised off of the background, while larger shadows with a higher blur radius make an element feel much closer to the user.
- You might use a smaller shadow for something like a button, where you want the user to notice it but don’t want it to dominate the page
- Medium shadows are useful for things like dropdowns; elements that need to sit a bit further above the rest of the UI.
- Large shadows are great for modal dialogs, where you really want to capture the user’s attention.

#### Establishing an elevation system
- Defining a fixed set of shadows will speed up your workflow and help maintain consistency in your designs.
- Five options is usually plenty.

### Shadows can have two parts
- When you see someone combining two shadows, they’re not just experimenting randomly until things look nice, they’re using each shadow to do a specific job.
	- The first shadow is larger and softer, with a considerable vertical offset and large blur radius. It simulates the shadow cast behind an object by a direct light source.
	- The second shadow is tighter and darker, with less of a vertical offset and a smaller blur radius. It simulates the shadowed area underneath an object where even ambient light has a hard time reaching.

### Even flat designs can have depth
- When most people talk about “flat design”, they mean designing without shadows, gradients, or any other effects that try to mimic how light interacts with things in the real-world.

#### Creating depth with color
- In general (especially with shades of the same color), lighter objects feel closer to us and darker objects feel further away.
- Color is just another tool in your toolbelt for conveying distance.

### Overlap elements to create layers
- One of the most effective ways to create depth is to overlap different elements to make it feel like a design has multiple layers.
	![[Pasted image 20210302205836.png]]
	
---

## 7. Working with Images
### Use good photos
- Bad photos will ruin a design, even if everything else about it looks great.
- Not everyone can afford professional photographer for simple photographs. Instead use **high quality stock photography**
	- Unsplash, Pexels etc

### Text needs consistent contrast
#### The problem with background images
- Photos can be very dynamic, with a lot of really light areas, and a lot of really dark areas. White text might look great in the dark areas, but it gets lost in the light areas. Dark text looks great in the light areas, but gets lost in the dark areas.

#### Add an overlay
- One way to increase the overall text contrast is to add a semi-transparent overlay to the background image.

#### Lower the image contrast
- Lowering the contrast will change how light or dark the image feels overall, so make sure to adjust the brightness to compensate.

#### Colorize the image
- Another way to help text stand out against an image is to colorize the image with a single color.

#### Add a text shadow
- A text shadow can be a great way to increase contrast only where you need it most.

### Everything has an intended size
#### Don’t scale up icons
- Icons that were drawn at 16–24px are never going to look very professional when you blow them up to 3x or 4x their intended size. They lack detail, and always feel disproportionately “chunky”.
- If small icons are all you’ve got, try enclosing them inside another shape and giving the shape a background color.

#### Don’t scale down screenshots
- If you want to include a detailed screenshot in your design, take the screenshot at a smaller screen size (like maybe your tablet layout) and save a lot of space for it so you don’t have to shrink it as much.
	![[Pasted image 20210303095659.png]]	
- Or consider taking just a partial screenshot, so you can display it in less space without needing to scale it down.
	![[Pasted image 20210303095737.png]]	
- Try drawing a simplified version of the UI with details removed and small text replaced with simple lines.

#### Don’t scale down icons, either
- Just as icons drawn to be used at 16px look chunky when you scale them up, icons intended to be used at larger sizes look choppy and fuzzy when you scale them down.
- A better approach is to redraw a super simplified version of the logo at the target size, so you control the compromises instead of leaving it up to the browser.

### Beware user-uploaded content
- When you’re depending on user-uploaded images, you don’t have the luxury of fine-tuning contrast, carefully adjusting colors, or cropping the perfect frame.

#### Control the shape and size
- Instead of letting users wreak havoc on your page structure, center their images inside fixed containers, cropping out anything that doesn’t fit.

#### Prevent background bleed
- When a user provides an image with a background color that’s similar to the background in your UI, the image and the background can bleed together, causing the image to lose its shape.
- Try using a subtle inner box shadow, instead of a border around the shape.

---

## 8. Finishing Touches
### Supercharge the defaults
- If your design includes a bulleted list, try replacing the bullets with icons.
- If you’re working on a testimonial try “promoting” the quotes into visual elements by increasing the size and changing the color.
- Links are another great candidate for special styling. You can do something as simple as changing the color and font weight, or something as fancy as a thick and colorful custom underline that partially overlaps the text.
- Using custom checkboxes and radio buttons is an easy way to add some color to the design.

### Add color with accent borders
- Add colorful accent borders to parts of your interface that would otherwise feel a bit bland.
	![[Pasted image 20210303100500.png]]
	
### Decorate your backgrounds
- A great way to break up some of the monotony without drastically altering the design is to add some excitement to a few of your backgrounds.

#### Change the background color
- One way to add some excitement to a background is to simply change the color.
- You could even use a slight gradient.

#### Use a repeating pattern
- Another approach is to add a subtle repeatable pattern (eg. from [Hero Patterns](http://www.heropatterns.com)).
- Keep the contrast between the background and the pattern pretty low to ensure readability.

#### Add a simple shape or illustration
- Instead of decorating an entire background, you can also try including an individual graphic or two in specific positions.
- You can even do something more complex, like a simplified world map.
	![[Pasted image 20210304210605.png]]
	
### Don’t overlook empty states
- If you’re designing something that depends on user-generated content, the empty state should be a priority, not an afterthought.
- Try incorporating an image or illustration to grab the user’s attention, and emphasizing the call-to-action to encourage them to take the next step.
- If you’re working on something that has a bunch of supporting UI like tabs or filters, consider hiding that stuff entirely. There’s no point in presenting a bunch of actions that don’t do anything until the user has created some content.
- Empty states are a user’s first interaction with a new product or feature. Use them as an opportunity to be interesting and exciting — don’t settle for plain and boring.

### Use fewer borders
#### Use a box shadow
- Box shadows do a great job of outlining an element like a border would, but can be more subtle and accomplish the same goal without being as distracting.

#### Use two different background colors
- Giving adjacent elements slightly different background colors is usually all you need to create distinction between them.

#### Add extra spacing
- Spacing things further apart is a great way to create distinction between groups of elements without introducing any new UI at all.

### Think outside the box
- Break it (dropdowns) into sections, use multiple columns, add supporting text or colorful icons — do something fun with it!
- With tables, if a column doesn’t need to be sortable, there’s no reason you can’t combine it with a related column and introduce some interesting hierarchy.
- If a set of radio buttons are an important part of the UI you’re designing, try something like selectable cards instead.
	![[Pasted image 20210304211413.png]]