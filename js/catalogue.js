// The catalogue — the only file you edit when you add a book.
//
// Each book needs:
//   title, author, category   shown on the site (category is a key from `categories`)
//   src                       its notes file, relative to the Books/ folder
// Optional:
//   subtitle
//   keyIdeas                  a file whose [[links]] become the "Key ideas" list
//   index: true               `src` is an index page that links to one file per chapter
//                             (e.g. [[1 – The Demo]]); those files are pulled in, in order
//
// A book's URL id comes from its title: "The Making of a Manager" → book.html?id=the-making-of-a-manager

export const categories = {
  design:     { label: 'Design',            hue: 214, sat: 34, light: 32 },
  work:       { label: 'Work & Leadership', hue: 8,   sat: 48, light: 36 },
  mind:       { label: 'Mind & Habits',     hue: 152, sat: 26, light: 32 },
  notes:      { label: 'Thinking & Writing',hue: 40,  sat: 58, light: 46 },
  creativity: { label: 'Creativity',        hue: 18,  sat: 58, light: 50 },
  money:      { label: 'Money',             hue: 64,  sat: 30, light: 32 },
  stories:    { label: 'Stories',           hue: 30,  sat: 8,  light: 20 },
};

export const books = [
  { title: 'Articulating Design Decisions', subtitle: 'Communicate with Stakeholders, Keep Your Sanity, and Deliver the Best User Experience', author: 'Tom Greever', category: 'design',
    src: 'Articulating Design Decisions/01. Articulating Design Decisions.md', keyIdeas: 'Articulating Design Decisions/02. Key Ideas – Articulating Design Decisions.md' },
  { title: 'Atomic Habits', subtitle: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones', author: 'James Clear', category: 'mind',
    src: 'Atomic Habits/01. Atomic Habits by James Clear.md', keyIdeas: 'Atomic Habits/02. Key Ideas – Atomic Habits.md' },
  { title: 'Beyond Tools', author: 'Amit Das', category: 'design', src: 'Beyond Tools/Beyond Tools by Amit Das.md' },
  { title: 'Born a Crime', subtitle: 'Stories from a South African Childhood', author: 'Trevor Noah', category: 'stories', src: 'Born A Crime – Trevor Noah.md' },
  { title: 'Build', subtitle: 'An Unorthodox Guide to Making Things Worth Making', author: 'Tony Fadell', category: 'work',
    src: 'Build/00 Build – MOC.md', index: true, keyIdeas: 'Build/Key Ideas – Build by Tony Fadell.md' },
  { title: 'Building a Second Brain', subtitle: 'A Proven Method to Organize Your Digital Life and Unlock Your Creative Potential', author: 'Tiago Forte', category: 'notes', src: 'Building a Second Brain by Tiago Forte.md' },
  { title: 'Creative Selection', subtitle: 'Inside Apple’s Design Process During the Golden Age of Steve Jobs', author: 'Ken Kocienda', category: 'stories',
    src: 'Creative Selection/Creative Selection – by Ken Kocienda.md', index: true, keyIdeas: 'Creative Selection/Key Ideas.md' },
  { title: 'Creativity, Inc.', subtitle: 'Overcoming the Unseen Forces That Stand in the Way of True Inspiration', author: 'Ed Catmull', category: 'work',
    src: 'Creativity Inc./01. Creativity, Inc. by Ed Catmull.md', keyIdeas: 'Creativity Inc./02. Key Ideas – Creativity Inc.md' },
  { title: 'Death by Meeting', subtitle: 'A Leadership Fable', author: 'Patrick Lencioni', category: 'work',
    src: 'Death by Meeting/01. Death by Meeting.md', keyIdeas: 'Death by Meeting/02. Key Ideas – Death by Meeting.md' },
  { title: 'Deep Work', subtitle: 'Rules for Focused Success in a Distracted World', author: 'Cal Newport', category: 'mind',
    src: 'Deep Work/Deep Work – Rules for Focused Success in a Distracted World – Cal Newport.md', index: true },
  { title: 'The Design Thinking Playbook', author: 'Michael Lewrick, Patrick Link & Larry Leifer', category: 'design',
    src: 'Design Thinking Playbook/01. The Design Thinking Playbook by Michael Lewrick, Patrick Link and Larry Leifer.md' },
  { title: 'Design Your Thinking', subtitle: 'The Mindsets, Toolsets and Skill Sets for Creative Problem-solving', author: 'Pavan Soni', category: 'design',
    src: 'Design Your Thinking/Design Your Thinking by Pavan Soni.md', index: true },
  { title: 'Die with Zero', subtitle: 'Getting All You Can from Your Money and Your Life', author: 'Bill Perkins', category: 'money', src: 'Die With Zero by Bill Perkins.md' },
  { title: 'Digital Minimalism', subtitle: 'Choosing a Focused Life in a Noisy World', author: 'Cal Newport', category: 'mind',
    src: 'Digital Minimalism – Choosing a Focused Life in a Noisy World By Cal Newport.md' },
  { title: 'Digital Zettelkasten', subtitle: 'Principles, Methods, and Examples', author: 'David Kadavy', category: 'notes', src: 'Digital Zettelkasten – Principles, Methods, and Examples.md' },
  { title: 'Ego Is the Enemy', author: 'Ryan Holiday', category: 'mind', src: 'Ego is the Enemy by Ryan Holiday.md' },
  { title: 'Forever Employable', subtitle: 'How to Stop Looking for Work and Let Your Next Job Find You', author: 'Jeff Gothelf', category: 'work', src: 'Forever Employable – Jeff Gothelf.md' },
  { title: 'Hatching Twitter', subtitle: 'A True Story of Money, Power, Friendship, and Betrayal', author: 'Nick Bilton', category: 'stories', src: 'Hatching Twitter by Nick Bilton.md' },
  { title: 'How to Take Smart Notes', subtitle: 'One Simple Technique to Boost Writing, Learning and Thinking', author: 'Sönke Ahrens', category: 'notes', src: 'How to Take Smart Notes – Sonke Ahrens.md' },
  { title: 'I Hate Running and You Can Too', author: 'Brendan Leonard', category: 'mind', src: 'I Hate Running and You Can Too by Brendan Leonard.md' },
  { title: 'I Will Teach You to Be Rich', author: 'Ramit Sethi', category: 'money', src: 'I Will Teach You To Be Rich by Ramit Sethi.md' },
  { title: 'Information Architecture for the World Wide Web', author: 'Peter Morville & Louis Rosenfeld', category: 'design', src: 'Information Architecture for the World Wide Web.md' },
  { title: 'Insanely Simple', subtitle: 'The Obsession That Drives Apple’s Success', author: 'Ken Segall', category: 'design', src: 'Insanely Simple – The Obsession That Drives Apple\'s Success.md' },
  { title: 'Introducing Psychology', author: 'Nigel C. Benson', category: 'mind', src: 'Introducing Psychology.md' },
  { title: 'Life to the Limit', subtitle: 'My Autobiography', author: 'Jenson Button', category: 'stories', src: 'Jenson Button – Life to the Limit – My Autobiography by Jenson Button.md' },
  { title: 'Jony Ive', subtitle: 'The Genius Behind Apple’s Greatest Products', author: 'Leander Kahney', category: 'stories', src: 'Jony Ive – The Genius Behind Apple’s Greatest Products – Leander Kahney.md' },
  { title: 'Keep Going', subtitle: '10 Ways to Stay Creative in Good Times and Bad', author: 'Austin Kleon', category: 'creativity', src: 'Keep Going – 10 Ways to Stay Creative in Good Times and Bad – Austin Kleon.md' },
  { title: 'Made to Stick', subtitle: 'Why Some Ideas Survive and Others Die', author: 'Chip Heath & Dan Heath', category: 'notes',
    src: 'Made to Stick – Why Some Ideas Survive and Others Die by Dan Heath, Chip Heath.md', keyIdeas: 'Made to Stick/Key Ideas.md' },
  { title: 'Make Time', subtitle: 'How to Focus on What Matters Every Day', author: 'Jake Knapp & John Zeratsky', category: 'mind', src: 'Make Time – Jake Knapp.md' },
  { title: 'The Making of a Manager', subtitle: 'What to Do When Everyone Looks to You', author: 'Julie Zhuo', category: 'work', src: 'Making of a Manager/01. Making of a Manager by Julie Zhuo.md', index: true },
  { title: 'Maybe You Should Talk to Someone', author: 'Lori Gottlieb', category: 'mind', src: 'Maybe You Should Talk to Someone.md' },
  { title: 'Microinteractions', subtitle: 'Designing with Details', author: 'Dan Saffer', category: 'design', src: 'Microinteractions/01. Microinteractions by Dan Saffer.md' },
  { title: 'No Filter', subtitle: 'The Inside Story of Instagram', author: 'Sarah Frier', category: 'stories', src: 'No Filter – The Inside Story of Instagram by Sarah Frier.md' },
  { title: 'Project Hail Mary', author: 'Andy Weir', category: 'stories', src: 'Project Hail Mary/00 Project Hail Mary by Andy Weir.md', index: true },
  { title: 'The Psychology of Money', subtitle: 'Timeless Lessons on Wealth, Greed, and Happiness', author: 'Morgan Housel', category: 'money', src: 'The Psychology of Money/The Psychology of Money – Morgan Housel.md', index: true },
  { title: 'Range', subtitle: 'How Generalists Triumph in a Specialized World', author: 'David Epstein', category: 'work', src: 'Range – How Generalists Triumph in a Specialized World by David Epstein.md' },
  { title: 'Refactoring UI', author: 'Adam Wathan & Steve Schoger', category: 'design', src: 'Refactoring UI by Adam Watham and Steve Schoger.md' },
  { title: 'Rejection Proof', subtitle: 'How I Beat Fear and Became Invincible', author: 'Jia Jiang', category: 'mind', src: 'Rejection Proof by Jia Jiang.md' },
  { title: 'Rework', subtitle: 'Change the Way You Work Forever', author: 'Jason Fried & David Heinemeier Hansson', category: 'work', src: 'ReWork by Jason Fried and DHH.md' },
  { title: 'Ruined by Design', subtitle: 'How Designers Destroyed the World, and What We Can Do to Fix It', author: 'Mike Monteiro', category: 'design', src: 'Ruined by Design by Mike Moneiro.md' },
  { title: 'Seinfeldia', subtitle: 'How a Show About Nothing Changed Everything', author: 'Jennifer Keishin Armstrong', category: 'stories', src: 'Seinfeldia by Jennifer Armstrong.md' },
  { title: 'Show Your Work!', subtitle: '10 Ways to Share Your Creativity and Get Discovered', author: 'Austin Kleon', category: 'creativity', src: 'Show Your Work by Austin Kleon.md' },
  { title: 'Steal Like an Artist', subtitle: '10 Things Nobody Told You About Being Creative', author: 'Austin Kleon', category: 'creativity', src: 'Steal Like an Artist by Austin Kleon.md' },
  { title: 'Steve Jobs', author: 'Walter Isaacson', category: 'stories', src: 'Steve Jobs/00. Steve Jobs – The Exclusive Biography.md' },
  { title: 'Street Photography', subtitle: '50 Ways to Capture Better Shots of Ordinary Life', author: 'Eric Kim', category: 'creativity', src: 'Street Photography – 50 Ways to Capture Better Shots of Ordinary Life.md' },
  { title: 'Supercharge Your Reading', author: 'Maneetpaul Singh', category: 'notes', src: 'Supercharge Your Reading.md' },
  { title: 'The Airbnb Story', subtitle: 'How Three Guys Disrupted an Industry, Made Billions of Dollars … and Plenty of Enemies', author: 'Leigh Gallagher', category: 'stories', src: 'The Airbnb Story by Leigh Gallagher.md' },
  { title: 'The Laws of Simplicity', author: 'John Maeda', category: 'design',
    src: 'The Laws of Simplicity/00. The Laws of Simplicity.md', keyIdeas: 'The Laws of Simplicity/01. Key Ideas.md' },
  { title: 'The Office', subtitle: 'The Untold Story of the Greatest Sitcom of the 2000s', author: 'Andy Greene', category: 'stories', src: 'The Office by Andy Greene.md' },
  { title: 'The Product Book', subtitle: 'How to Become a Great Product Manager', author: 'Product School', category: 'work', src: 'The Product Book by Product School.md' },
  { title: 'Total Competition', subtitle: 'Lessons in Strategy from Formula One', author: 'Ross Brawn & Adam Parr', category: 'work', src: 'Total Competition – Lesson in Strategy From Formula One.md' },
  { title: 'User Friendly', subtitle: 'How the Hidden Rules of Design Are Changing the Way We Live, Work & Play', author: 'Cliff Kuang & Robert Fabricant', category: 'design',
    src: 'User Friendly/00 User Friendly – How the Hidden Rules of Design are Changing the Way We Live, Work & Play.md' },
  { title: 'Writing to Learn', subtitle: 'How to Write — and Think — Clearly About Any Subject at All', author: 'William Zinsser', category: 'notes', src: 'Writing to Learn by William Zinsser.md' },
];
