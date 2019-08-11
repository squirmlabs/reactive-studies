# MVP Calculator

The main differences between CalculatorMVP and CalculatorMVC :

- Presenter instead of a controller
- The relation between a view and a presenter is always 1 to 1.
- Passive views for reusable components
- The contract between the presenter and the view allows for easy component swapping.

The presenter object is inspired by the presentation model pattern.

A great implementation is when the presenter is designed as a `Supervising Controller` where it retrieves and updates the data useful for a view from the model. In parallel it should handle any user interaction updating the model, and retrieving the data needed to render the view.

Complex applications usually have a persistence model across the life cycle of an application. With this we could have multiple presenters that retrieve and update the application model data.

The views are passive. They just know how the rendering logic works, which leave room for integrating with CSS styles and animation.

The model and the view should not be aware of each other. Maintaining isolation between the two responsibilities will help in the case of larger applications or when we need to swap views for targeting different devices.

We could have the exact same application but with different input methods and UI patterns for different targets.

With an MVP architecture, we do the following. We maintain the behaviors inside the presenter, the business domain in the model and use `passive views` for the UI.

This allows us to have similar behaviors across the application, reusing the same code for the models and views. This also allows us to adapt target devices without much effort.


