/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

import axios from 'axios';

export const lambdaHandler = async (event, context) => {
    // Extract custom context from authorizer
    const authorizer = event.requestContext?.authorizer || {};
    // Prepare headers from authorizer context
    const customHeaders = {
        'x-authemail': authorizer.authemail || '',
        'x-authuserid': authorizer.authuserid || '',
        'x-authroles': authorizer.authroles || ''
    };

    console.log('Authorizer context:', authorizer);
    console.log('Custom headers:', customHeaders);  

    // Example outgoing API call (replace URL with your actual endpoint)
    let apiResult = null;
    try {
        // This is a placeholder URL. Replace with your real downstream API endpoint.
        const res = await axios.get('https://httpbin.org/headers', { headers: customHeaders });
        apiResult = res.data;
    } catch (err) {
        apiResult = { error: err.message };
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
            authorizerContext: authorizer,
            sentHeaders: customHeaders,
            downstreamApiResult: apiResult
        })
    };

    return response;
};
  