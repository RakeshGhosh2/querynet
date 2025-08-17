// import { db, questionCollection } from "@/models/name";
// import { databases } from "@/models/server/config";
// import React from "react";
// import EditQues from "./EditQues";

// const Page = async ({ params }: { params: { quesId: string; quesName: string } }) => {
//     const question = await databases.getDocument(db, questionCollection, params.quesId);

//     return <EditQues question={question} />;
// };

// export default Page;

import React from "react";
import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import EditQues from "./EditQues";

// 👇 Force this page to run in Node.js (not Edge)
export const runtime = "nodejs";

type Props = {
    params: {
        quesId: string;
        quesName: string;
    };
};

const Page = async ({ params }: Props) => {
    const question = await databases.getDocument(
        db,
        questionCollection,
        params.quesId
    );

    return <EditQues question={question} />;
};

export default Page;
