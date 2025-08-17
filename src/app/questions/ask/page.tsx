'use client';

import QuestionForm from '@/components/QuestionForm';
import { CopilotSidebar } from '@copilotkit/react-ui';


export default function Home() {
    return (
        <div>
            <CopilotSidebar
                defaultOpen={false}
                instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                labels={{
                    title: "QueryNet Helper",
                    initial: "How can I help you today?",
                }}
            >
                <QuestionForm />
            </CopilotSidebar>
        </div>
    );

}
