import { Card } from "@/components/ui/card";

export default function Stream() {
  return (
    <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">Stream Preview</h2>
      </div>
      <div className="bg-black h-48 rounded-lg flex items-center justify-center text-zinc-400">
        OFFLINE
      </div>
      <div className="mt-2 text-center text-sm text-zinc-400">OFFLINE</div>
    </Card>
  );
}
