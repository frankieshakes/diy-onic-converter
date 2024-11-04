# diy-onic-converter
Coding challenge to make your own (DIY) “bionic reading converter.”

```
___________      .__                   ._____________              
\_   _____/______|__| ____   ____    __| _/\______   \__ __ ___.__.
 |    __) \_  __ \  |/ __ \ /    \  / __ |  |    |  _/  |  <   |  |
 |     \   |  | \/  \  ___/|   |  \/ /_/ |  |    |   \  |  /\___  |
 \___  /   |__|  |__|\___  >___|  /\____ |  |______  /____/ / ____|
     \/                  \/     \/      \/         \/       \/     
          FRIENDBUY -- CODE SUBMISSION BY FRANCESCO MANNO
```

Please accept the following submission for the FriendBuy interview round.

The `diyOnicConverter` function queries for a matching selector. If found, it loops over each `<p>` tag contained within it. It uses a recursive function, `processNode`, to process any child nodes (text, element) in order to preserve non-text nodes (ie: links, images). Once all elements have been processed, the paragraph's content is replaced with the newly formatted (Bionic) text.

The code can be executed by calling the `diyOnicConverter` function with any of the following variants:

* `diyOnicConverter()` - Defaults to the `body` element
* `diyOnicConverter(selector)` - Performs Bionification on the provided selector
* `diyOnicConverter(selector, prefixLimit)` - Performs Bionification on the provided selector and with a custom prefix limit for each word.

Additional functionality has been added:

* The conversion preserves non-word Elements (ie: `<img>`, `<a>`, etc.)
* Custom prefix limit for each word (called via `diyOnicConverter(selector, prefixLimit)`)
* Upon load of the page, a "Bionic" widget (button) is appended to the bottom of the window. Clicking the button will toggle the Bionic conversion.
  * Note: The widget has an edge case where it does not preserve scroll position.

-------

The code may be copy/pasted into any web page (via the dev console) and executed from there (including the widget/button).


Thank you for the opportunity!

Francesco (Frank) Manno