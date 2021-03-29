/* eslint max-len: 0 */

export {
  quizPages,
  possibleResults,
}
const quizPages = [
  {
    id: `build`,
    question: `What do you want to build?`,
    possibleAnswers: [
      {
        text:
          `
          I want to build applications that process complex data behind the scenes, giving the user powerful data and insights.
          `,
        scores: { js: 0, ruby: 2, hoon: 0 },
        myReply:
          `
          I'm pretty sure Ruby does this. Right? Yeah, Ruby does this. Or something. I'll ask my dad. He's been learning it. Don't take my word for it, please.
          `,
      },
      {
        text:
          `
          I want to make only the tastiest user interfaces and workflows. The DOM is my DOMain. Get it?
          `,
        scores: { js: 2, ruby: 0, hoon: 0 },
        myReply:
          `
          I get it!
          `,
      },
      {
        text:
          `
          I want to build alien technology.
          `,
        scores: { js: 0, ruby: 1, hoon: 2 },
        myReply:
          `
          Oh boy, do I have the language for you!
          `,
      },
    ],
  },
  {
    id: `verbosity`,
    question: `Do you like words or symbols as names for things?`,
    possibleAnswers: [
      {
        text:
          `
          Words! Using the right part of speech is the best practice, even if the word is long. I hate having to remember weird shorthands for things, odd terminology, or arcane symbols.
          `,
        scores: { js: 2, ruby: 1, hoon: 0 },
        myReply:
          `
          Sounds like you name your functions well.
          `,
      },
      {
        text:
          `
          I like words, but short words are best.
          `,
        scores: { js: 1, ruby: 2, hoon: 0 },
        myReply:
          `
          Understandable.
          `,
      },
      {
        text:
          `
          I like weird words and strange symbols. They make me feel like a dungeon wizard, or some kind of high-level monk.
          `,
        scores: { js: 0, ruby: 1, hoon: 2 },
        myReply:
          `
          Mmhmm, I thought you'd say that. Keep it up, I'll recommend a really weird language.
          `,
      },
    ],
  },
  {
    id: `paradigm`,
    question: `Do you prefer declarative or imperative programming?`,
    possibleAnswers: [
      {
        text:
          `
          Declarative. I like writing functions named after their purpose or goal, and the feeling that comes from that, like I am delegating down to them, and giving them responsibility.
          `,
        scores: { js: 0, ruby: 2, hoon: 2 },
        myReply:
          `
          Very wise. In time they will respect you for it.
          `,
      },
      {
        text:
          `
          Imperative. I like to give very specific instructions in precise order. If I'm not micromanaging the computer, I feel like it's gonna get lazy and stop listening to me.
          `,
        scores: { js: 2, ruby: 2, hoon: 0 },
        myReply:
          `
          Smart. Never trust 'em.
          `,
      },
    ],
  },
  {
    id: `typing`,
    question:
      `
      What sort of typing discipline would you like your language to have?
      `,
    possibleAnswers: [
      {
        text:
          `
          Dynamic / Weak. I don't want to have to declare the types of my variables at any time and I want to be free to change their types whenever.
          `,
        scores: { js: 2, ruby: 0, hoon: 0 },
        myReply:
          `
          Sounds like you have a taste for danger! Careful out there!
          `,
      },
      {
        text:
          `
          Dynamic / Strong. I don't want to declare my types but I want clear errors if I add a number and a string, for example.
          `,
        scores: { js: 0, ruby: 2, hoon: 0 },
        myReply:
          `
          Very prudent of you.
          `,
      },
      {
        text:
          `
          Static / Strong. I want my types locked down. I want to declare them beforehand and I want to know when I did something wrong with them.
          `,
        scores: { js: 0, ruby: 0, hoon: 2 },
        myReply:
          `
          Sounds very safe.
          `,
      },
      {
        text:
          `
          Static / Weak. I want to declare types but I don't need the program to make a fuss about what I do with them.
          `,
        scores: { js: 0, ruby: 0, hoon: 0 },
        myReply:
          `
          How strange! Did you really mean to say this? For what possible reason would you prefer it this way?
          `,
      },
    ],
  },
  {
    id: `feedback1`,
    question:
      `
      So, this is pretty good quiz, eh?
      `,
    possibleAnswers: [
      {
        text:
          `
          Yes, it is.
          `,
        scores: { js: 1, ruby: 0, hoon: 0 },
        myReply:
          `
          Thank you!
          `,
      },
    ],
  },
  {
    id: `feedback2`,
    question:
      `
      Be honest, what do you really think?
      `,
    possibleAnswers: [
      {
        text:
          `
          It's pretty cool.
          `,
        scores: { js: 0, ruby: 0, hoon: 0 },
        myReply:
          `
          Eh, I kinda went overboard...
          `,
      },
      {
        text:
          `
          Um,
          `,
        scores: { js: -100, ruby: -100, hoon: -100 },
        myReply:
          `
          Eh, I kinda went overboard...
          `,
      },
    ],
  },
  {
    id: `feedback3`,
    question:
      `
      Sorry. I'll get back to asking questions now.
      `,
    possibleAnswers: [
      {
        text:
          `
          OK.
          `,
        scores: { js: 1000, ruby: 1000, hoon: 1000 },
        myReply:
          `
          Let's see...
          `,
      },
    ],
  },
  {
    id: `facebook`,
    question: `You really hate Facebook. Why do you hate Facebook so much?`,
    possibleAnswers: [
      {
        text: `It's so obnoxious how they always advertise at you.`,
        scores: { js: 0, ruby: 0, hoon: 100 },
        myReply: `I hate obnoxious things!`,
      },
      {
        text:
        `
        They want to get me hooked on delicious dopamine doses--and strung out big time!
        `,
        scores: { js: 0, ruby: 0, hoon: 2 },
        myReply: `Do you mean like drugs?`,
      },
      {
        text:
          `
          I don't like that they're selling my data to the big top secret corporate gubbermint without at LEAST asking me nice!
          `,
        scores: { js: 0, ruby: 0, hoon: 100 },
        myReply: `You tell 'em, partner!`,
      },
      {
        text:
          `
          I don't hate Facebook! And This question seems biased.
          `,
        scores: { js: 0, ruby: 0, hoon: -100 },
        myReply:
          `
          Okay, wow, get down off your high horse, buddy.
          `,
      },
      {
        text:
          `
          That dang Zuckerbert is a spooky homunculus (monsterman) who haunts me personally on a daily basis.
          `,
        scores: { js: 0, ruby: 0, hoon: 20 },
        myReply: `Yes. So true.`,
      },
    ],
  },
  {
    id: `urbit1`,
    question: `Have you heard of urbit?`,
    possibleAnswers: [
      {
        text:
          `
          Yes, hasn't everyone?
          `,
        scores: { js: 0, ruby: 0, hoon: 100 },
        myReply: `Not yet! Tell everyone!`,
      },
      {
        text:
          `
          No. What's that?
          `,
        scores: { js: 0, ruby: 0, hoon: 100 },
        myReply: `It's this crazy thing I heard about!`,
      },
      {
        text:
          `
          No.
          `,
        scores: { js: 0, ruby: 0, hoon: 0 },
        myReply: `Just wait till you hear!`,
      },
      {
        text:
          `
          No. I feel like you're just wasting time at this point.
          `,
        scores: { js: 0, ruby: 0, hoon: -1 },
        myReply: `Excuse me, I'm running a quiz here.`,
      },
    ],
  },
  {
    id: `urbit2`,
    question:
      `
      What are your feelings, if any, about the following statement:
      `,
    possibleAnswers: [
      {
        text:
          `
          ...
          `,
        reply: `*ahem*`,
      },
    ],
  },
  {
    id: `urbit2`,
    question:
      `
      "Urbit is a clean-slate OS and network for the 21st century."
      `,
    possibleAnswers: [
      {
        text: `Very good`,
        scores: { js: 0, ruby: 0, hoon: 100 },
      },
      {
        text: `Neutral`,
      },
      {
        text: `Very bad`,
        scores: { js: 0, ruby: 0, hoon: -100 },
      },
    ],
  },
  {
    id: `urbit3`,
    question:
      `
      Thank you... And what about the following statement:
      `,
    possibleAnswers: [
      { text: `...` },
    ],
  },
  {
    id: `urbit4`,
    question:
      `
      "Urbit OS is a reimagining of the operating system as an ‘overlay OS.’ \n \n
      It's a compact system for an individual to run their own permanent personal server on any Unix machine with an internet connection.
      "
      `,
    possibleAnswers: [
      {
        text: `Strongly Agree`,
        scores: { js: 0, ruby: 0, hoon: 100 },
      },
      {
        text: `Agree`,
      },
      {
        text: `Neither Agree nor Disagree`,
      },
    ],
  },
  {
    id: `urbit5`,
    question:
      `
      Your response has been... Yes, there's another one:
      `,
    possibleAnswers: [
      { text: `...` },
    ],
  },
  {
    id: `urbit6`,
    question:
      `
      "Urbit ID is a decentralized digital identity system. Your Urbit ID is a username, network address, and crypto wallet."
      `,
    possibleAnswers: [
      {
        text: `Emphatically Agree`,
        scores: { js: 0, ruby: 0, hoon: 100 },
      },
      {
        text: `Resignedly Agree`,
      },
    ],
  },
  {
    id: `urbit7`,
    question:
      `
      Just one more:
      `,
    possibleAnswers: [
      { text: `...` },
    ],
  },
  {
    id: `urbit8`,
    question:
      `
      Urbit OS + Urbit ID are designed to work together as a single system, are completely open source, and 100% owned by the people who use them.
      `,
    possibleAnswers: [
      {
        text: `Wow, amazing! Can learn more about it on a weird website?`,
        scores: { js: 0, ruby: 0, hoon: 100 },
      },
      {
        text: `This is so annoying. Can I be done now?`,
      },
    ],
  },
  {
    id: `urbit9`,
    question:
      `
      Yes you can
      `,
    possibleAnswers: [
      {
        text: `Oh?`,
      },
    ],
  },
]

const possibleResults = {
  js: {
    id: `js`,
    nameOfLanguage: `Javascript`,
    description:
      `
      Javascript is the language of the web. It was commissioned for the Netscape Navigator browser as a way of bringing interactivity to then-static pages. Twenty-five years later, it defines the user experience of the internet.
      `,
    url: `https://developer.mozilla.org/en-US/docs/Web/JavaScript`,
  },
  ruby: {
    id: `ruby`,
    nameOfLanguage: `Ruby`,
    description:
      `
      Ruby is a high-level, multi-paradigm language, which means you can do some really complicated stuff with it, like design other programming languages. Ruby is often used in data centers to process data for web apps.
      `,
    url: `https://www.ruby-lang.org/en/documentation/`,
  },
  hoon: {
    id: `hoon`,
    nameOfLanguage: `Hoon`,
    description:
      `
      Hoon is a esoteric language designed for the peer-to-peer networking platform Urbit. Hoon is a functional language (meaning everything is input-output, with NO side-effects) with a highly idiosyncratic syntax made of what urbiters call 'runes.' |= 'bartis', ++ 'luslus',  and ?> 'wutgar', are a few of the many, many examples. Don't ask me what they do, because I don't remember. I just think hoon is pretty and would love to learn to write it one day. Maybe we can learn it together!
      `,
    url: `https://urbit.org/docs/glossary/hoon/`,
  },
}
