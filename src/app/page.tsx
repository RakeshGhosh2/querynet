import HeroSectionHeader from "./components/HeroSectionHeader";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";
import { CopilotSidebar } from "@copilotkit/react-ui";


export default function Home() {
  return (

    <main>
      
      <CopilotSidebar
      defaultOpen={false}
      instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
      labels={{
        title: "QueryNet Helper", 
        initial: "How can I help you today?",
      }}
    >
      <HeroSectionHeader />
      <HeroSection />
      <h2 className="text-2xl px-15 font-semibold mb-4">Latest Questions :-</h2>
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12 my-10 h-[500px]">
        <div className="md:w-2/3 w-full h-full overflow-y-auto">

          <LatestQuestions />
        </div>
        <div className="md:w-1/3 w-full h-full overflow-y-auto">
          <TopContributers />
        </div>
      </div>
      </CopilotSidebar>
    </main>
  );
}
