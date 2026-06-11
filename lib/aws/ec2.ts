import {
  EC2Client,
  DescribeInstancesCommand,
} from "@aws-sdk/client-ec2";

const client = new EC2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getEC2Instances() {
  const response = await client.send(
    new DescribeInstancesCommand({})
  );

  return response;
}
