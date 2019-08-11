# MVVM

This architecture usea a `View-Model` instead of a `Presenter`. 
This object will be the bridge between the data stored inside a model and the view.

The `View-Model` is responsible for preparing the shape that matches the view's contract. It is also responsible for making the data available from the `Model` to the `View`. The logic of the view-model is tightly coupled with rendering the `View`.

An real world example could be that we have Record values stored in the model with U.S. currency. A view requires the Record value to display in euro.

In MVVM the model stores the raw data, and the `View-Model` would be responsible for converting the record to the required format.

The `View-Model` has a relationship with the views that is 1 to many.