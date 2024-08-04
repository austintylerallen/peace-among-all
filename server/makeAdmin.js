const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');
        try {
            const email = 'austintallen07@gmail.com'; // Replace with the email of the user you want to make an admin
            let user = await User.findOne({ email });
            if (!user) {
                console.error('User not found');
                process.exit(1);
            }

            user.role = 'admin';
            await user.save();

            console.log(`User ${email} is now an admin`);
            mongoose.disconnect();
        } catch (err) {
            console.error('Error updating user role:', err.message);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
