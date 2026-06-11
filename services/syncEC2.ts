import { getEC2Instances } from "@/lib/aws/ec2";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function syncEC2(userId: string) {
  const response = await getEC2Instances();

  for (const reservation of response.Reservations || []) {
    for (const instance of reservation.Instances || []) {
      const name =
        instance.Tags?.find(tag => tag.Key === "Name")?.Value ||
        "Unnamed";

      const { error } = await supabaseAdmin
        .from("resources")
        .upsert(
          {
            user_id: userId,
            resource_id: instance.InstanceId,
            resource_name: name,
            resource_type: "EC2",
            instance_type: instance.InstanceType,
            region: process.env.AWS_REGION,
            status: instance.State?.Name,
            estimated_cost: 0,
          },
          {
            onConflict: "resource_id",
          }
        );

      if (error) {
        console.error(error);
      }
    }
  }
}
