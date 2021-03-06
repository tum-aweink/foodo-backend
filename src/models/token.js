/**
 * TokenModel
 * builds the token db collection with mongoose.
 */

const mongoose = require( 'mongoose' );

const { Schema } = mongoose;

/**
 * Schema for tokens.
 * Used to store tokens generated by oauth2 auth-process.
 * @type {*|Mongoose.Schema}
 */
const TokenSchema = new Schema( {
    accessToken: { // token string
        type: String,
        required: true,
        unique: true,
    },
    accessTokenExpiresAt: { // expiration date
        type: Date,
        required: true,
    },
    refreshToken: { // refresh token string
        type: String,
        required: true,
        unique: true,
    },
    refreshTokenExpiresAt: { // refresh token expiration date
        type: Date,
        required: true,
    },
    client: { type: Schema.Types.ObjectId, ref: 'Client' }, // client which requested token
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // user who requested token
}, { collection: 'token' } );

TokenSchema.set( 'versionKey', false );

module.exports = mongoose.model( 'Token', TokenSchema );
