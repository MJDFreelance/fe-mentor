// dynamoClient.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromWebToken } from "@aws-sdk/credential-provider-web-identity";

let documentClient: DynamoDBDocumentClient | null = null;

export default function getDynamoClient() {
  if (!documentClient) {
    // Initialize only the first time it's called
    const dynamoClient = new DynamoDBClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: fromWebToken({
        roleArn: process.env.AWS_ROLE_ARN!,
        webIdentityToken: process.env.VERCEL_OIDC_TOKEN!,
      }),
    });

    documentClient = DynamoDBDocumentClient.from(dynamoClient);
  }

  return documentClient;
}
