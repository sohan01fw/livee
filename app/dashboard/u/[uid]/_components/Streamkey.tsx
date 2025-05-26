"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createKeyUrl } from "@/app/server/actions/livekit/ingress";
import { getStreamByUserIdAction } from "@/app/server/actions/streamAction";
import { Dialog } from "@/components/Dialog";
import useSWR from "swr";
import { LoadingKeyAndUrl } from "./loading";

export function StreamKey({ id }: { id: string }) {
  const [streamKey, setStreamkey] = useState<string>("");
  const [streamUrl, setStreamUrl] = useState<string>("");
  const [masked, setMasked] = useState(true);
  const [triggered, setTriggered] = useState(false);

  const fetcher = async (id: string) => {
    return await getStreamByUserIdAction(id);
  };
  const { data, error, isLoading } = useSWR(id ? ["stream", id] : null, () =>
    fetcher(id),
  );
  useEffect(() => {
    const getKeyAndUrl = async () => {
      if (error) {
        toast.error("Error loading stream");
        return;
      }
      if (!data) return;

      setStreamkey(data.streamkey || "");
      setStreamUrl(data.streamurl || "");
    };
    getKeyAndUrl();
  }, [id, triggered, data, error, isLoading]);

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast.success(`${label} copied to clipboard!`);
    });
  };

  //create new credentials handler
  const handleCreateNewCredentials = async () => {
    await createKeyUrl(id);
    setTriggered(!triggered);
    toast.success("created key and url successfully");
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="flex justify-end  ">
        <Dialog
          className="w-52 text-center  rounded-lg p-2 "
          openText="Create new Credentials"
          title="Create new Credentials"
          description={`Are you sure you want to create new credentials? This will overwrite the existing credentials.
          `}
          onConfirm={handleCreateNewCredentials}
          onCancel={() => setTriggered(!triggered)}
          confirmText="Create"
          cancelText="Cancel"
        />
      </div>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Stream Credentials</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {/* Stream URL */}
          <div className="flex flex-col">
            <Label className="mb-1">Stream URL</Label>
            <div className="flex items-center space-x-2">
              {isLoading ? (
                <LoadingKeyAndUrl />
              ) : (
                <Input value={streamUrl} readOnly className="flex-1" />
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  {streamUrl === "" ? (
                    <Button
                      disabled
                      variant="ghost"
                      size="icon"
                      className="hover:cursor-pointer"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:cursor-pointer"
                      onClick={() => copyToClipboard(streamUrl, "Stream URL")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>Copy URL</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Stream Key */}
          <div className="flex flex-col">
            <Label className="mb-1">Stream Key</Label>
            <div className="flex items-center space-x-2">
              {isLoading ? (
                <LoadingKeyAndUrl />
              ) : (
                <Input
                  type={masked ? "password" : "text"}
                  value={streamKey}
                  readOnly
                  className="flex-1"
                />
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMasked(!masked)}
                aria-label={masked ? "Show Key" : "Hide Key"}
              >
                {masked ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  {streamKey === "" ? (
                    <Button
                      disabled
                      variant="ghost"
                      size="icon"
                      className="hover:cursor-pointer"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:cursor-pointer"
                      onClick={() => copyToClipboard(streamKey, "Stream Key")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>Copy Key</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
