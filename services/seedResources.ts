import { supabaseAdmin } from "@/lib/supabase/server";

export async function seedResources(userId: string) {
  await supabaseAdmin
    .from("resources")
    .upsert(
      [
        {
          user_id: userId,
          resource_id: "ec2-prod-1",
          resource_name: "prod-web-server",
          resource_type: "EC2",
          instance_type: "t3.large",
          region: "ap-southeast-2",
          status: "running",
          estimated_cost: 72,
        },
        {
          user_id: userId,
          resource_id: "rds-prod-1",
          resource_name: "analytics-db",
          resource_type: "RDS",
          instance_type: "db.t3.medium",
          region: "ap-southeast-2",
          status: "running",
          estimated_cost: 110,
        },
        {
          user_id: userId,
          resource_id: "s3-prod-1",
          resource_name: "backup-bucket",
          resource_type: "S3",
          instance_type: null,
          region: "ap-southeast-2",
          status: "active",
          estimated_cost: 12,
        },
      ],
      {
        onConflict: "resource_id",
      }
    );
}
