import { Response } from "./responses.js";
export class Verify {
    constructor(expectedBody = {}) {
        this.expectedProperties = Object.keys(expectedBody);
        this.expectedValues = expectedBody;
    }

    VerifyIfIsCorrect(body) {
        const bodyProperties = Object.keys(body);

    
        if (this.expectedProperties.length !== bodyProperties.length) {
            return Response('Credentials incorrect: different number of properties', false);
        }

        for (let prop of this.expectedProperties) {
            if (!body.hasOwnProperty(prop)) {
                return Response(`Property '${prop}' is missing`, false);
            }

            if (typeof body[prop] !== 'string') {
                return Response(`Property '${prop}' must be a string`, false);
            }
        }

        return Response('Credentials are correct', true);
    }

    VerifyIfCredentialsExists(body) {
        if (!body) {
            return Response('Credentials missing', false);
        }
        return Response('Credentials found', true);
    }

    NewBody(body) {
        this.expectedValues = body;
        this.expectedProperties = Object.keys(body);
    }
}
