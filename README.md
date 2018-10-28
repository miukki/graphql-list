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
#DB Setup MLAB
https://mlab.com/
```
#db
mongoose.connect('mongodb://miukki:test123@ds219641.mlab.com:19641/trips')

```
#client Used script
```
yarn create react-app client
```