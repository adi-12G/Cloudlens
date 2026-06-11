import { NextResponse } from "next/server";
import {
  RDSClient,
  DescribeDBInstancesCommand,
} from "@aws-sdk/client-rds";

export async function GET() {
  try {
    const client = new RDSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const response = await client.send(
      new DescribeDBInstancesCommand({})
    );

    const databases =
      response.DBInstances?.map((db) => ({
        id: db.DBInstanceIdentifier,
        engine: db.Engine,
        version: db.EngineVersion,
        status: db.DBInstanceStatus,
        class: db.DBInstanceClass,
        multiAZ: db.MultiAZ,
        endpoint: db.Endpoint?.Address,
      })) || [];

    return NextResponse.json(databases);
  } catch (error) {
    console.error("RDS Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch RDS instances" },
      { status: 500 }
    );
  }
}