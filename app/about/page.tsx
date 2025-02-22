'use client'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '../../components/ui/terminal'
import Header from "@/components/Layout/Header";
import { Divider } from "@nextui-org/react";
import Footer from "@/components/Layout/Footer";
const Page = () => {
  const user = undefined; 
  const isSellerExists = false; 
  return (
    <div  >
      <div>
        <Header activeItem={1} user={user} isSellerExists={isSellerExists} />
      </div>
      <center className="mt-10" >
        <Terminal>
          <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>

          <AnimatedSpan delay={1500} className="text-green-500">
            <span>✔ Connecting to AI Marketplace.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2000} className="text-green-500">
            <span>✔ Verifying user credentials.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2500} className="text-green-500">
            <span>✔ Validating AI models & integrations.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3000} className="text-green-500">
            <span>✔ Fetching latest prompt libraries.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3500} className="text-green-500">
            <span>✔ Registering marketplace components.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4000} className="text-green-500">
            <span>✔ Syncing with AI prompt database.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4500} className="text-green-500">
            <span>✔ Applying customization settings.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5000} className="text-green-500">
            <span>✔ Preparing smart recommendations.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={6000} className="text-blue-500">
            <span>ℹ Updated files:</span>
            <span className="pl-2">- marketplace/prompts.ts</span>
            <span className="pl-2">- marketplace/user-dashboard.tsx</span>
          </AnimatedSpan>

          <TypingAnimation delay={6500} className="text-muted-foreground">
            Success! AI Prompt Marketplace is ready.
          </TypingAnimation>

          <TypingAnimation delay={7000} className="text-muted-foreground">
            You may now explore, create, and sell prompts.
          </TypingAnimation>
        </Terminal>

      </center>
      <Divider className="bg-[ffffff14] mt-5 " />
      <Footer />
    </div>
  );
}


export default Page