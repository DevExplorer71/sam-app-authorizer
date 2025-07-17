export const lambdaHandler = async (event) => {
  // Log the full event for debugging
console.log('Full event:', JSON.stringify(event, null, 2));

const testauthorizer = event.requestContext?.authorizer || {};

console.log('Authorizer context:', testauthorizer);

  // Add authorizer context as custom headers
  const authorizer =
    event.requestContext && event.requestContext.authorizer
      ? event.requestContext.authorizer
      : {};

  console.log("Authorizer context:", authorizer);

  const customHeaders = {
    "x-authemail": authorizer.authemail || "",
    "x-authuserid": authorizer.authuserid || "",
    "x-authroles": Array.isArray(authorizer.authroles)
      ? authorizer.authroles.join(",")
      : authorizer.authroles || "",
  };

  console.log("Custom headers:", customHeaders);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    body: JSON.stringify({
      names: ["Alice", "Bob", "Charlie"],
      authorizerContext: authorizer,
      receivedHeaders: event.headers,
      debugEvent: event, // Optionally return the event for easier inspection
    }),
  };
};
