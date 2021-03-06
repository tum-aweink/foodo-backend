/**
 * Constants for usage in error message handling.
 */
const USER_NOT_FOUND = "Cannot set property 'password' of null";
const PASSWORD_WRONG = 'Invalid grant: user credentials are invalid';
const REFRESH_TOKEN_EXPIRED = 'Invalid grant: refresh token has expired';


/**
 * Request misses specific property
 * @param {object} body
 * @param {string} property
 * @returns {boolean}
 */
const missesProperty = ( body, property ) => !Object.prototype
    .hasOwnProperty.call( body, property );

/**
 * Request misses multiple properties
 * @param {object} body
 * @param {Array} property
 * @returns {boolean}
 */
const missingProperties = ( body, properties ) => {
    for ( let i = 0; i < properties.length; i += 1 ) {
        if ( missesProperty( body, properties[ i ] ) ) return properties[ i ];
    }
    return false;
};

/**
 * Request misses specific property
 * Creates a human-readable error message.
 * @param {object} res
 * @param {string} property
 * @returns {json}
 */
const sendBadRequestErrorMissingProperty = ( res, property ) => res.status( 400 )
    .json( {
        error: 'Bad Request',
        message: `The request body must contain a ${ property } property`,
    } );

/**
 * User tried to register an existing username.
 * Creates a human-readable error message.
 * @param {object} res
 * @param {string} username
 * @returns {json}
 */
const sendBadRequestErrorUsernameTaken = ( res, username ) => res.status( 400 )
    .json( {
        error: 'Bad Request',
        message: `The ${ username } is already taken`,
    } );

/**
 * User tried to register without a password.
 * Creates a human-readable error message.
 * @param res
 * @returns {*}
 */
const sendBadRequestPasswordEmpty = res => res.status( 404 )
    .json( {
        error: 'Bad Request',
        message: 'The password-field must be set.',
    } );

/**
 * Sends the matching error message.
 * @param res
 * @param err
 */
const generateAndSendErrorMessage = ( res, err ) => {
    if ( err.message === USER_NOT_FOUND ) {
        res.status( 404 ).json( {
            error: 'Bad Request',
            message: 'User does not exist.',
        } );
    }
    if ( err.message === PASSWORD_WRONG ) {
        res.status( 400 ).json( {
            error: 'Bad Request',
            message: 'Password wrong.',
        } );
    }
    if ( err.message === REFRESH_TOKEN_EXPIRED ) {
        res.status( 400 ).json( {
            error: 'Bad Request',
            message: 'Refresh Token has expired.',
        } );
    }
    res.status( 400 ).json( {
        error: 'Bad Request',
        message: err.message,
    } );
};

module.exports = {
    missesProperty,
    missingProperties,
    sendBadRequestErrorMissingProperty,
    sendBadRequestErrorUsernameTaken,
    sendBadRequestPasswordEmpty,
    generateAndSendErrorMessage,
};
