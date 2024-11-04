// (default) static word limit for bionic formatting
let BIONIC_WORD_PREFIX_LIMIT = 3;

/**
 * Function to convert text on a page to a Bionic Reading representation.
 *
 * @param {string} textContentContainerSelector Selector on which to perform the bionification of text
 */
const diyOnicConverter = (
  textContentContainerSelector = 'body',
  prefixLimit = BIONIC_WORD_PREFIX_LIMIT
) => {
  // update prefix limit to allow for custom value
  BIONIC_WORD_PREFIX_LIMIT = prefixLimit;
  const container = document.querySelector(textContentContainerSelector);

  // if our selector is a single paragraph, we can skip the
  // querySelectorAll query below, and just use a single element
  // array of our `container` to loop over.
  const isContainerAParagraph = container.nodeName.toLowerCase() === 'p';

  console.log(
    `Performing bionic reading conversion on \`${textContentContainerSelector}\`...`
  );

  // Let's find all the paragraph nodes within our container
  // (if it's a non-paragraph); otherwise, we operate directly
  // on the container.
  const paragraphs = isContainerAParagraph
    ? [container]
    : container.querySelectorAll('p');

  for (const paragraph of paragraphs) {
    // Create a container to hold our newly formatted content
    const fragment = document.createDocumentFragment();
    paragraph.childNodes.forEach(child => {
      fragment.appendChild(processNode(child));
    });

    paragraph.innerHTML = '';
    paragraph.appendChild(fragment);
  }
};

/**
 * Recursively process each node within the given node to apply bionic
 * formatting. Preserves non-text nodes (ie: images and links)
 *
 * @param {Node} node The Node to recursively process
 * @returns {Node} The processed node with bionic formatting aplied to "text" nodes only
 */
const processNode = node => {
  // If we have a simple text node, let's format it to be bionic.
  if (node.nodeType === Node.TEXT_NODE) {
    // Replace any additional whitespace with just a single space,
    // then split the paragraph into separate words, so we can
    // iterate and perform our bionic formatting.
    const words = node.textContent.replace(/\s+/g, ' ').split(' ');
    const bionicWords = words.map(bionicifyWord);

    // create a temporary <template> to hold our formatted content,
    // so as not to introduce additional tags (ie: span)
    const template = document.createElement('template');
    template.innerHTML = bionicWords.join(' ');
    return template.content;
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    (node.nodeName === 'B' || node.nodeName === 'STRONG')
  ) {
    // If we're processing a <b> or <strong> node, strip it and process
    // just its text content.
    return processNode(document.createTextNode(node.textContent));
  }
  // otherwise, we'll clone our node, and recurse over its children
  else if (node.nodeType === Node.ELEMENT_NODE) {
    const clone = node.cloneNode(false);
    Array.from(node.childNodes).forEach(child => {
      clone.appendChild(processNode(child));
    });

    return clone;
  }

  // unprocessed node (neither text, nor an element)
  return node;
};

/**
 * Create a Bionic-formatted word variant
 *
 * @param {string} word Word to Bionic-ify
 * @returns Bionic-formatted representation of `word`
 */
const bionicifyWord = word => {
  // empty string, we exit;
  if (word === '') return;

  // separate the word into its bionic-formatted variant
  const leading = `<strong>${word.slice(0, BIONIC_WORD_PREFIX_LIMIT)}</strong>`;
  const trailing = word.slice(BIONIC_WORD_PREFIX_LIMIT);

  // Bionic-formatted word
  return `${leading}${trailing}`;
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
