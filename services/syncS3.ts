import { getS3Buckets } from "@/lib/aws/s3";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function syncS3(userId: string) {
  console.log("S3 SYNC STARTED");

  const response = await getS3Buckets();

  console.log(
    "Buckets:",
    response.Buckets?.length
  );

  for (const bucket of response.Buckets || []) {
    const { error } = await supabaseAdmin
      .from("resources")
      .upsert(
        {
          user_id: userId,
          resource_id: bucket.Name,
          resource_name: bucket.Name,
          resource_type: "S3",
          region: process.env.AWS_REGION,
          status: "active",
          estimated_cost: 0,
        },
        {
          onConflict: "resource_id",
        }
      );

    if (error) {
      console.error(error);
    }

    console.log(
      "Saved bucket:",
      bucket.Name
    );
  }
}