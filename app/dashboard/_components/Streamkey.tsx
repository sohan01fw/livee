"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { createKeyUrl, getKeyUrl } from "@/lib/actions/livekit/ingress";

export function StreamKey() {
  const [streamKey, setStreamkey] = useState<string>("");
  const [streamUrl, setStreamUrl] = useState<string>("");
  const [masked, setMasked] = useState(true);

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast.success(`${label} copied to clipboard!`);
    });
  };

  //create new credentials handler
  const handleCreateNewCredentials = async () => {
    const { key, url } = await createKeyUrl();
    setStreamkey(key);
    setStreamUrl(url);
    toast.success("created key and url successfully");
  };
  const getKeyUrls = async () => {
    await getKeyUrl();
    toast.success("sucessfully get  keyandurl");
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Button onClick={getKeyUrls}>Get key and url</Button>
      <Card>
        <CardHeader>
          <CardTitle>Stream Credentials</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {/* Stream URL */}
          <div className="flex flex-col">
            <Label className="mb-1">Stream URL</Label>
            <div className="flex items-center space-x-2">
              <Input value={streamUrl} readOnly className="flex-1" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:cursor-pointer"
                    onClick={() => copyToClipboard(streamUrl, "Stream URL")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy URL</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Stream Key */}
          <div className="flex flex-col">
            <Label className="mb-1">Stream Key</Label>
            <div className="flex items-center space-x-2">
              <Input
                type={masked ? "password" : "text"}
                value={streamKey}
                readOnly
                className="flex-1"
              />
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:cursor-pointer"
                    onClick={() => copyToClipboard(streamKey, "Stream Key")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Key</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-black hover:cursor-pointer"
            onClick={handleCreateNewCredentials}
          >
            Create new Credentials
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
