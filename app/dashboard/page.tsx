import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card";
import { syncEC2 } from "@/services/syncEC2";
import { syncS3 } from "@/services/syncS3";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
export default async function DashboardPage() {
  const { userId } = await auth();



  if (!userId) {
    redirect("/sign-in");
  }

  await syncEC2(userId);

  await syncS3(userId);

  const user = await currentUser();

  if (user) {
    const { data, error } = await supabaseAdmin
      .from("users")
      .upsert({
        clerk_user_id: user.id,
        email: user.emailAddresses[0].emailAddress,
      })
      .select();

    console.log("USER DATA:", data);
    console.log("USER ERROR:", error);
  }

const { data: resources } = await supabaseAdmin
  .from("resources")
  .select("*")
  .eq("user_id", userId);


const recommendations: {
  title: string;
  resource: string;
  message: string;
  savings: string;
}[] = [];

resources?.forEach((resource) => {
  if (resource.resource_type === "S3") {
  recommendations.push({
    title: "Review S3 Lifecycle Policies",
    resource: resource.resource_name,
    message:
      "Consider lifecycle rules to move infrequently accessed data to cheaper storage classes.",
    savings: "$5/month",
  });
}
  if (
    resource.resource_type === "EC2" &&
    resource.status === "running"
  ) {
    recommendations.push({
      title: "EC2 Rightsizing Opportunity",
      resource: resource.resource_name,
      message:
        `${resource.resource_name} is currently running. Review utilization and consider moving to a smaller instance type.`,
      savings: "$15/month",
    });
  }
});

const totalCost =
  resources?.reduce(
    (sum, resource) => sum + Number(resource.estimated_cost),
    0
  ) ?? 0;

const stats = [
  {
    title: "Total Resources",
    value: resources?.length.toString() ?? "0",
  },
  {
    title: "Estimated Monthly Cost",
    value: `$${totalCost}`,
  },
  {
    title: "Recommendations",
    value: recommendations.length.toString(),
  },
  {
    title: "Connected Accounts",
    value: "1",
  },
];


  return (
    <main className="min-h-screen p-8">
      <DashboardSidebar />
      <h1 className="text-4xl font-bold mb-8">
        CloudLens Dashboard
      </h1>

 
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
  key={stat.title}
  className="shadow-sm hover:shadow-lg transition"
>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              {stat.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stat.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>

  
    <div className="mt-10">
      <h2 className="text-4xl font-bold mt-3">
        Resource Inventory
      </h2>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b bg-muted">
            <th className="p-3">Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Instance</th>
            <th className="p-3">Status</th>
            <th className="p-3">Region</th>
          </tr>
        </thead>

        <tbody>
          {resources?.map((resource) => (
            <tr
              key={resource.id}
              className="border-b text-center"
            >
              <td className="p-3">
                {resource.resource_name}
              </td>

              <td className="p-3">
                {resource.resource_type}
              </td>

              <td className="p-3">
                {resource.instance_type ?? "-"}
              </td>

              <td className="p-3">
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      resource.status === "running"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {resource.status}
  </span>
</td>

              <td className="p-3">
                {resource.region}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-10">
      <h2 className="text-4xl font-bold mt-3">
        Recommendations
      </h2>

      {recommendations.map((rec, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="p-4">
            <p className="font-bold">
              🟡 {rec.title}
            </p>

            <p>
              Resource: {rec.resource}
            </p>
            

            <p>
              {rec.message}
            </p>

            <p className="font-semibold mt-2">
              Potential Savings: {rec.savings}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </main>
  );
}