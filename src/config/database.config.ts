import * as mongoose from 'mongoose';

export class DatabaseConfig {
  public static URI: string = "mongodb://localhost:27017/local";

  public static connect() {
    mongoose.connect(this.URI);
    this.init();
  }

  private static init() {
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + DatabaseConfig.URI);
    });

    mongoose.connection.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });
 
    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
      });
    });
  }

  public static disconnect() {
    mongoose.disconnect();
  }
}