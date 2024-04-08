export const PORT = 5555;

const dev_mongoDBURL = 
  'mongodb+srv://admin:usmu93cK@tenzies.xexj72f.mongodb.net/users?retryWrites=true&w=majority&appName=Tenzies'

export const mongoDBURL = process.env.MONGODB_URI || dev_mongoDBURL

