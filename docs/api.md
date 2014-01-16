# User model

    {
      _id: String
      username: String,
      password: String,
      messages: Array[ MessageId: String ],
      points: Number
    }

# Message model

    {
      _id: String,
      body: String,
      created: Date,
      modified: Date
    }

# Api

## POST /api/users/register

### request body

    {
      username: String,
      password: String
    }

### response

    {
      result: User
    }

## POST /api/users/login

### request body

    {
      username: String,
      password: String
    }

### response

    {
      result: User
    }

## GET /api/users/logout

### response

    {
      result: Boolean
    }

## POST /api/messages

### request body

    {
      body: String
    }

### response 

    {
      result: Message
    }

## GET /api/messages?query

### request query

  * `pattern` - JSON.stringify Object
  * `sort` - JSON.stringify Object
  * `limit` - Number
  * `offset` - Number

### response

    {
      result: Array[ Message ]
      total: Number
    }