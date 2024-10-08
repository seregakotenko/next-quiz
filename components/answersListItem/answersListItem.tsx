import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { Answer } from '@/types/api/config';
import { useAnswerValueByScreenId, useScreenDataById } from '@/state/hooks/configStoreHooks';
import { useConfigStore } from '@/state/providers/quiz-config-store-provider';
import { useShallow } from 'zustand/react/shallow';

type AnswersListItemProps = {
  answer: Answer;
  questionId: string;
};

export default function AnswersListItem({ answer, questionId }: AnswersListItemProps) {
  const router = useRouter();
  const { title, nextQuestionId = '', value, nextUrl } = answer;
  const selectedValue = useAnswerValueByScreenId(questionId);
  const { updateNextQuestionId, updateCustomer } = useConfigStore(useShallow((state) => state));
  const nextScreen = useScreenDataById(nextQuestionId);
  const isSelected = selectedValue === value;
  const selectedClassName = isSelected ? `button-primary` : 'button-default';

  const handleAnswerButtonClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    if (!isSelected) {
      updateCustomer({ questionId, value });
    }

    // nextUrl is used to move to the info banner if is existing
    // nextScreen.url - to move to next question
    const nextScreenUrl = nextUrl || nextScreen?.url;

    if (!nextScreenUrl) {
      console.log('No next question url');
      return;
    }

    updateNextQuestionId(nextQuestionId);

    router.push(`/quiz/${nextScreenUrl}`);
  };

  return (
    <li>
      <button className={`w-full my-2 ${selectedClassName}`} onClick={handleAnswerButtonClick}>
        {title}
      </button>
    </li>
  );
}
