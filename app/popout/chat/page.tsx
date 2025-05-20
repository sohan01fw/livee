import { Card } from "@/components/ui/card";

export default function Chat() {
  return (
    <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">My Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        <div className="text-zinc-400 text-xs">
          10:52 <span className="text-green-500">sohan12cwact:</span> hi
        </div>
        <div className="text-zinc-400 text-sm italic">
          Welcome to the chat room!
        </div>
      </div>
    </Card>
  );
}
