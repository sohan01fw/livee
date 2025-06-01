import * as React from "react";

import { getStreamsByUserId } from "@/app/server/services/streamService";
import { StreamBoard } from "../_components/StreamBoard";

export default async function Stream({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const getStream = await getStreamsByUserId(uid);
  if (getStream === null) return <p>No stream found,please try again later</p>;

  return <StreamBoard stream={getStream} />;
}
