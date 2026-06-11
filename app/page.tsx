import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Cloud,
  DollarSign,
  Server,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function HomePage() {
  const { userId } = await auth();

  // If user is already logged in
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b px-8 py-5">
        <div className="text-2xl font-bold">
          CloudLens
        </div>

        <div className="flex gap-3">
          <Button asChild variant="ghost">
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>

          <Button asChild>
            <Link href="/sign-up">
              Get Started
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="rounded-full border px-4 py-1 text-sm text-muted-foreground">
          AWS Cost Visibility Platform
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Monitor AWS Infrastructure
          <br />
          and Reduce Cloud Costs
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          CloudLens helps teams discover AWS resources,
          identify optimization opportunities, and gain
          visibility into cloud spending.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/sign-up">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
          >
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        <Card className="shadow-sm transition hover:shadow-lg">
          <CardContent className="p-8">
            <Server className="mb-5 h-10 w-10" />

            <h3 className="text-xl font-semibold">
              Infrastructure Discovery
            </h3>

            <p className="mt-3 text-muted-foreground">
              Automatically discover EC2, S3,
              and future AWS resources across
              your environment.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm transition hover:shadow-lg">
          <CardContent className="p-8">
            <DollarSign className="mb-5 h-10 w-10" />

            <h3 className="text-xl font-semibold">
              Cost Optimization
            </h3>

            <p className="mt-3 text-muted-foreground">
              Identify savings opportunities and
              reduce unnecessary cloud spending.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm transition hover:shadow-lg">
          <CardContent className="p-8">
            <Cloud className="mb-5 h-10 w-10" />

            <h3 className="text-xl font-semibold">
              Actionable Insights
            </h3>

            <p className="mt-3 text-muted-foreground">
              Get recommendations that help
              teams make smarter infrastructure
              decisions.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Bottom CTA */}
      <section className="border-t px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">
          Stop guessing where your
          cloud budget goes.
        </h2>

        <p className="mt-4 text-muted-foreground">
          Start monitoring your AWS resources
          with CloudLens today.
        </p>

        <Button
          size="lg"
          className="mt-8"
          asChild
        >
          <Link href="/sign-up">
            Start for Free
          </Link>
        </Button>
      </section>
    </main>
  );
}