import Typography from "@/components/typography";
import { Card } from "@/components/ui/card";
import { AI_NAME } from "@/features/theme/customise";
import Image from "next/image";
import { FC } from "react";
import { NewChat } from "../chat-menu/new-chat";

interface Prop {}

export const StartNewChat: FC<Prop> = (props) => {
  return (
    <div className="grid grid-cols-5 w-full items-center container mx-auto max-w-3xl justify-center h-full gap-9">
      <div className="col-span-2 gap-5 flex flex-col flex-1">
        <Image width={200} height={200} alt="" src="/aut-logo.svg" />
      </div>
      <Card className="col-span-3 flex flex-col gap-5 p-5 ">
        <Typography variant="h4" className="text-primary">
          {AI_NAME}
        </Typography>
        <div className="flex flex-col gap-2">
          <p className="">
          This GPT model is exclusively available for AUT’s own use, ensuring privacy and control over our content.
          </p>
        </div>
        <div className="-mx-5 -mb-5 p-5 flex flex-col border-t bg-muted">
          <NewChat />
        </div>
      </Card>
    </div>
  );
};
