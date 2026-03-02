import { Metadata } from 'next';
import QuestionDetailClient from './QuestionDetailClient';
import { questions, getQuestionById } from '@/lib/data';

// Generate static params for all questions
export function generateStaticParams() {
  return questions.map((q) => ({
    id: q._id,
  }));
}

// Generate metadata for each question
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const question = getQuestionById(params.id);
  if (!question) {
    return {
      title: 'Question Not Found - EmbedPrep',
    };
  }
  return {
    title: `${question.question.substring(0, 60)}... - EmbedPrep`,
    description: `Practice this ${question.difficulty} ${question.category} interview question for ${question.experienceLevel} experience level.`,
  };
}

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  return <QuestionDetailClient id={params.id} />;
}
