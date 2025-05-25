import { useEffect, useState } from "react";

import jwt, { JwtPayload } from "jsonwebtoken";
import { Token } from "@/app/server/actions/livekit/token";
import { toast } from "sonner";

export const useViewerToken = (roomId: string, uid: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [Id, setId] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await Token(uid, roomId);

        // decode tokne using jwt
        const decodedToken = jwt.decode(data.token) as JwtPayload & {
          name: string;
        };
        const name = decodedToken?.name;
        const id = decodedToken.sub;

        if (data.token) {
          setToken(data.token);
        }
        if (name) {
          setName(name);
        }
        if (id) {
          setId(id);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };

    getToken();
  }, [roomId, uid]);

  return { token, name, Id };
};
