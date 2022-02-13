## Assumptions

<!-- - System types are static, and only consist of the ones shown in the given sample data. Making this assumption seemed reasonable based on the problem space, and allowed me to not have to piddle around making likely marginal performance optimizations -->

## Notes

- I helped myself to some of your data files [here](https://github.com/ethyca/fideslang) 😀
- For filter functionality, one could make the case that I should hide options that don't apply for the current dataset, as they're noisey, and kind of pointless. In the interest of trying to decouple my solution from the dataset, and in the interest of time, I simply show all possibilities as a default. This could definitely change in the future
- I made the conscious choise to represent JSON constants (such as the given sample data) in TS files. This is a preference, as it gives me the option to name the export, and allows me to do some more strict typing if I want to
- Ideally, I would have gotten the user-facing functionality to my liking before doing any refactors. In this case, I had some free time when I had no WiFi (so I couldn't develop features), so I refactored then 🤷🏼
- Excuse the verbose documentation / TODOs I left in the cose. In a production / team environment, I would decide to act on them, or make a follow up task for them, and remove the inline TODO. But here, I thought it was more helpful in the context of a take home to leave my thoughts where relevant...
- For now, I kept Applications and Services in separate columns / groups. The fact that some Applications had system dependencies on Services was the main factor here, as the graph seemed odd to draw with arrows pointing to systems in the same column. But down the line when this app could have a more robust and fluid graph, that might not be so intractable...

## If I had more time...

- Any / all `TODO`s left in the code
- More documentation (i.e. components and their props, helper functions, constants, etc.)
- I would definitely get more serious about my CSS usage. i.e. collect constants for sizes, colors, etc., use px or rems consistently, and better yet, pull in Tailwind 😜
- Find a much more useful and visually appealing way to show our dependency arrows. Right now, it's pretty messy, and hard to parse exactly what's going on. For example...
  - Define an actual color palette for the colors of the arrows (right now it's just a hex based on a hash of the `fides_key` of a system)
  - Make sure that arrows don't overlap at their endpoint (as is, it's hard to tell which arrows actually make it to a system's card)
- On hovering a system card, show a more detailed card of the system, that shows all information. Or a modal on click
- On hovering a system card, highlight any system dependency arrows that relate to it. Or just hide all of the other ones
- On a system card, do some kind of visual grouping of data categories with respect to their entire privacy declation. i.e. it would be nice to see the name, data subjects, and data uses for a given data category we're showing, to give context on why that data is being used. Especially since some of them might be duplicated, and that's not shown right now
  - Note: This might be best saved for the modal above, if the card becomes too busy
  - There's a lot of ways to go about this and this is super not fleshed out right now 😄
- Add functionality to add, edit, and remove systems
- When filtering by data categories or data uses, highlight the relevant data categories on the card and gray out (or remove) the irrelevant ones
- Set up an actual parent relationship for inheritance for data uses and data categories. Right now, we're crudely just comparing the starts of strings. Which honestly isn't terrible, and is much simpler to implement. Still, that doesn't mean it makes me feel good when I see `startsWith` logic in the code... 😅
- Consider splitting more components out. `App` is a bit too messy right now
