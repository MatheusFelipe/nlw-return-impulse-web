import { Dispatch, SetStateAction } from 'react';
import { feedbackTypes, FeedbackType } from '..';
import { CloseButton } from '../../CloseButton';

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: Dispatch<SetStateAction<FeedbackType | undefined>>;
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([type, { title, image }]) => (
          <button
            key={type}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            type="button"
            onClick={() => onFeedbackTypeChanged(type as FeedbackType)}
          >
            <img src={image.src} alt={image.alt} />
            <span>{title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
