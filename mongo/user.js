const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://127.0.0.1:27017/test");

db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
    console.log("------数据库连接成功！------");
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nicheng: {
        type: String,
        unique: true,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const UserModel = db.model("user", UserSchema, "user");

function findOne(request) {
    return new Promise((resolve, reject) => {
        UserModel.findOne(request, {
            _id: 0,
            username: 1,
            nicheng: 1
        }, (error, docs) => {
            if (docs) {
                resolve(docs)
            } else {
                reject();
            }
        });
    })
}

exports.toLogin = request => {
    return findOne(request);
}

exports.toRegist = request => {
    return findOne(request);
}

exports.registIn = data => {
    return new Promise((resolve, reject) => {
        UserModel.create(data, (err, doc) => {
            if (doc) {
                resolve(doc);
            } else {
                reject();
            }
        })
    })

}
