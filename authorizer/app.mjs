// authorizer/app.mjs
export const handler = async (event) => {
    // Example: Accept JWT in Authorization header, decode and validate (no real validation here)
    const token = event.headers?.Authorization || event.authorizationToken;
    let decoded;
    try {
        // For demo: decode base64 payload (JWT format: header.payload.signature)
        const payload = token?.split('.')[1];
        console.log('JWT payload (base64):', payload);
        decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
        console.log('Decoded JWT:', decoded);
    } catch (err) {
        console.error('JWT decode error:', err);
        return {
            principalId: 'unauthorized',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [{
                    Action: 'execute-api:Invoke',
                    Effect: 'Deny',
                    Resource: event.methodArn || '*',
                }],
            },
            context: {},
        };
    }
    // Extract custom claims
    const authemail = decoded.authemail || '';
    const authuserid = decoded.authuserid || '';
    const authroles = Array.isArray(decoded.authroles) ? decoded.authroles : [];
    console.log('Authorizer context:', { authemail, authuserid, authroles });
    return {
        principalId: authuserid || 'user',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: 'Allow',
                Resource: event.methodArn || '*',
            }],
        },
        context: {
            authemail,
            authuserid,
            authroles: authroles.join(','),
        },
    };
};
