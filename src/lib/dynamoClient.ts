import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromWebToken } from "@aws-sdk/credential-provider-web-identity";

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

export default documentClient;
