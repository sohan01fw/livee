import { StreamKey } from "../_components/Streamkey";

export default async function Key({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;

  return (
    <div>
      <StreamKey id={uid} />
    </div>
  );
}
