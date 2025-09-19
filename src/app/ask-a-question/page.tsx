
import { AskAQuestionEngine } from '@/components/ask-a-question/ask-a-question-engine';

export default function AskAQuestionPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Ask a Question
        </h1>
        <p className="text-muted-foreground">
          Get expert advice from our AI agricultural assistant.
        </p>
      </div>
      <AskAQuestionEngine />
    </div>
  );
}
