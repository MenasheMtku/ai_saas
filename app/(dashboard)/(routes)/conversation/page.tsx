"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MessageSquare } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { formScheme } from "./constants";

import type { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>(
    []
  );

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      const userMessage: ChatCompletionUserMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      console.log("Sending messages:", newMessages);
      const response = await axios.post("/api/conversation", {
        message: newMessages,
      });

      setMessages(current => [
        ...current,
        userMessage,
        {
          role: "user",
          content: response.data.message,
        },
      ]);
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advance conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full">
                Generate
              </Button>
            </form>
          </Form>
          <div className="space-y-4">
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map(message => (
                <div>
                  <p className="text-sm">{message?.content}</p>
                </div>
              ))}
              <p>Message content</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>{API_KEY}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
