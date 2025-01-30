"use server";

import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { awsCredentialsProvider } from "@vercel/functions/oidc";

export const saveMessage = async (contact: any) => {
  try {
    const dynamoClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      // Use the Vercel AWS SDK credentials provider
      credentials: awsCredentialsProvider({
        roleArn: process.env.AWS_ROLE_ARN!,
      }),
    });

    const documentClient = DynamoDBDocumentClient.from(dynamoClient);

    const command = new PutCommand({
      TableName: "fe_contacts",
      Item: contact,
    });

    const result = await documentClient.send(command);
    console.log(result);

    return "done";
  } catch (error: any) {
    console.error("Error writing to DynamoDB:", error);
    return "error";
  }
};
