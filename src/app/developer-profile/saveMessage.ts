"use server";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import getDynamoClient from "@/lib/dynamoClient";

export const saveMessage = async (contact: any) => {
  try {
    // Dynamically fetch the client
    const dynamoClient = getDynamoClient();

    const command = new PutCommand({
      TableName: "fe_contacts",
      Item: contact,
    });

    const result = await dynamoClient.send(command);

    return "done";
  } catch (error: any) {
    console.error("Error writing to DynamoDB:", error);
    return "error";
  }
};
