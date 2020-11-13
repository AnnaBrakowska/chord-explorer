

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(`
        Welcome to Chord Explorer API. One day this page will display some useful information.
        For now please go to '/chords' to access chords, and use '/users' to get users.

        Happy browsing!
        `),
    };
    return response;
};
