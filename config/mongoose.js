

//changes from here
const mongoose = require('mongoose');
const db = process.env.MONGODB_URI || 'mongodb+srv://dbUser:asdfghjkl@cluster0.1u8dw.mongodb.net/coding-vybe?retryWrites=true&w=majority';
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`connection successful`);
}).catch((err)=> console.log(`no connection`));



