import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';

export default function ModalTitle({ title, onTitleChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Pencil className="w-4 h-4 text-primary" /> 일정 이름
      </label>
      <Input type="text" name="title" value={title} onChange={onTitleChange} className="mt-0.5 text-sm p-2" />
    </div>
  );
}
