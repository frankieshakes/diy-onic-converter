// static word limit for bionic formatting
const BIONIC_WORD_LIMIT = 3;

const diyOnicConverter = (textContentContainerSelector = 'body') => {
  const container = document.querySelector(textContentContainerSelector);

  // let's find all the paragraph nodes within our selector
  const paragraphs = container.querySelectorAll('p');

  for (const paragraph of paragraphs) {
    console.log(paragraph);

    // split the paragraph into its separate words, so we can iterate and perform
    // our bionic process
    const words = paragraph.innerText.split(' ');
    const bionicWords = words.map(word => {
      const leading = `<strong>${word.slice(0, BIONIC_WORD_LIMIT)}</strong>`;
      const trailing = word.slice(BIONIC_WORD_LIMIT);

      // return a bolded representation
      return `${leading}${trailing}`;
    });

    // Replace the original paragraph with the joined bionicWords
    paragraph.innerHTML = bionicWords.join(' ');
  }

  console.log(paragraphs);
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
