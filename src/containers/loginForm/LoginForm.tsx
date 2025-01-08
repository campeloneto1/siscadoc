import ScdInput from "@/components/ScdInput/ScdInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Siscadoc</CardTitle>
          <CardDescription>
            Informe seu usuário e senha para fazer login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <ScdInput
                id="cpf"
                label="CPF"
                placeholder="CPF"
                required={true}
                type="text"
              />

              <ScdInput
                id="password"
                label="Senha"
                placeholder="Senha"
                required={true}
                type="password"
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
