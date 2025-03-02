import { Textarea } from '@/components/ui/textarea';
import { Pencil } from 'lucide-react';

export default function Memo({ memo, onMemoChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Pencil className="w-4 h-4 text-primary" /> 일정 메모
      </label>
      <Textarea value={memo} onChange={(e) => onMemoChange(e.target.value)} className="mt-0.5 text-sm p-2 h-[60px]" />
    </div>
  );
}
