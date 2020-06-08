import { addComment } from './internal/comments/comments';
import { getCurrentActivePageInformation } from './internal/get-page-information';

const showComment = async () => {
  const textarea = document.querySelector<HTMLTextAreaElement>('#comment');
  if (!textarea) {
    throw new Error('#comment is not found');
  }

  const page = await getCurrentActivePageInformation();

  addComment({
    pageTitle: page.title,
    pageUrl: page.url,
    comment: textarea.value,
  });
};

const main = () => {
  const button = document.querySelector<HTMLButtonElement>('#showComment');
  if (!button) {
    throw new Error('#showComment is not found');
  }

  button.addEventListener('click', () => showComment());
};

main();
