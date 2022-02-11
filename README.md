## Assumptions

<!-- - System types are static, and only consist of the ones shown in the given sample data. Making this assumption seemed reasonable based on the problem space, and allowed me to not have to piddle around making likely marginal performance optimizations -->

## Notes

- I helped myself to some of your data files [here](https://github.com/ethyca/fideslang) 😀
- For filter functionality, one could make the case that I should hide options that don't apply for the current dataset, as they're noisey, and kind of pointless. In the interest of trying to decouple my solution from the dataset, and in the interest of time, I simply show all possibilities as a default. This could definitely change in the future
- I made the conscious choise to represent JSON constants (such as the given sample data) in TS files. This is a preference, as it gives me the option to name the export, and allows me to do some more strict typing if I want to
- Ideally, I would have gotten the user-facing functionality to my liking before doing any refactors. In this case, I had some free time when I had no WiFi (so I couldn't develop features), so I refactored then 🤷🏼

## If I had more time...

- More documentation (i.e. components and their props, helper functions, constants, etc.)
- I would definitely get more serious about my CSS usage. i.e. collect constants for sizes, colors, etc., use px or rems consistently, and better yet, pull in Tailwind 😜
- Find a much more useful and visually appealing way to show our dependency arrows. Right now, it's pretty messy, and hard to parse exactly what's going on. For example...
  - Define an actual color palette for the colors of the arrows (right now it's just a hex based on a hash of the `fides_key` of a system)
  - Make sure that arrows don't overlap at their endpoint (as is, it's hard to tell which arrows actually make it to a system's card)
