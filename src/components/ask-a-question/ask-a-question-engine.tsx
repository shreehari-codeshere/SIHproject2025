'use client';
import { useState } from 'react';
import type { AnswerQuestionOutput } from '@/ai/flows/ask-a-question-flow';
import { askQuestionAction } from '@/app/actions/ask';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, Image as ImageIcon, Mic } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Input } from '../ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AskAQuestionEngine() {
  const [result, setResult] = useState<AnswerQuestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setResult(null);

    const response = await askQuestionAction(formData);

    if (response.error || !response.data) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'An unknown error occurred.',
      });
    } else {
      setResult(response.data);
    }
    setIsLoading(false);
  };

  const handleVoiceAccess = () => {
    toast({
      title: 'Upcoming Feature',
      description: 'Voice input is not yet available, but it is coming soon!',
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Question</CardTitle>
          <CardDescription>
            Ask anything about farming, crops, or agriculture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <Textarea
              name="question"
              placeholder="e.g., What is the best time to plant corn in my region?"
              className="min-h-[150px]"
              required
              disabled={isLoading}
            />
            <div className="flex flex-col sm:flex-row gap-2">
               <div className="flex gap-2">
                 <Button variant="outline" className="w-full sm:w-auto" disabled={isLoading} type="button" onClick={() => document.getElementById('photo-upload')?.click()}>
                    <ImageIcon className="mr-2 size-4" />
                    Upload Photo
                 </Button>
                 <Input id="photo-upload" name="photo" type="file" className="hidden" />
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto" disabled={isLoading} type="button">
                        <Mic className="mr-2 size-4" />
                        Use Voice
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Enable Microphone Access</AlertDialogTitle>
                        <AlertDialogDescription>
                          To use voice input, you'll need to grant this app access to your microphone. Click "Grant Access" and then "Allow" in your browser's prompt.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleVoiceAccess}>Grant Access</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
               </div>
                <Button type="submit" className="w-full sm:flex-1" disabled={isLoading}>
                  {isLoading ? 'Thinking...' : 'Get Answer'}
                  <Send className="ml-2 size-4" />
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="min-h-[200px]">
        {isLoading && <LoadingSkeleton />}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                AI-Generated Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-md bg-secondary text-secondary-foreground prose">
                {result.answer}
              </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed border-border p-8 text-center">
            <Sparkles className="size-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">
              Your answer will appear here
            </h3>
            <p className="text-muted-foreground">
              Ask a question to get an AI-powered response.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-16 w-full" />
      </CardContent>
    </Card>
  );
}
