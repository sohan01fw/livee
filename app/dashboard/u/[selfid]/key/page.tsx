import { StreamKey } from "../_components/Streamkey";

export default async function Key({
  params,
}: {
  params: Promise<{ selfid: string }>;
}) {
  const { selfid } = await params;

  return (
    <div>
      <StreamKey id={selfid} />
    </div>
  );
}
