import { StreamKey } from "../_components/Streamkey";

interface paramsTypes {
  params: Promise<{
    uid: string;
  }>;
}

export default async function Key({ params }: paramsTypes) {
  const { uid } = await params;

  return (
    <div>
      <StreamKey id={uid} />
    </div>
  );
}
