/**
 *
 *    ___________      .__                   ._____________
 *    \_   _____/______|__| ____   ____    __| _/\______   \__ __ ___.__.
 *    |    __) \_  __ \  |/ __ \ /    \  / __ |  |    |  _/  |  <   |  |
 *    |     \   |  | \/  \  ___/|   |  \/ /_/ |  |    |   \  |  /\___  |
 *    \___  /   |__|  |__|\___  >___|  /\____ |  |______  /____/ / ____|
 *        \/                  \/     \/      \/         \/       \/
 *
 *            FRIENDBUY -- CODE SUBMISSION BY FRANCESCO MANNO
 */

// (default) static word limit for bionic formatting
let BIONIC_WORD_PREFIX_LIMIT = 3;
let originalContent; // reference to original (non-bionic) content

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

  if (originalContent) {
    container.parentNode.replaceChild(originalContent, container);
    originalContent = null;
    return;
  } else {
    originalContent = container.cloneNode(true);
  }

  console.log({ originalContent });

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
  const leading = `<b>${word.slice(0, BIONIC_WORD_PREFIX_LIMIT)}</b>`;
  const trailing = word.slice(BIONIC_WORD_PREFIX_LIMIT);

  // Bionic-formatted word
  return `${leading}${trailing}`;
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;

/**
 * IIFE to append a Bionic widget/button to the page to perform
 * Bionic conversion with a single button click
 */
(async () => {
  const container = document.createElement('button');
  container.classList.add('bionic-btn');
  container.style.cssText = `border:1px solid #7fa5c7;width:40px;height:40px;position:fixed;bottom:10px;right:10px;border-radius:8px;box-shadow:0 1px 2px rgba(0,0,0,0.15);background:#bbd6f0 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16"><path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/><path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/></svg>') no-repeat 50% 50%;transition:all .3s ease-in-out;cursor:pointer;`;

  document.body.appendChild(container);

  // delegate on document so we don't lose onclick after toggling content
  document.addEventListener(
    'click',
    e => {
      if (e.target.classList.contains('bionic-btn')) {
        diyOnicConverter();
      }
    },
    false
  );
})();
