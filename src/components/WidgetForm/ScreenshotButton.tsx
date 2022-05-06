import { useState, Dispatch, SetStateAction } from 'react';
import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';

import { Loading } from '../Loading';

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshot: Dispatch<SetStateAction<string | null>>;
}
export function ScreenshotButton({ screenshot, onScreenshot }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState<boolean>(false);

  async function handleTakeScreenshot() {
    if (!isTakingScreenshot) {
      setIsTakingScreenshot(true);
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        const canvas = await html2canvas(htmlElement);
        const base64Image = canvas.toDataURL('image/png');
        onScreenshot(base64Image);
      } else {
        alert('Could not load screenshot');
      }
      setIsTakingScreenshot(false);
    }
  }

  if (screenshot) {
    return (
      <button
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        type="button"
        style={{ backgroundImage: `url(${screenshot}` }}
        onClick={() => onScreenshot(null)}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      disabled={isTakingScreenshot}
      type="button"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
