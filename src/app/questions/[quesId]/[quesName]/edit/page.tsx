import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

const EditePage = async ({ params }: { params: { quesId: string; quesName: string } }) => {
    const question = await databases.getDocument(db, questionCollection, params.quesId);

    return <EditQues question={question} />;
};

export default EditePage;


// src/app/questions/[quesId]/[quesName]/edit/page.tsx
// import React from "react";
// import { db, questionCollection } from "@/models/name";
// import { databases } from "@/models/server/config";
// import EditQues from "./EditQues";

// export const runtime = "nodejs";
// interface PageProps {
//     params: {
//         quesId: string
//         quesName: string
//     }
//     searchParams?: Record<string, string | string[] | undefined>
// }

// export default async function Page({ params }: PageProps) {
//     const question = await databases.getDocument(
//         db,
//         questionCollection,
//         params.quesId
//     );

//     return <EditQues question={question} />;
// }
