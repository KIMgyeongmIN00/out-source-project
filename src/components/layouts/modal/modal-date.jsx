import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

export default function Date({ date, onDateChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Calendar className="w-4 h-4 text-primary" /> 일정 날짜
      </label>
      <Input
        type="datetime-local"
        name="date"
        value={date}
        onChange={(e) => onDateChange(e)}
        className="mt-0.5 text-sm p-2"
      />
    </div>
  );
}
