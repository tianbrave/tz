/**
 * Created by tian@zizilaidian.com on 2018/8/5.
 */

'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const LOG_TAG = 'phoneNumberModel';

let collectionName = 'phoneNumber';

let phoneNumberSchema = new mongoose.Schema(
    {

        attribute1:{
            cardFee: {type: String},
            constantAmount: {type: String},
            costType: {type: String},
            costValue: {type: Number},
            enBrand: {type: String},
            isLuckyNum: {type: Number, default: 0},
            noneAgreementPackageList: {type: Array},
            numLevel: {type: String},
            numType: {type: Number, default: 0},
            offerId: {type: String},
            packageList: {type: Array},
            phoneNumWareId: {type: Number},
            prdName: {type: String},
            reuseFlage: {type: String},
            simcardFee: {type: String},
            totalFee: {type: String},
            transactTypeList: {type: Array},
            validity: {type: Number, default: -1}
        },
        brand: {type: String},
        cardFee: {type: String},
        constantAmount: {type: String},
        costValue: {type: String},
        enBrand: {type: String},
        isLuckyNum: {type: String},
        numLevel: {type: String},
        phoneNum: {type: String, index: {unique: true, dropDups: true}, required: true},
        wareId: {type: Number, default: -1},

        delete: {type: Boolean, default: false, required: true},
        create_at: {type: Date, default: Date.now},
        rule1: {type: Number, default: 10},
        rule2: {type: String}
    },
    {
        collection: collectionName
    }
);

let phoneNumberModel = mongoose.model(collectionName, phoneNumberSchema);

class phoneNumberDao {

    save(phoneNumberJson) {
        let phoneNumber = new phoneNumberModel(phoneNumberJson);
        return phoneNumber.save();
    }

    query(queryJson, returnFields) {
        let query = phoneNumberModel.find(queryJson, returnFields);
        return query.exec();
    }

    queryOne(queryJson, returnFields) {
        let query = phoneNumberModel.findOne(queryJson, returnFields);
        return query.exec();
    }

    queryOneById(queryJson, returnFields) {
        let query = phoneNumberModel.findById(queryJson, returnFields);
        return query.exec();
    }

    update(conditions, update) {
        return phoneNumberModel.findOneAndUpdate(conditions, update, {});
    }

    delete(_id) {
        return phoneNumberModel.remove({_id: _id});
    }

    aggregate(queryJson) {
        //let query = phoneNumberModel.aggregate([
        //    {$match: queryJson},
        //    {
        //        $lookup: {
        //            from: 'device',
        //            localField: 'device',
        //            foreignField: '_id',
        //            as: 'devices'
        //        }
        //    },
        //    {$unwind: '$devices'},
        //    {
        //        $group: {
        //            _id: {year: {$year: "$create_at"}, month: {$month: "$create_at"}, day: {$dayOfMonth: "$create_at"}},
        //            count: {$sum: 1}
        //        }
        //    },
        //    {
        //        $sort: {
        //            "_id.year": -1,
        //            "_id.month": -1,
        //            "_id.day": -1
        //        }
        //    }
        //
        //]);
        //return query.exec();
    }
}

module.exports = new phoneNumberDao();


