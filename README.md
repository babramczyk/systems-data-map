## Assumptions

<!-- - System types are static, and only consist of the ones shown in the given sample data. Making this assumption seemed reasonable based on the problem space, and allowed me to not have to piddle around making likely marginal performance optimizations -->

## Notes

- I helped myself to some of your data files [here](https://github.com/ethyca/fideslang) 😀
- For filter functionality, one could make the case that I should hide options that don't apply for the current dataset, as they're noisey, and kind of pointless. In the interest of trying to decouple my solution from the dataset, and in the interest of time, I simply show all possibilities as a default. This could definitely change in the future
- I made the conscious choise to represent JSON constants (such as the given sample data) in TS files. This is a preference, as it gives me the option to name the export, and allows me to do some more strict typing if I want to
- Ideally, I would have gotten the user-facing functionality to my liking before doing any refactors. In this case, I had some free time when I had no WiFi (so I couldn't develop features), so I refactored then 🤷🏼
