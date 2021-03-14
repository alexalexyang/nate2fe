# Todo

- Remake: layout, profile, settings
- Match people if they like at least 5 of the same movies
- Make new yes/no buttons

- Auth CRUD

  - Remember to set up which Auth0 tenant to add user to and delete from.
  - Delete is in [hooks](https://manage.auth0.com/dashboard/eu/alexalexyang/hooks).

- invite-form.tsx:
  - render invited and alreadyInvited
- Delete user from MongoDb when user deletes self.

# References

[MUI Palette colors](https://material-ui.com/customization/color/)

[Next function component type](https://stackoverflow.com/questions/49929268/using-getinitialprops-in-next-js-with-typescript/57441122#57441122)

[node-auth0's other docs](https://auth0.github.io/node-auth0/module-management.ClientGrantsManager.html#create)

Mongoose kept breaking with this [problem](https://github.com/vercel/next.js/discussions/12229) so I went directly with the MongoDB client according to [this](https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel) solution instead.

# Licenses

[Font Awesome Creative Commons Attribution 4.0 International license](https://fontawesome.com/license)
