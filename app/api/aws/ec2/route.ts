import { NextResponse } from "next/server";
import { getEC2Instances } from "@/lib/aws/ec2";

export async function GET() {
  try {
    const data = await getEC2Instances();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}