import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';

export default function Title({ title, onTitleChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Pencil className="w-4 h-4 text-primary" /> 일정 이름
      </label>
      <Input type="text" value={title} onChange={(e) => onTitleChange(e.target.value)} className="mt-0.5 text-sm p-2" />
    </div>
  );
}
