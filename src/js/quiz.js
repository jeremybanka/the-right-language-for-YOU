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
          I get it! I wrote that joke!! 😎 *winks from behind sunglasses*
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
          Oh boy, do I have the language for you...
          `,
      },
    ],
  },
  {
    id: `verbosity`,
    question: `Do like words or symbols as names for things?`,
    possibleAnswers: [
      {
        text:
          `
          Words! Using the right part of speech are the best, even if the word is long. I hate having to remember weird shorthands for things, odd terminology, or arcane symbols.
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
          Sweet! Sounds like you know a lot about programming!
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
          Sweet! Sounds like you know a lot about programming!
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
          Sweet! Sounds like you know a lot about programming!
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
          Sweet! Sounds like you know a lot about programming!
          `,
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
      Hoon is a esoteric language designed for the peer-to-peer networking platform Urbit. Hoon is a functional language (meaning everything is input-output, with NO side-effects) with a highly idiosyncratic syntax made of what urbiters call 'runes.' |= 'bartis', ++ 'luslus',  and ?> 'wutgar', are a few of the many, many examples. Don't ask me what they do, because I don't remember. I just think hoon is pretty and would love to learn to write it one day.
      `,
    url: `https://urbit.org/docs/glossary/hoon/`,
  },
}
