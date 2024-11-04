// static word limit for bionic formatting
const BIONIC_WORD_LIMIT = 3;

const diyOnicConverter = (textContentContainerSelector = 'body') => {
  const container = document.querySelector(textContentContainerSelector);

  // if our selector is a single paragraph, we can skip the
  // querySelectorAll query below, and just use a single element
  // array of our `container` to loop over.
  const isContainerAParagraph = container.nodeName.toLowerCase() === 'p';

  console.log('Performing bionic reading conversion on:', container);

  // Let's find all the paragraph nodes within our container
  // (if it's a non-paragraph); otherwise, we operate directly
  // on the container.
  const paragraphs = isContainerAParagraph
    ? [container]
    : container.querySelectorAll('p');

  for (const paragraph of paragraphs) {
    // Split the paragraph into its separate words, so we
    // can iterate and perform our bionic formatting.
    const words = paragraph.innerText.split(' ');
    const bionicWords = words.map(word => {
      const leading = `<strong>${word.slice(0, BIONIC_WORD_LIMIT)}</strong>`;
      const trailing = word.slice(BIONIC_WORD_LIMIT);

      // Bionic-formatted word
      return `${leading}${trailing}`;
    });

    // Replace the original paragraph with the joined bionicWords
    paragraph.innerHTML = bionicWords.join(' ');
  }
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
