import {
  S3Client,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getS3Buckets() {
  const command = new ListBucketsCommand({});

  return await client.send(command);
}

