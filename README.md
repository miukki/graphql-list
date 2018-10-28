#Play with GraphQL
```
cd server
yarn graphql
```
#GraphiQL
```
{
  trip(id: 1) {
    name
    owner {
      id
      name
    }
  }
}

{
  owner(id: 1) {
    name
    trips {
      name
    }
  }
}
```
#DB MLAB


