"use server";

import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromWebToken } from "@aws-sdk/credential-provider-web-identity";

export const saveMessage = async (contact: any) => {
  try {
    // Dynamically fetch the client
    console.error("No documentClient found");
    console.log(process.env.AWS_REGION);
    console.log(process.env.AWS_ROLE_ARN);
    console.log(process.env.VERCEL_OIDC_TOKEN);

    const dynamoClient = new DynamoDBClient({
      region: process.env.AWS_REGION || "us-east-1", // Use region from .env, fallback to "us-east-1"
      credentials: fromWebToken({
        roleArn: process.env.AWS_ROLE_ARN!, // Load role ARN from the .env file
        webIdentityToken: process.env.VERCEL_OIDC_TOKEN!,
      }),
    });

    const documentClient = DynamoDBDocumentClient.from(dynamoClient);

    const command = new PutCommand({
      TableName: "fe_contacts",
      Item: contact,
    });

    const result = await documentClient.send(command);

    return "done";
  } catch (error: any) {
    console.error("Error writing to DynamoDB:", error);
    return "error";
  }
};
