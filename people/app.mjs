export const lambdaHandler = async (event) => {
    const authorizer = event.requestContext?.authorizer || {};
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            names: ["Alice", "Bob", "Charlie"],
            authorizerContext: authorizer,
            receivedHeaders: event.headers
        })
    };
};
