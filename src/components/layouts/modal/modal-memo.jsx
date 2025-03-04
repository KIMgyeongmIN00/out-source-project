import { Textarea } from '@/components/ui/textarea';
import { Pencil } from 'lucide-react';

export default function ModalMemo({ memo, onMemoChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Pencil className="w-4 h-4 text-primary" /> 일정 메모
      </label>
      <Textarea
        name="memo"
        value={memo}
        onChange={onMemoChange}
        className="mt-0.5 text-sm p-2 h-[60px]"
      />
    </div>
  );
}
