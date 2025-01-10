import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

interface SelectItemType {
  id: string | number; // O id pode ser numérico ou string dependendo do seu backend
  nome: string;
}

interface ScdSelectProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  field: any;
  meta: any;
  itens: SelectItemType[];
}

const SdcSelect = ({
  id,
  label,
  placeholder,
  required = false,
  field,
  meta,
  itens,
}: ScdSelectProps) => {
  const handleChange = (value: string) => {
    // Atualiza o valor do campo no Formik com o valor selecionado
    field.onChange({
      target: {
        name: field.name,
        value: value,
      },
    });
  };

  return (
    <div className="grid gap-4">
      <Label htmlFor={id}>{label}</Label>
      <Select
        {...field}
        value={field.value}
        onValueChange={handleChange}
        id={id}
        required={required}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {itens &&
            itens.length > 0 &&
            itens.map((item: SelectItemType) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.nome}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div> // Exibe o erro se existir
      )}
    </div>
  );
};

export default SdcSelect;
