import mongoose from 'mongoose';

const connectDB =  () => {
  return mongoose
    .connect("mongodb+srv://talmosko:talM@cluster0.o2xi2bl.mongodb.net/subscriptionsDB")
};

export default connectDB;
