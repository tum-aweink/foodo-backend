/**
 * CodeModel
 * builds the code db collection with mongoose.
 */

const mongoose = require( 'mongoose' );

const { Schema } = mongoose;

/**
 * Schema for oauth2 codes.
 * Required for oauth2 authorization code grant type.
 * @type {*|Mongoose.Schema}
 */
const CodeSchema = new Schema( {
    authorizationCode: { // actual code (auto. generated by oauth2)
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: { // expiration date
        type: Date,
        required: true,
    },
    redirectUri: { // required by oauth2 process
        type: String,
        required: true,
    },
    client: { type: Schema.Types.ObjectId, ref: 'Client' }, // ref. to client
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // ref. to user
}, { collection: 'code' } );

CodeSchema.set( 'versionKey', false );

module.exports = mongoose.model( 'Code', CodeSchema );
