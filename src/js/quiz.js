export default [
  {
    id: `build`,
    question: `What do you want to build?`,
    possibleAnswers: [
      {
        text:
          `
          I want to build applications that process complex data 
          behind the scenes, giving the user powerful data and insights.
          `,
        scores: { js: 0, ruby: 2, hoon: 0 },
        reply:
          `
          Nice! Sounds like you'll be interested in programming application
          servers in a high-level language like Ruby!
          `,
      },
      {
        text:
          `
          I want to make only the tastiest user interfaces and workflows.
          The DOM is my DOMain.
          `,
        scores: { js: 2, ruby: 0, hoon: 0 },
      },
      {
        text:
          `
          I want to build alien technology.
          `,
        scores: { js: 0, ruby: 1, hoon: 2 },
      },
    ],
  },
  {
    id: `verbosity`,
    question: `Do like words or symbols?`,
    possibleAnswers: [
      {
        text:
          `
          Words! Normal words are the best, even if they are long. 
          I hate having to remember weird shorthands for things,
          odd terminology, or arcane symbols.
          `,
        scores: { js: 2, ruby: 1, hoon: 0 },
      },
      {
        text:
          `
          I like words, but short words are best.
          `,
        scores: { js: 1, ruby: 2, hoon: 0 },
      },
      {
        text:
          `
          I like weird words and strange symbols. 
          They make me feel like a wizard.
          `,
        scores: { js: 0, ruby: 1, hoon: 2 },
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
          Declarative (functional languages are declarative.)
          `,
        scores: { js: 0, ruby: 2, hoon: 2 },
      },
      {
        text:
          `
          Imperative (object-oriented languages are imperative.)
          `,
        scores: { js: 2, ruby: 2, hoon: 0 },
      },
    ],
  },
  {
    id: `typing`,
    question: `Do you prefer static or dynamic typing?`,
    possibleAnswers: [
      {
        text:
          `
          Static
          `,
        scores: { js: 0, ruby: 0, hoon: 2 },
        reply:
          `
          Sweet! Sounds like you know a lot about programming!
          `,
      },
      {
        text:
          `
          Dynamic
          `,
        scores: { js: 2, ruby: 2, hoon: 0 },
        reply:
          `
          Sweet! Sounds like you know a lot about programming!
          `,
      },
    ],
  },
]
