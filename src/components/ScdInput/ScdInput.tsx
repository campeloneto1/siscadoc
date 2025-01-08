import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

interface ScdInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
}

const ScdInput = ({
  id,
  label,
  type,
  placeholder,
  required,
}: ScdInputProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default ScdInput;
