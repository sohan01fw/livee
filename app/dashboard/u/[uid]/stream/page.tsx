import * as React from "react";
import { StreamPreview } from "../_components/StreamPreview";
import { getStreamsByUserId } from "@/app/server/services/streamService";

// Stream Preview Component
export default async function Stream({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const getStream = await getStreamsByUserId(uid);
  if (getStream === null) return <p>No stream found</p>;

  return <StreamPreview stream={getStream} />;
}

// Activity Feed Component
// function ActivityFeed() {
//   return (
//     <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-lg font-semibold text-white">Activity Feed</h2>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => openPopout("ActivityFeed", "/popout/activity")}
//         >
//           Popout
//         </Button>
//       </div>
//       <div className="flex-1 overflow-y-auto text-zinc-400 text-sm">
//         <p className="italic">It is quiet. Too quiet...</p>
//         <p className="mt-1">
//           We will show your new follows, subs, cheers, and raids activity here.
//         </p>
//       </div>
//     </Card>
//   );
// }

// // Chat Window Component
// function ChatWindow() {
//   return (
//     <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-lg font-semibold text-white">My Chat</h2>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => openPopout("ChatWindow", "/popout/chat")}
//         >
//           Popout
//         </Button>
//       </div>
//       <div className="flex-1 overflow-y-auto space-y-2">
//         <div className="text-zinc-400 text-xs">
//           10:52 <span className="text-green-500">sohan12cwact:</span> hi
//         </div>
//         <div className="text-zinc-400 text-sm italic">
//           Welcome to the chat room!
//         </div>
//       </div>
//     </Card>
//   );
// }

// Main Dashboard Layout
