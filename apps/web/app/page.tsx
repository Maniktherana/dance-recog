"use client";

import FileUpload from "@/components/file-upload";
import VideoStream from "@/components/video-stream";
import { Alert, AlertDescription } from "@repo/ui/components/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { useEffect, useState } from "react";

export default function DetectionStreamingPage() {
  const [error, setError] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("live");

  const handleError = (errorMsg: string | null) => {
    setError(errorMsg);
  };

  // Load previous settings from localStorage if available
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");

    if (savedTab === "live" || savedTab === "upload") setActiveTab(savedTab);
  }, []);

  // Save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <main className="flex flex-col items-center p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center"></h1>

      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={(value: any) => setActiveTab(value as string)}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="live">Live Camera</TabsTrigger>
          <TabsTrigger value="upload">Upload File</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="w-full">
          <VideoStream onError={handleError} />
        </TabsContent>

        <TabsContent value="upload" className="w-full">
          <FileUpload onError={handleError} />
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive" className="mt-4 max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </main>
  );
}
