# MVP Calculator
The main differences between CalculatorMVP and CalculatorMVC :

- Presenter instead of a controller
- The relation between a view and a presenter is always 1 to 1.
- Passive views for reusable components
- The contract between the presenter and the view allows for easy component swapping.

The presenter object is inspired by the presentation model pattern
A great implementation is when the presenter is designed as a `Supervising Controller` where it retrieves all the data useful for a view from the model, and in parallel it should handle any user interaction updating the model.

The views are passive. They just know how the rendering logic works, which leave room for integrating with CSS styles and animation.
