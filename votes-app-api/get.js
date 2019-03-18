import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: "votes",
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'event': individual event created by the user
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            event: event.pathParameters.event
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        console.log(result);
        if (result.Item) {
            // Return the retrieved item
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found." });
        }
    } catch (e) {
        return failure({ status: false });
    }
}