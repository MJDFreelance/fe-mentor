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

    return new Response(
      JSON.stringify({ message: "Data written successfully", result }),
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error("Error writing to DynamoDB:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to write to DynamoDB",
        details: error?.message,
      }),
      { status: 500 },
    );
  }
};
